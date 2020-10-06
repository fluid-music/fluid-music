import { FluidPlugin, Automation } from "./plugin";
import { FluidEvent } from './fluid-events'

/**
 * @member duration length measured in whole notes
 */
export interface Clip {
  events : FluidEvent[];
  midiEvents : FluidEvent[];
  fileEvents : FluidEvent[];
  unmappedEvents: FluidEvent[];
  duration : number;
  startTime? : number;
  eventMappers? : any[];
}

export interface xLibrary {
  [key: string]: FluidEvent;
}

export interface ScoreConfig {
  nLibrary?: xLibrary;
  dLibrary?: xLibrary;
  eventMappers?: any[];
  r?: string;
  d?: string;
}

export interface ScoreObject {
  [key : string] : any;
  [key : number] : any;
};

/**
 * @member gain post-fx gain in dbfs
 * @member pan post-fx pan (-1 to 1)
 * @member duration? length measured in whole notes
 * @member automation? 
 */
export interface Track {
  name: string;
  gain: number;
  pan: number;
  clips: Clip[];
  plugins: FluidPlugin[];
  automation: Automation;
  duration? : number;
  startTime? : number;
}

export interface TracksObject {
  [name: string] : Track;
}



/**
 * Score.parse passes ClipEventContext objects as the second argument to
 * eventMapper functions. Its fields specify the context of the ClipEvent
 * currently being processed, including the track and clip that contain the
 * note.
 * @member bpm the bpm of the clip, this is needed in 
 *    tracksToReaperProject.
 * @member clip the Clip that contains the current event
 * @member track the Track that contains the current event
 * @member tracks
 * @member clipIndex index of the clip within the track
 * @member eventIndex index of the event within the clip.
 *    score.parse updates this automatically before each eventMapper
 *    callback. Note available in (non-end-user) cases where a callback is
 *    passed an array of events, this will not be available.
 * @member data this is a convenient place for `eventMapper`
 *    callbacks to store data if (for example) the event mapper needs to
 *    preserve information between callbacks. Like the EventContext, it is
 *    replaced for each Clip.
 * @member messages only used in tracksToFluidMessage
 */
export interface ClipEventContext {
  clip: Clip;
  track: Track;
  clipIndex: number;
  data: any;
  bpm?: number;
  eventIndex?: number;
  messages?: any[];
}