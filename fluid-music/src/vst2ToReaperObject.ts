import { FluidPlugin, PluginType } from './plugin';
import FluidIpcClient = require('./cybr/IpcClient');
import * as cybr from './cybr/index';

const rppp = require('rppp')

/**
 * Create a `ReaperVst` object from an existing plugin on the cybr instance. 
 * This function changes the state of the currently-activated session on cybr, because it 
 * has to select every plugin to get its state. This function will fail if 
 * there is no activated session on cybr.
 *
 * @param {FluidIpcClient} client A FluidIpcClient that is connected to a cybr instance
 * @param {string} trackName - See documentation for cybr.audiotrack.select()
 * @param {FluidPlugin} plugin - Plugin Object
 * @param {number} n - nth plugin
 * @param {number} bpm - Beats per minute
 * 
 * @returns {ReaperVst}
 */
export async function vst2ToReaperObject(client: FluidIpcClient, trackName: string, plugin: FluidPlugin, n: number, bpm: number) {

  const cybrType = (plugin.pluginType === PluginType.unknown) ? undefined : plugin.pluginType;
  const pluginName = plugin.pluginName;

  const msg = [
    cybr.audiotrack.select(trackName),
    cybr.plugin.select(pluginName, cybrType, n),
    cybr.plugin.getReport(),
  ]

  const retObj = await client.send(msg);

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
    const paramIndex = plugin.getParameterIndex(paramKey); // JUCE style name
    const automationTrack = new rppp.objects.ReaperPluginAutomation();
    automationTrack.params[0] = paramIndex;

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
          automationTrack.addBezierPoint(
            autoPoint.startTime * 4 * 60 / bpm, 
            normalizedValue,
            autoPoint.curve
          );
        } else { 
          // If parameter does not have a normalized value, then ignore it.
          console.warn('parameter does not have a normalized value and could not be set')
        }
      }
    } // for (autoPoint of automation.points)

    newVst.add(automationTrack);
  }   // for (paramName, automation of plugin.automation)

  return newVst;
}