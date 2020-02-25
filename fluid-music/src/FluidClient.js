const IpcClient = require("osc-ipc-client")

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

    async send(msgObject, timetag){
        await this._connectPromise();
        this.client.sendOsc(msgObject, timetag);
    }
}