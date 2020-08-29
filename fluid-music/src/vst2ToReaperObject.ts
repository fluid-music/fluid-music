import { FluidPlugin, PluginType } from './plugin';
import FluidIpcClient = require('./cybr/IpcClient');

const rppp = require('rppp')
const fluid = require('./fluid/index');

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
async function vst2ToReaperObject(client: FluidIpcClient, trackName: string, plugin: FluidPlugin, n: number, bpm: number) {

  const cybrType = (plugin.pluginType === PluginType.unknown) ? undefined : plugin.pluginType;
  const pluginName = plugin.pluginName;

  const msg = [
    fluid.audiotrack.select(trackName),
    fluid.plugin.select(pluginName, cybrType, n),
    fluid.plugin.getReport(),
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

  // Automation
  for (const [paramKey, automation] of Object.entries(plugin.automation)) {
    const paramName = plugin.getParameterName(paramKey); // JUCE style name
    // iterate over points. Ex { startTime: 0, value: 0.5, curve: 0 }
    for (const autoPoint of automation.points) {
      if (typeof autoPoint.value === 'number') {
        // - paramName is the JUCE style parameter name we need
        // - value is an explicit value. look for a normalizer
        // Notice how paramKey and paramName are used in the code below, and
        // be careful not to mix them up. They may (or may not) be identical
        // so mixing them up could lead to hard-to-find bugs.
        const explicitValue   = autoPoint.value;
        const normalizedValue = plugin.getNormalizedValue(paramKey, explicitValue);

        if (typeof normalizedValue === 'number') {
          newVst.addBezierPoint(
            autoPoint.startTime * 4 * 60 / bpm, 
            normalizedValue,
            autoPoint.curve
          );
        } else {
          trackMessages.push(cybr.plugin.setParamExplicitAt(
            paramName,
            explicitValue,
            autoPoint.startTime,
            autoPoint.curve));
        }
      }
    } // for (autoPoint of automation.points)
  }   // for (paramName, automation of plugin.automation)

  return newVst;
}
  
module.exports = vst2ToReaperObject;