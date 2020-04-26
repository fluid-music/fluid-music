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

  async send(msgObject, timetag){
    
    const connectPromise = () => {
        return new Promise((resolve, reject) => {
          this.client.once('connect', () => {
            resolve('connected');
          });
    
          this.client.once('error', (error) => {reject(error)});
          this.client.once('close', (error) => {reject(error)});
          this.client.once('timeout', () => {reject("Connection Timed Out")});
        });
    }

    const replyPromise = () => {
        return new Promise((resolve, reject) => {
          this.client.on("res", (data)=>{
            try{
                resolve(osc.fromBuffer(data))
            }
            catch (err){
                console.log(err);
            }
            this.client.close();
          })
    
          this.client.once('error', (error) => {reject(error)});
          this.client.once('close', (error) => {reject(error)});
          this.client.once('timeout', () => {reject("Connection Timed Out")});
        })
    }
    try{
        await connectPromise();
        await this.client.sendOsc(msgObject, timetag);
        return replyPromise();
    }
    catch (err){
        console.log(err);
    }
  }

  get targetPort() {
    throw new Error('Do not use fluid client targetPort. You might be looking for client.client.address');
  }
}
