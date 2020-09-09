const rppp = require('rppp');
const cybr = require('./cybr/index');

/**
 * Create a `ReaperVst` object from an existing plugin on the cybr instance.
 *
 * @param {FluidIpcClient} client A FluidIpcClient that is connected to a cybr instance
 * @param {string} trackName - See documentation for fluid.audiotrack.select()
 * @param {string} pluginName - See documentation for fluid.plugin.select()
 * @param {string} pluginType
 * @param {string} pluginId 
 * 
 * @returns {ReaperVst}
 */
async function vst2ToReaperObject(client, trackName, pluginName, pluginType, pluginId) {
  const msg = [
    cybr.audiotrack.select(trackName),
    cybr.plugin.select(pluginName, pluginType, pluginId),
    cybr.plugin.getReport(),
  ]

  const retObj = await client.send(msg).then(retObj => { return retObj; });
  const pluginObject = JSON.parse(retObj.elements[2].args[2].value);
  const vst2State = pluginObject.vst2State;

  let isI   = pluginObject.isSynth ? 'i' : '';
  let name  = pluginObject.externalPluginFormat + isI + ': ' 
            + pluginObject.name + ' (' + pluginObject.vendor + ')';
  let id    = pluginObject.uidInt;

  let newVst = new rppp.objects.ReaperVst();
  newVst.params[0] = name;
  newVst.params[1] = pluginObject.name + '.' + pluginObject.pluginType;
  newVst.params[2] = 0;
  newVst.params[3] = "";
  newVst.params[4] = id + '<>';
  newVst.params[5] = "";
  newVst.params[6] = vst2State;
  newVst.params[7] = "";

  return newVst;
}
  
module.exports = vst2ToReaperObject;