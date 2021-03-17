/* eslint-env mocha */
require('should');
require('mocha');

const { AutomationLane }  = require('..')

const makePoint = (value, startTimeSeconds = 0, curve = 0) => {
  return { value, startTimeSeconds, curve }
}

describe('AutomationLane', function() {
  describe('getLastPointAt method', function () {

    it('should return null when there are no points', function () {
      const lane = new AutomationLane()
      should(lane.getLastPointAt(3)).be.null()
    })

    it('should return the last point when it can find one', function () {
      const lane = new AutomationLane()
      lane.points.push(makePoint(1000, 1), makePoint(2000, 2), makePoint(3000, 3))
      should(lane.getLastPointAt(0.5)).be.null()
      lane.getLastPointAt(1).value.should.equal(1000)
      lane.getLastPointAt(10).value.should.equal(3000)
    })

    it('should work even when the points are out of order', function() {
      const lane = new AutomationLane()
      lane.points.push(makePoint(3000, 3), makePoint(1000, 1), makePoint(2000, 2))
      should(lane.getLastPointAt(0.5)).be.null()
      lane.getLastPointAt(1).value.should.equal(1000)
      lane.getLastPointAt(10).value.should.equal(3000)
    })
  })
})
