const IpcClient = require("osc-ipc-client")
const osc = require("osc-min")

const options = {
    targetPort: 9999,
    targetHost: '127.0.0.1',
    header: 0xf2b49e2c, 
    timeout: 3000, 
    isUnixDomainSocket: false,
  };

module.exports = class FluidOscSender{
    constructor(targetPort){
        if (typeof targetPort !== 'number') targetPort = 9999;
        this.targetPort = targetPort;
        this.client = new IpcClient(options);
    }

    _connectPromise(){
        return new Promise(resolve => {
            this.client.on("connect", ()=>{
                resolve("connected");
            });
        });
    }

    _replyPromise(){
        return new Promise(resolve => {
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
}