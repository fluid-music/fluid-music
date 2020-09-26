import { FluidEvent, ClipEventContext } from "./ts-types";
import { Automation, AutomationPoint, PluginAutomationEvent } from './plugin';

/**
 * @param {Event} event
 * @param {ClipEventContext} context
 */
export function mapAutomation(event: FluidEvent, context : ClipEventContext) {
  if (event.type === 'pluginAuto') {
    if (!event.pluginSelector || !event.paramKey)
      throw new Error(`event with type='pluginAuto' missing either a .pluginSelector or a .paramKey ${JSON.stringify(event)}`)
    if (typeof event.pluginSelector.pluginName !== 'string')
      throw new Error(`event with type='pluginAuto' missing pluginSelector.name string: ${JSON.stringify(event)}`);
    if (event.value == null)
      throw new Error(`event with type='pluginAuto' missing .value: ${JSON.stringify(event)}`);
  } else if (event.type === 'trackAuto') {
    if (typeof event.paramKey !== 'string')
      throw new Error(`event with type='trackAuto' does not have a .paramKey string: ${JSON.stringify(event)}`)
  } else {
    return event; // only handle 'trackAuto' and 'pluginAuto' types
  }

  let automation : Automation | null = null;
  if (event.type === 'trackAuto') {
    automation = context.track.automation;
  } else {
    // Find or create the plugin
    const nth     = event.pluginSelector.nth || 0;
    const matches = context.track.plugins.filter(plugin =>
      plugin.pluginName === event.pluginSelector.pluginName &&
      plugin.pluginType === event.pluginSelector.pluginType);

    if (nth >= matches.length) {
      const needed = nth - matches.length + 1;
      if (needed > 0) throw new Error(`${needed} missing ${event.pluginSelector.pluginName} plugins of on ${context.track.name} track`);
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

  const startTime = (context.clip.startTime as number) + (event.startTime as number);
  const point : AutomationPoint = {
    startTime,
    value: (event.value as number),
    curve: 0,
  };
  if (typeof event.curve === 'number')
    point.curve = (event.curve as number)

  if (!automation.hasOwnProperty(event.paramKey))
    automation[event.paramKey] = { points: [] };

  automation[event.paramKey].points.push(point);
}