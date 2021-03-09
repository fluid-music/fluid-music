import * as audiotrack from './audiotrack'
import * as plugin from './plugin'
import { IpcClient } from './IpcClient';

/**
 * @param pluginName The plugin name (see cybr.plugin.select)
 * @param pluginType The plugin type (see cybr.plugin.select)
 * @param trackName The track name to create the plugin on 
 * @param nth Index (if there are multiple plugins of the same kind on the
 *    track - see cybr.plugin.select)
 * @param extraMessages cybr messages to configure plugin parameters
 * @param client the cybr client use to retrieve plugin state
 * @param pauseMs the duration to wait between setting the plugin parameters, and
 *    retrieving the state. Some plugins do not report their state immediately
 */
export async function requestReport(
  pluginName : string,
  pluginType? : string,
  trackName : string = 'plugin-helper-track',
  nth : number = 0,
  extraMessages : any[] = [],
  client : IpcClient = new IpcClient({}),
  pauseMs : number = 120
){
  if (!(client instanceof IpcClient))
    throw new Error('cybr.requests.requestReport was not passed an IpcClient instance')

  const msg1 = [
    audiotrack.select(trackName),
    plugin.select(pluginName, pluginType, nth),
    ...extraMessages]

  const msg2 = [
    audiotrack.select(trackName),
    plugin.select(pluginName, pluginType, nth),
    plugin.getReport(),
  ]
  await client.send(msg1);
  await new Promise(resolve => setTimeout(resolve, pauseMs));
  const result2 = await client.send(msg2);

  // result2 is a osc-min bundle with a .elements array. The elements array
  // should contain one osc-min message for each object in msg2. If the request
  // was successful, a JSON string will be in result2.elements[2].args[2].value)

  const pluginReportOscArgs= result2?.elements[2]?.args
  if (!Array.isArray(pluginReportOscArgs)) {
    console.error(result2)
    throw new Error('cybr.requests.requestReport received invalid OSC response')
  }

  let [errorCode, errorString, jsonString] = pluginReportOscArgs

  const makeError = (reason) => new Error(`cybr.requests.requestReport ${reason}
plugin name: ${pluginName}
plugin type: ${pluginType}
server msg:  ${errorString.value}\n`)
  
  if (errorCode.value) throw makeError(`failed to get a plugin report.
Are you sure the ${pluginName} (${pluginType}) plugin is installed?
Try '$ cybr --scan-plugins' and '$ cybr --list-plugins'`)

  try {
    return JSON.parse(jsonString.value)
  } catch {
    throw makeError('received invalid json from the server')
  }
}
