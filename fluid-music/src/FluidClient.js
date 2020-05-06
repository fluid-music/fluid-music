const IpcClient = require("osc-ipc-client")
const osc = require("osc-min")

const options = {
  targetPort: 9999,
  targetHost: '127.0.0.1',
  header: 0xf2b49e2c,
  timeout: 3000,
  isUnixDomainSocket: false,
};

module.exports = class FluidClient{
  constructor(targetPort) {
    const ipcOptions = Object.assign({}, options);
    if (typeof targetPort === 'number')
      ipcOptions.targetPort = targetPort;
    this.client = new IpcClient(ipcOptions);
    this.timeout = ipcOptions.timeout;
    this.connected = false;
    this.client.once('connect', () => {
      this.connected = true;
    });
  }

  async send(msgObject, timetag){

    try{osc.toBuffer(msgObject, true)}
    catch (err){ 
      this.client.close();
      return Promise.reject(); 
    }
    
    const connectPromise = () => {
      return new Promise((resolve, reject) => {
        this.client.once('connect', () => {
          resolve("connected");
        });
        
        this.client.once('error', (error) => {this.client.close(); reject(error);});
        this.client.once('close', (error) => {reject(error)});
        this.client.once('timeout', () => {this.client.close(); reject("Connection Timed Out")});
      });
    }

    const replyPromise = () => {
      return new Promise((resolve, reject) => {
        this.client.on("res", (data)=>{
          try{
              resolve(osc.fromBuffer(data, true))
          }
          catch (err){
              reject(err);
          }
          this.client.close();
        });
  
        this.client.once('error', (error) => {this.client.close(); reject(error);});
        this.client.once('close', (error) => {reject(error)});

        const timeoutCallback = () => {this.client.close();}
        setTimeout(function() {
          timeoutCallback();
          reject('Promise timed out after ' + this.timeout + ' ms');
        }, this.timeout);
      });
    }

    if(this.connected === false) await connectPromise();
    await this.client.sendOsc(msgObject, timetag);
    return replyPromise();
  }

  get targetPort() {
    throw new Error('Do not use fluid client targetPort. You might be looking for client.client.address');
  }
}
