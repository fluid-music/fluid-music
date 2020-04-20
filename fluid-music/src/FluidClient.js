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
  }

  _connectPromise(){
    return new Promise((resolve, reject) => {
      this.client.once('connect', () => {
        resolve('connected');
      });

      // IpcClient emits an error when the port is not listening. How else can
      // it fail?
      this.client.once('error', (error) => {
        reject(error);
      });
    });
  }

  _replyPromise(){
    return new Promise((resolve, reject) => {
      this.client.on("res", (data, address)=>{
        // console.log(osc.fromBuffer(data), 'from', address);
        resolve(osc.fromBuffer(data))
        this.client.close();
      })
    })
  }

  async send(msgObject, timetag){
    await this._connectPromise();
    await this.client.sendOsc(msgObject, timetag);
    return this._replyPromise();
  }

  get targetPort() {
    throw new Error('Do not use fluid client targetPort. You might be looking for client.client.address');
  }
}
