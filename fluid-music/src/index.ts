export { FluidPlugin, PluginType } from './FluidPlugin';
export { sessionToContentFluidMessage, sessionToTemplateFluidMessage } from './sessionToFluidMessage';
export { sessionToReaperProject } from './sessionToReaperProject'
export { FluidSession } from './FluidSession';
export { FluidAudioFile } from './FluidAudioFile'
export * as gen from './plugin-generator';
export * as converters from './converters';
export * as m from './m'
export * as random from './random';
export * as techniques from './fluid-techniques';
export * as tLibrary from './t-library';
export * as tab from './tab';

// New Style Plugins
export * as plugins from './plugin-adapters/index'

// OSC Message Helpers
export * as cybr from './cybr/index';

export const UdpClient = require('./cybr/UdpClient');
export { IpcClient } from './cybr/IpcClient';
export { IpcClient as Client } from './cybr/IpcClient'

// Technique authors can get syntax completion in VS Code via jsdoc comments.
// For example, the documentation of a techniques .use method should look like:
// /** @param {import('fluid-music').UseContext} context */
export { UseContext } from './fluid-interfaces'
