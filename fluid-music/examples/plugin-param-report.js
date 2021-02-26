const path   = require('path')
const fluid  = require('..')
const cybr   = fluid.cybr
const file   = path.join(__dirname, 'example.tracktionedit')
const client = new cybr.Client(9999)

const elements = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('test-track'),
  cybr.plugin.select('DragonflyRoomReverb', 'vst'),
  cybr.plugin.getSingleParamReport('Width', 10),
];

(async () => {
  await client.connect(false)
  const result = await client.send(elements)
  const reportOscMsg = result.elements[3]
  const errorCode = reportOscMsg.args[0].value
  const reportMsg = reportOscMsg.args[1].value
  
  if (errorCode) {
    console.warn('Single Parameter Report failed:', reportMsg)
  } else {
    console.warn(reportMsg)
    console.log(JSON.parse(reportOscMsg.args[2].value))
  }
})().catch(error => {
  throw error
}).finally(() => {
  client.close()
})
