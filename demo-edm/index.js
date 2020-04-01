const _ = require('underscore');
const fluid = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath     = recipes.fromMars909.kit.k2.path
console.log('kick path:', kickPath);


const bass = fluid.tab.parse({
  noteLibrary: {
    C:24,D:26,E:28,F:29,G:31,A:33,B:35,
    c:36,d:38,e:40,f:41,g:43,a:45,
  },
  r: '1+2+3+4+',
  p: [
    {p:'cCEeF-c.'},
    {p:'A..BF-..'}
  ],
});

const msg = [
  fluid.audiotrack.select('kick'),
  _.range(10).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
  fluid.audiotrack.select('bass'),
  fluid.midiclip.create('bass', 0, 8, bass),
  fluid.transport.loop(0, 8),
];

const client = new fluid.Client(9999);
client.send(msg);
