const osc = require("osc-min")

/**
 * This function is intended to be passed in to net.createServer(onConnection).
 * It will be called whenever a connection is established with a `net.Socket`
 * as an argument.
 * @param {net.Socket} sock
 */
const onConnection = (sock) => {

  const timeouts = [];
  const clearAll = () => timeouts.forEach(clearTimeout);

  // Emitted once the socket is fully closed. The argument hadError is a boolean
  // which says if the socket was closed due to a transmission error.
  sock.on('close',   (msg) => { clearAll(); });

  // Emitted when a socket connection is successfully established.
  sock.on('connect', (msg) => {  });

  // Emitted when data is received. The argument data will be a Buffer or
  // String. Encoding of data is set by socket.setEncoding(). The data will be
  // lost if there is no listener when a Socket emits a 'data' event.
  sock.on('data',    (msg) => {
    //Using different addresses to test for different scenarios.
    ms = osc.fromBuffer(msg.slice(8));
    if (ms.address === '/test/invalid'){
      for(i = 0; i < 28; i++){
        msg[8+i] -= 1;
      }
      sock.write(msg);
    }
    else if (ms.address === '/test/incomplete') {
      let data = msg.slice(0, msg.length-1);
      sock.write(data);
    }
    else if (ms.address === '/test/timeout'){
      timeouts.push(setTimeout(() => { sock.write(msg) }, 4000));
    }
    else if (ms.address === '/test/valid'){
      sock.write(msg);
    }
    else if (msg.address === '/test/echo') {
      sock.write(msg);
    }
    else if (ms.address === '/test/brokenconnection'){
      sock.destroy();
      sock.write(msg);
    }
    else if (ms.address === '/test/wait') {
      const millisec = (ms.args.length && typeof(ms.args[0].value) === 'number')
        ? ms.args[0].value
        : 100;

      timeouts.push(setTimeout(() => { sock.write(msg); }, millisec));
    }
  });

  // Emitted when the write buffer becomes empty. Can be used to throttle
  // uploads.
  sock.on('drain',   (msg) => {  });

  // Emitted when the other end of the socket sends a FIN packet, thus ending
  // the readable side of the socket.
  sock.on('end',     (msg) => {  });

  // Emitted when an error occurs. The 'close' event will be called directly
  // following this event.
  sock.on('error',   (msg) => {  });

  // Emitted after resolving the host name but before connecting. Not applicable
  // to Unix sockets.
  sock.on('lookup',  (msg) => {  });

  // Emitted when a socket is ready to be used. Triggered immediately after
  // 'connect'.
  sock.on('ready',   (msg) => {  });

  // Emitted if the socket times out from inactivity. This is only to notify
  // that the socket has been idle. The user must manually close the connection.
  sock.on('timeout', (msg) => {  });
};

module.exports = { onConnection };
