const fluid = require('..');
const cybr  = fluid.cybr;

const client = new cybr.Client(9999);

const m1 = [
  cybr.audiotrack.select('hi'),
  cybr.plugin.select('delay'),
]

client.send(m1)
.then((data) => {
    console.dir(data, {depth:null})
});
