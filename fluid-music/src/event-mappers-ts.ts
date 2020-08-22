import { FluidEvent, ClipEventContext } from "./ts-types";
import { Automation, AutomationPoint } from './plugin';

/**
 * @param {Event} event
 * @param {ClipEventContext} context
 */
export function mapAutomation(event: FluidEvent, context : ClipEventContext) {
  if (event.type === 'pluginAuto') {
    if (!event.plugin || !event.param)
      throw new Error(`event with type='pluginAuto' missing either a .plugin or a .param ${JSON.stringify(event)}`)
    if (typeof event.plugin.pluginName !== 'string')
      throw new Error(`event with type='pluginAuto' missing plugin.name string: ${JSON.stringify(event)}`);
    if (event.value == null)
      throw new Error(`event with type='pluginAuto' missing .value: ${JSON.stringify(event)}`);
  } else if (event.type === 'trackAuto') {
    if (!event.param || !event.param.name)
      throw new Error(`event with type='trackAuto' missing .param.name: ${JSON.stringify(event)}`)
  } else {
    return event; // only handle 'trackAuto' and 'pluginAuto' types
  }

  let automation : Automation | null = null;
  if (event.type === 'trackAuto') {
    automation = context.track.automation;
  } else {
    // Find or create the plugin
    const nth     = event.plugin.nth || 0;
    const matches = context.track.plugins.filter(plugin => plugin.pluginName === event.plugin.pluginName && plugin.pluginType == event.plugin.pluginType);
    if (nth >= matches.length) {
      const needed = nth - matches.length + 1;
      if (needed > 0) throw new Error(`${needed} missing ${event.plugin.pluginName} plugins of on ${context.track.name} track`);
      // Charles: This R.times code was from before the TypeScript refactor. It should be replaced. 
      // R.times(() => {
      //   const plugin = { // Create PluginInstance object
      //     name: event.plugin.name,
      //     automation: {},
      //     type: event.plugin.type,
      //   };
      //   matches.push(plugin);
      //   context.track.plugins.push(plugin);
      // }, needed);
    }
    const plugin = matches[nth];
    automation = plugin.automation;
  }

  const paramName = event.param.name;
  const startTime = (context.clip.startTime as number) + (event.startTime as number);
  const point : AutomationPoint= {
    startTime,
    value: (event.value as number),
    curve: 0,
  };
  if (typeof event.curve === 'number')
    point.curve = (event.curve as number)

  if (!automation.hasOwnProperty(paramName)) automation[paramName] = { points: [] };
  automation[paramName].points.push(point)
}