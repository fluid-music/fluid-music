const fluid = require('../src/index');
const Client = require('../src/FluidClient');

const client = new Client(9999);


const m1 = [
  fluid.audiotrack.select('track'),
  fluid.midiclip.select('clip', 0, 10),
  fluid.midiclip.note(10, 0, 0.25, 100),
  fluid.midiclip.clear(),
  fluid.clip.select('clip'),
]

client.send(m1)
.then((data) => {
    for(elem of data.elements){
      console.log(elem);
    }
});
