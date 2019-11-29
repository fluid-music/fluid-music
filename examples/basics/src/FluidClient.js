const dgram = require('dgram');
const osc = require('osc-min');

/**
 * FluidOscSender will close instantly after all messages were sent.
 */
module.exports = class FluidOscSender {
  constructor(targetPort) {
    if (typeof targetPort !== 'number') targetPort = 9999;
    this.targetPort = targetPort;
    this.pendingMsgCount = 0;
    this.client = dgram.createSocket('udp4');
  }

  send(msgObject) {
    let buffer;
    if (msgObject instanceof Buffer)
      buffer = msgObject;
    else
      buffer = osc.toBuffer(msgObject);

    this.pendingMsgCount++;
    this.client.send(buffer, this.targetPort, (err) => {
      if (err) console.error('Error sending message:', err, msgObject);
      this.pendingMsgCount--;
      if (this.pendingMsgCount === 0) this.client.close();
    });
  }
}