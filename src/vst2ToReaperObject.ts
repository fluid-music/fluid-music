import { FluidPlugin, PluginType } from './FluidPlugin';
import { IpcClient } from './cybr/IpcClient';
import * as cybr from './cybr/index';

const rppp = require('rppp')
const vst2Parser = require('vst2-preset-parser')

function makeReaperVstB64PresetName(presetName : string) {
  const nameBuffer = Buffer.from(presetName)
  const buffer = Buffer.alloc(nameBuffer.length + 6)
  buffer.set(nameBuffer, 1)
  return buffer.toString('base64')
}

/**
 * Create a `ReaperVst` object from an existing plugin on the cybr instance.
 * This function can change the state of the currently-activated session on
 * cybr, because it has to select every plugin to get its state.
 *
 * @param client A FluidIpcClient that is connected to a cybr instance
 * @param trackName See documentation for cybr.audiotrack.select()
 * @param plugin Plugin Object
 * @param n nth plugin
 *
 * @returns {ReaperVst}
 */
export async function vst2ToReaperObject(client: IpcClient, trackName: string, plugin: FluidPlugin, n: number) {

  const cybrType = (plugin.pluginType === PluginType.unknown) ? undefined : plugin.pluginType;
  const pluginName = plugin.pluginName;
  const noParams = Object.keys(plugin.parameters).length === 0;

  // We're going to try to get as many of the following as possible. There are
  // three places that we can query to get this information.
  // 1) The FluidPlugin instance
  // 2) The Cybr server
  // 3) The preset stored in the FluidPlugin (plugin.vst2.presetBase64)
  let pluginUid = plugin.vst2.uid;
  let vstPreset : any; // The js object returned by vst2-preset-parser
  let vstState : string|undefined;
  let vstProgramName : string|undefined;
  let isSynth : boolean = !!plugin.isSynth;

  if (plugin.vst2.presetBase64) {
    vstPreset = vst2Parser.parse(Buffer.from(plugin.vst2.presetBase64, 'base64'));
    vstProgramName = vstPreset.programName
  }

  // Consider the three cases we need to handle:
  // 1) We have a .presetBase64 and no parameters (no need to request state from cybr)
  // 2) We have a .presetBase64 and we DO have parameters (we MUST request state from cybr)
  // 3) When we do not have .presetBase64 (we MUST get state from cybr even if there are no parameters)

  // Check if we are in case #1. If so, there is no need to make a cybr request.
  if (vstPreset && noParams) {
    if (!vstPreset.state64) {
      console.warn(vstPreset);
      throw new Error(`Unusable ${plugin.pluginName} preset with .fxMagic: '${vstPreset.fxMagic}'`) ;
    }
    vstState = vstPreset.state64;
  } else {
    const paramSetters : any[] = [];

    // If a preset is specified, load it BEFORE setting parameters
    if (plugin.vst2.presetBase64) paramSetters.push(cybr.plugin.loadVst2Preset(plugin.vst2.presetBase64));

    // Get the normalized value of all parameters
    for (const [paramKey, explicitValue] of Object.entries(plugin.parameters)) {
      const paramName = plugin.getParameterName(paramKey);
      if (typeof explicitValue === 'number') {
        const normalizedValue = plugin.getNormalizedValue(paramKey, explicitValue);
        if (typeof normalizedValue === 'number') {
          paramSetters.push(cybr.plugin.setParamNormalized(paramName, normalizedValue));
        } else {
          paramSetters.push(cybr.plugin.setParamExplicit(paramName, explicitValue));
        }
      } else {
        console.warn(`found non-number parameter value in ${plugin.pluginName} - ${paramKey}: ${explicitValue}`);
      }
    }

    const pauseMs = pluginName.startsWith('#T') ? 120 : 40 // Wait a little longer for #T plugins (this should probably be defined as a Plugin property)
    const pluginReport = await cybr.requests.requestReport(pluginName, cybrType, trackName, n, paramSetters, client, pauseMs);

    if (pluginReport.isSynth !== isSynth) {
      console.warn(`WARNING: mismatched plugin.isSynth found in report for ${plugin.pluginName}. Report:${pluginReport.isSynth}, FluidPlugin:${plugin.isSynth}. (using report value)`)
      isSynth = pluginReport.isSynth
    }

    if (pluginReport.uidInt !== plugin.vst2?.uid) {
      console.warn(`WARNING: mismatched plugin uid found in report for ${plugin.pluginName}. Report:${pluginReport.uidInt}, FluidPlugin:${plugin.vst2?.uid}. (using report uid)`)
      pluginUid = pluginReport.plugin.uidInt
    }

    // Charles: I'm not %100 sure that using the currentProgramName from the
    // plugin report is valid. This is set in .b64Chunks[2], and I don't know if
    // the same characters are legal there as will appear in the programName
    // sent by the cybr server.
    vstProgramName = pluginReport.currentProgramName
    vstState = pluginReport.vst2State;
  }
  const numIn = plugin.numAudioInputChannels;
  const numOut = plugin.numAudioOutputChannels;

  // Example first line:
  // <VST "VSTi: Podolski (u-he)" Podolski.vst 0 "" 1349477487<565354506F646F706F646F6C736B6900> ""

  let isI   = isSynth ? 'i' : '';
  let name  = 'VST' + isI + ': ' + plugin.pluginName + ' (' + plugin.vst2.vendor + ')';

  let newVst = new rppp.objects.ReaperVst();
  newVst.params[0] = name;                       // "VSTi: Podolski (u-he)"
  newVst.params[1] = plugin.pluginName + '.vst'; // "Podolski.vst" (This is a filename. I think this can be wrong)
  newVst.params[2] = 0;
  newVst.params[3] = "";
  newVst.params[4] = pluginUid + '<>';
  newVst.initializeRouting(numIn, numOut);
  newVst.setVst2State(vstState);
  newVst.setVst2IdNumber(pluginUid);

  if (vstProgramName) {
    newVst.b64Chunks[2] = makeReaperVstB64PresetName(vstProgramName)
    if (!newVst.externalAttributes['PRESETNAME']) newVst.externalAttributes['PRESETNAME'] = []
    newVst.externalAttributes['PRESETNAME'][0] = vstProgramName
  }

  // Automation
  for (const [paramKey, automation] of Object.entries(plugin.automation)) {
    // Create an automation lane for each parameter with automation. Notice that
    // reaper identifies parameters by a numerical index, so we must retrieve
    // that index from the plugin adapter.
    const automationTrack     = new rppp.objects.ReaperPluginAutomation();
    automationTrack.params[0] = plugin.getParameterIndex(paramKey);
    newVst.add(automationTrack);

    // iterate over points. Ex { startTime: 0, value: 0.5, curve: 0 }
    for (const autoPoint of automation.points) {
      if (typeof autoPoint.value === 'number') {

        const explicitValue   = autoPoint.value;
        const normalizedValue = plugin.getNormalizedValue(paramKey, explicitValue);

        if (typeof normalizedValue === 'number') {
          automationTrack.addBezierPoint(
            autoPoint.startTimeSeconds,
            normalizedValue,
            autoPoint.curve
          );
        } else {
          // If parameter does not have a normalized value, then ignore it.
          console.warn(`${pluginName}: no normalizer found for ${paramKey} param. Automation skipped.`);
        }
      }
    } // for (autoPoint of automation.points)
  }   // for (paramName, automation of plugin.automation)

  return newVst;
}
