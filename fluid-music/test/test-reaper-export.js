require('should');
require('mocha');

const fluid = require('..')
const rppp = require('rppp')

const FluidSession = fluid.FluidSession;

const nestedTracks = [
  { name: 'topA' },
  {
    name: 'topB',
    children: [
      { name: 'childB0' },
      { name: 'childB1' }
    ]
  },
  {
    name: 'topC',
    children: [
      {
        name: 'level2',
        children: [
          { name: 'level3A' },
          { name: 'level3B' },
          {
            name: 'level3C',
            children: [
              { name: 'baby' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'topD'
  }
]

describe('sessionToReaperProject', function () {
  let session

  beforeEach(function () {
    session = new FluidSession({}, nestedTracks)
  })

  it('should handle deeply nested tracks', async function () {
    const rppProject = await fluid.sessionToReaperProject(session)
    const rppTracks = rppProject.contents.filter(track => track instanceof rppp.objects.ReaperTrack)

    const rppBaby = rppTracks.find(t => t.getOrCreateStructByToken('NAME').params[0] === 'baby')
    rppBaby.getOrCreateStructByToken('ISBUS').params.should.deepEqual([2, -3])
  })
})