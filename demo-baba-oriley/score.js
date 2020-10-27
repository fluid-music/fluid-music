const R = require('ramda')
const fluid = require('fluid-music')
const session = require('./session')

const nLibrary = { F: 53, c: 60, f: 65, d: 62, e: 64, H: 58 };
const tLibrary = {}
const dLibrary = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80, 8: 90, 9: 100, a: 110, b: 120, c: 127 };

for (const key of Object.keys(nLibrary))
  tLibrary[key] = new fluid.techniques.MidiNote({note: nLibrary[key]})

for (const key of Object.keys(dLibrary))
  dLibrary[key] = { v: dLibrary[key] }

let r      =  '1 e + a 2 e + a 3 e + a 4 e + a ';
let organ1 =  'F F c c f f c c F F c c f f c c ';
let organ2 = [' d d d d e               d d e e',
              '         d d e e         d d e e',
              '           d e e         d d e e',
  ...R.repeat('         d d e e         d d e e', 2),
              '         d d e e           d d d',
  ...R.repeat('           d d d           d d d', 2),
              '       e e           e e e      ',
              '     e e e           e e e      ',
  ...R.repeat('   d d e e         d d e e      ', 2),
              '   H   d d         H   d d      ',
              '   H   d d H       H   d d H    '];
let d      =  '78655775856556658765657676656765'; // velocities

session.insertScore({
  organ1: R.repeat(organ1, 16),
  organ2: organ2
}, {
  tLibrary,
  dLibrary,
  r,
})

const client = new fluid.Client();
client.connect(true)

async function run() {
  const rpp = await fluid.sessionToReaperProject(session, client)
  console.log(rpp.dump())
}

run().then(() => {

}).finally(() => {
  client.close()
})
