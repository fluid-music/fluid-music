import { FluidSession } from './FluidSession'
import { FluidTrack } from './FluidTrack'

export interface Technique {
  use : {(context : UseContext) : any }
}

/** An Event is just anything with a startTime and a duration */
export interface Event {
  startTime: number
  duration: number
}

export interface TechniqueEvent extends Event {
  technique : Technique
  d? : DynamicObject
}

export interface MidiNoteEvent extends Event {
  note : number
  velocity : number
}

export interface DynamicObject {
  [key : string] : any
}

/**
 * @member duration length measured in whole notes
 */
export interface Clip {
  events : TechniqueEvent[];
  midiEvents : MidiNoteEvent[];
  unmappedEvents: any[];
  duration : number;
  startTime : number;
}

export interface dLibrary { [key: string] : any|any[] }
export interface tLibrary { [key: string] : Technique|Technique[] }

export interface ScoreConfig {
  tLibrary? : tLibrary
  dLibrary? : dLibrary
  r? : string
  d? : string
  trackKey? : string
  startTime? : number
}

export interface ScoreObject {
  [key : string] : any | any[];
  [key : number] : any | any[];
};


export enum Tap { postFader }
export interface TrackReceive {
  tap : Tap;
  gainDb : number;
  from : FluidTrack;
  // Reaper (and rppp) support panning stereo in sends, but tracktion does not.
  // For now, I will not implement panning in sends.
}

/**
 * ClipEventContext fields specify the context of the ClipEvent currently being
 * processed, including the track and clip that contain the note.
 */
export interface ClipEventContext {
  d: DynamicObject;

  /**
   * this is a convenient place to store data between .process callbacks. Like
   * the EventContext, it is replaced for each Clip.
   */
  data: { [key: string] : any };
  /** The session containing this track, clip, and event */
  session: FluidSession;
  /** the Clip that contains the current event */
  clip: Clip;
  /** the Track that contains the current event */
  track: FluidTrack;
  /** index of the clip within the track */
  clipIndex: number;
  /** index of the event within the clip. */
  eventIndex?: number;
}

export interface UseContext {
  d: DynamicObject;

  /**
   * this is a convenient place to store data between .process callbacks. Like
   * the EventContext, it is replaced for each Clip.
   */
  data: { [key: string] : any };
  /** The session containing this track, clip, and event */
  session: FluidSession;
  /** the Clip that contains the current event */
  clip?: Clip;
  /** the Track that contains the current event */
  track: FluidTrack;
  /** index of the clip within the track */
  clipIndex: number;
  /** index of the event within the clip. */
  eventIndex: number;
  /** Event time measured in whole notes */
  startTime: number;
  /** Event duration, measured in whole notes */
  duration: number;
  startTimeSeconds: number;
  durationSeconds: number;
}

/**
 * UnresolvedSends can be passed into FluidSession constructor in order to
 * describe a send even when the receiving track may not have been created yet.
 */
export interface UnresolvedSend {
  to : string
  gainDb? : number
  tap? : Tap
}

/**
 * UnresolvedReceives are used for describing sidechain inputs to plugins
 */
export interface UnresolvedReceive {
  /** track name */
  from : string
  gainDb?: number
  tap? : Tap
}
