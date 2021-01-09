export { FluidPlugin, PluginType } from './FluidPlugin'
export { sessionToContentFluidMessage, sessionToTemplateFluidMessage } from './sessionToFluidMessage'
export { sessionToReaperProject } from './sessionToReaperProject'
export { FluidSession, SessionConfig } from './FluidSession'
export { FluidAudioFile, AudioFileOptions, AudioFileMode } from './FluidAudioFile'
export { FluidTrack, TrackConfig } from './FluidTrack'
export * as gen from './plugin-generator'
export * as converters from './converters'
export * as m from './m'
export * as random from './random'
export * as tLibrary from './t-library'
export * as tab from './tab'

// Unfortunately, JSDoc imports cannot currently access properties of namespaces
// that were exported via the `export * as namespace from './somewhere'` format.
// In order to access techniques, JSDoc imports have to import from the build
// directory, which is likely to change in the future.
//
// While while the example below is unstable, it is also (currently) the only
// option for non-typescript users:
// /** @typedef {import('fluid-music/built/techniques').AudioFile} AudioFile */
//
// Update: it appears that `export * from './somewhere'` is not well supported
// by typedoc. For that reason, I'm manually exporting names in techniques
// as opposed to using *. This probably means that it is possible to import
// techniques with the nicer syntax (see UseContext example below).
export * as techniques from './techniques'

// New Style Plugins
export * as plugins from './plugin-adapters/index'

// OSC Message Helpers
export * as cybr from './cybr/index';

export const UdpClient = require('./cybr/UdpClient');
export { IpcClient } from './cybr/IpcClient';
export { IpcClient as Client } from './cybr/IpcClient'

// Technique authors can use JSDoc imports to enable syntax completion
// /** @typedef {import('fluid-music').UseContext} UseContext */
// This allows /** @param {UseContext} */ in a technique's documentation
//
// Imports may also be written inline in JSDoc @param types
// /** @param {import('fluid-music').UseContext} context */
export { UseContext, ScoreConfig, UnresolvedSend, UnresolvedReceive } from './fluid-interfaces'
