const OscIpcClient = require('osc-ipc-client')
const osc = require('osc-min')
const chalk = require('chalk')

interface IpcClientOptions {
  /** default = 9999 */
  targetPort? : number
  /** default = 127.0.0.1 */
  targetHost? : string
  /** default = 3000 (in milliseconds) */
  timeout? : number
  /** default = false */
  isUnixDomainSocket? : boolean
}


export class IpcClient {
  /**
   * @param portOrOptions can be a port number, or an options object
   */
  constructor(portOrOptions? : IpcClientOptions|number) {
    if (typeof portOrOptions === 'number') {
      this.config.targetPort = portOrOptions
    } else if (!portOrOptions) {
      // use the defaults
    } else {
      Object.assign(this.config, portOrOptions);
    }

    this.timeout = this.config.timeout;
  }

  config = {
    targetPort: 9999,
    targetHost: '127.0.0.1',
    header: 0xf2b49e2c,
    timeout: 5000,
    isUnixDomainSocket: false,
  }

  client? : typeof OscIpcClient = null
  queue : any[] = [] // FIFO
  timeout : number

  // State
  connectPromise? : Promise<any>
  broken : boolean = false
  keepOpen : boolean = false
  connected : boolean = false /** Is the client currently connected? */
  connectionInitiated : boolean = false /** Did the client initiate a connection? */
  connectionEstablished : boolean = false /** Were we ever successfully connected? */

  rejectAllPendingRequests(reason) {
    while (this.queue.length) {
      const pObj = this.queue.shift().reject(reason);
      clearTimeout(pObj.timeout);
    }
  }

  /**
   * For Internal Use Only.
   *
   * Note that this does not set `.broken=true`. A rejected request may not
   * always indicate a broken connection. The caller should set `.broken` when
   * warranted.
   */
  rejectPendingRequest(pObj, reason) {
    const queueIndex = this.queue.indexOf(pObj);
    if (queueIndex === -1) throw new Error('Cannot reject request. Request not found');
    this.queue.splice(queueIndex, 1);
    return pObj.reject(reason);
  }

  /**
   * @returns {Promise}
   */
  connect(keepOpen=false) {
    if (this.connectionInitiated) throw new Error('FluidIpcClient: connect() may only be called once');
    this.connectionInitiated = true;
    this.keepOpen = keepOpen;

    this.client = new OscIpcClient(this.config);
    this.client.once('connect', () => {
      this.connected = true;
      this.connectionEstablished = true;
    });
    this.client.on('res', (data) => {
      const pObj = this.queue.shift();
      try { pObj.resolve(osc.fromBuffer(data, true)); }
      catch (err) { pObj.reject(err); this.close(); }
    });

    this.client.on('close', (error) =>  {
      this.connected = false;
      this.broken = true;
      this.rejectAllPendingRequests('Connection closed before an answer was received. ' + (error || ''));
    });

    this.client.on('error', (error) => {
      this.close(error);
    });

    this.connectPromise = new Promise((resolve, reject) => {
      this.client.once('connect', () => { resolve('connected'); });
      this.client.once('close', (error) => { error && !this.connectionEstablished && reject(error) });
      this.client.once('timeout', () => { this.client.close('Connection Timed Out'); });
      this.client.once('error', (error) => {
        if (this.connectionInitiated && !this.connectionEstablished) {
console.error((chalk.reset`{bold.red ERROR} {red connecting with the cybr server at ${this.config.targetHost}:${this.config.targetPort}}
The cybr server must be running in order for fluid-music to:
- export sessions that contain VSTs to .RPP files
- export sessions to .tracktionedit files
- play a session in realtime or render a session to audio
{bold.red Make sure that cybr is running, and try again!}
`       ))}
        reject(error);
      })
    });

    return this.connectPromise;
  }

  /**
   * Send a message to the server.
   * @param msgObject Can be an osc-min object json or a Buffer
   * @param timetag See osc-min docs for details
   */
  async send(msgObject : object|Buffer, timetag? : Date|number[]) {
    if (this.broken) throw new Error('FluidIpcClient: cannot send after close');
    if (!this.connectionInitiated) await this.connect();
    if (!this.connected) await this.connectPromise;

    let pObj : any = {};
    this.queue.push(pObj);

    pObj.promise = new Promise((resolve, reject) => {
      // Wait for the timeout, then reject, and remove from the queue. Note that
      // if there is a timeout, all messages that arrive in the future cannot be
      // reliably related to a pending promise, because we will not know if that
      // message was intended to be the reply to the request that timed out.
      // Until we have some way to identify replies, we have to just close the
      // connection, which will cause all pending promises to be rejected.

      // may only be called by rejectPendingRequest or rejectAllPendingRequests
      pObj.reject = (reason) => {
        clearTimeout(pObj.timeout);
        reject(reason);
        this.closeIfDone();
        return pObj.promise;
      };
      // resolve should only be called by the client.on('res') handler
      pObj.resolve = (data) => {
        clearTimeout(pObj.timeout);
        resolve(data);
        this.closeIfDone();
        return pObj.promise;
      };

      pObj.timeout = setTimeout(() => {
        this.broken = true;
        this.rejectPendingRequest(pObj, `Request timed out after ${this.timeout} ms`);
        this.close('Request timed out');
      }, this.timeout);
    });

    try {
      await this.client.sendOsc(msgObject, timetag);
    } catch (error) {
      // Sending failed even though we are connected. This probably indicates
      // that we supplied msgObject with invalid OSC. I don't think that we
      // actually need to break the connection in this case.
      // I do not know if there are other reasons why an error would get caught,
      // but if there are other possibilities, those cases should potentially
      // break the connection.
      //
      // However, the .broken parameter should probably only be used internally,
      // because we cannot easily control the order that this error handler and
      // external error handlers run. External error handlers are likely to run
      // before this one, meaning that .broken will still be false when they
      // catch an error propagating from `.send(...)`.
      this.rejectPendingRequest(pObj, error);
    }
    const response = await pObj.promise;
    printResponseErrors(response)
    matchResponse(msgObject, response)
    return response
  }

  get targetPort() {
    throw new Error('Do not use fluid client targetPort. You might be looking for client.client.address');
  }

  /**
   * Close the client, causing all pending promises to immediately reject. You
   * may call close() multiple times.
   */
  close(error? : any) {
    error = (typeof error === 'string') ? new Error(error) : error;
    this.client.close(error);
  }

  closeIfDone = () => {
    if (this.keepOpen || this.queue.length) return;
    this.close();
  }
}

function printResponseErrors(result : any) {
  if (result.oscType === 'message') {
    const errorCode = result.args[0]?.value
    if (errorCode) {
      console.warn(result.address, result.args[0]?.value, result.args[1]?.value)
    }
  } else if (result.oscType === 'bundle') {
    result.elements.map(printResponseErrors)
  }
}

function matchResponse(sent : any, response : any) {
  if (Array.isArray(sent) || sent.oscType === 'bundle') {
    const messages = Array.isArray(sent) ? sent : sent.elements

    if (response.oscType !== 'bundle') {
      console.warn('WARNING: IpcClient received a response with an unexpected bundle shape')
      return
    }

    if (messages.length !== response.elements.length) {
      console.warn('WARNING: IpcClient received a response with an unexpected bundle shape', messages, response)
      return
    }

    for (let i = 0; i < messages.length ; i++) {
      const outgoing = messages[i]
      const received = response?.elements[i]

      matchResponse(outgoing, received)
    }
  } else {
    // we have two message objects
    if (!response.address.startsWith(sent.address)) {
      console.warn('WARNING: IpcClient received unexpected response address', sent, response)
    }

    if (typeof sent.handleResponse === 'function') {
      const errorCode = response?.args[0]?.value || 0
      if (typeof errorCode !== 'number') {
        console.warn('WARNING: IpcClient tried to call a handler, but received no error code', sent, response)
      }
      sent.handleResponse.call(sent, errorCode, ...response.args.slice(1))
    }
  }
  return
}
