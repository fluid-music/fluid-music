export { PluginAutomation, TrackAutomation, SendAutomation, SendAutomationRamp } from './automation'
export { ILayers, MidiChord, MidiNote, Random, Nudge } from './basic'
export { AudioFile, AFOnset, AFReverse, AFReverseLeadIn } from './audio-file'

// Charles: It would be nice to export techniques like this:
// export * from './somewhere'
// Unfortunately, typedoc does not support this format, so we must remember to
// manually add export techniques
