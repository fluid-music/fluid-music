import { MidiNoteEvent } from "./fluid-interfaces";

export class FluidMidiClip {
  events : MidiNoteEvent[] = []
  startTimeSeconds : number = 0
  durationSeconds : number = 0
}
