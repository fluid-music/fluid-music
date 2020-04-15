const fluid = require('../src/index');
const osc = require("osc-min")
const Client = require('../src/FluidClient');

const client = new Client(9999);

client.client.on("res", (data, address)=>{
    console.log(osc.fromBuffer(data), 'from', address);
    d = osc.fromBuffer(data)
    console.log(d.elements[0])
});

const m1 = [
  fluid.audiotrack.select('hi'),
  fluid.plugin.select('delay'),
]

setInterval(function() {
    console.log("timer that keeps nodejs processing running");
}, 1000 * 60 * 60);

client.send(m1);
