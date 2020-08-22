const should = require('should');
const mocha = require('mocha');
const fluid = require('..');
const net = require('net')
const osc = require('osc-min')
const onConnection = require('./server-stub').onConnection;

const pause = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe('fluid.IpcClient.send', function() {
  this.timeout(5000);
  const PORT = 22354;
  let server;

  before(function(done) {
    server = net.createServer(onConnection);
    server.listen(PORT);
    server.on('listening', done);
  });

  after(function() {
    server.close();
  });


  it('should resolve when client connects and sends valid message', async function() {
    const client = new fluid.IpcClient(PORT);
    await client.connect();
    let message = { address: '/test/valid' };
    let result = await client.send(message);
    result.should.containDeep(message);

    client.close();
    return Promise.resolve();
  });

  it('should resolve when two messages are sent ', async function() {
    const client = new fluid.IpcClient(PORT);
    await client.connect();

    const message0 = { address: '/test/valid' };
    const result0 = client.send(message0);
    const message1 = { address: '/test/valid', args: [{ type: 'float', value: 155 }] };
    const result1 = client.send(message1);

    const result = await Promise.all([result0, result1]);
    result[0].should.containDeep(message0);
    result[1].should.containDeep(message1);

    client.close();
    return Promise.resolve();
  });

  it('should reject when server returns an invalid response', (function() {
    const client = new fluid.Client(PORT);
    const result = client.send({ address: '/test/invalid' });
    return result.should.be.rejected();
  }));

  describe('sending an incomplete message', function() {
    let client;
    before(function() { client = new fluid.IpcClient(PORT); });
    after(function() { client.close(); });

    it('should reject', ( function() {
      const result = client.send({});
      return result.should.be.rejected();
    }));
  });

  describe('server sends back an incomplete message', () => {
    let client;
    before(function() { client = new fluid.IpcClient({targetPort: PORT, timeout: 300}); });
    after(function() { client.close(); });

    it('should reject', (function() {
      const result = client.send({ address: '/test/incomplete' });
      return result.should.be.rejected();
    }));
  });

  it('When send is rejected, the client is closed automatically', function(done) {
    const client = new fluid.Client(PORT);
    client.send({address: '/test/invalid'})
    .then(() => done('client didnt throw'))
    .catch((err) => {
      if(client.client._socket.destroyed) done()
      else done('client was not closed');
    });
  });

  describe('When the server breaks the connection', () => {
    let client;
    let toBreak;

    before((done) => {
      toBreak = net.createServer(onConnection);
      toBreak.listen(22555);
      toBreak.on('listening', done);
    });

    it('should reject the promise returned by .send(...)', async function() {
      client = new fluid.IpcClient(22555);
      await client.connect();
      const result = client.send({ address: '/test/brokenconnection' });
      return result.should.be.rejected();
    });
    after(() => {
      toBreak.close();
    });
  });

  describe('When the server closes without breaking the connection', () => {
    let client;
    let toBreak;

    before((done) => {
      toBreak = net.createServer(onConnection);
      toBreak.listen(22556);
      toBreak.on('listening', done);
    });

    it('should timeout and reject the promise returned by .send(...)', async function() {
      client = new fluid.IpcClient({targetPort: 22556, timeout: 300});
      const result = client.send({ address: '/test/wait', args: [10000] });
      await pause(20);
      toBreak.close();
      return result.should.be.rejected();
    });
  });

  it('When client cannot connect, the promise returned by client.send should be rejected', function() {
    // Attempt to connect to a port that is not listening
    const client = new fluid.Client(33354);

    // .rejected() returns a promise indicating to mocha that this test is
    // async. If the promise is not rejected within mocha's timeout,
    // the test fails.
    return client.send({ address: '/test/noconnection' }).should.be.rejected();
  });

});
