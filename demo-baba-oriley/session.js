const fluid = require('fluid-music');

const BPM = 118.6

const session = new fluid.FluidSession({
  bpm: BPM,
}, [
  { name: 'organ1',
    gainDb: -6,
    sends: [
      { to: '16th delay', gainDb: -2.3 },
      { to: 'reverb', gainDb: -12 }
    ]},
  {
    name: 'organ2',
    gainDb: -9,
    sends: [
      { to: '16th delay', gainDb: -6 },
      { to: 'reverb', gainDb: -12 }
    ]
  },
  {
    name: '16th delay',
    plugins: [
      new fluid.plugins.TStereoDelayVst2({
        dryDb: -50,
        wetDb: 0,
        sync: 0,
        lFeedbackPercent: 20,
        rFeedbackPercent: 20,
        rHighCutHz: 2800,
        lHighCutHz: 2800,
        lDelayMs: 15000/BPM,
        rDelayMs: 15000/BPM
      })
    ],
    sends: [
      { to: 'reverb', gainDb: -20 }
    ]
  },
  {
    name: 'reverb',
    plugins: [
      new fluid.plugins.DragonflyRoomVst2({
        predelayMs: 100,
        earlyLevelPercent: 60,
        lateLevelPercent: 40,
        dryLevelPercent: 0,
        sizeMeters: 4
      })
    ]
  }
])

module.exports = session