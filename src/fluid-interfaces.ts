import { FluidSession } from './FluidSession'
import { FluidTrack } from './FluidTrack'

export interface Technique {
  use : {(context : UseContext) : any }

  /**
   * Techniques may have a finalize method, which will be invoked in when
   * calling `session.finalize()` for each unique finalize function that was
   * inserted via `session.insertScore(...)` since the last call to
   * `session.finalize`. Note that the when finalize methods are not associated
   * with any particular technique instance, so `.this` will be undefined inside
   * the finalize method invocation.
   *
   * The order that finalizers will be called in is undefined. It's a good idea
   * to make finalizers idempotent because a finalizer may be called more than
   * one if the user does the following:
   *
   * 1. `session.insertScore(scoreContainingFinalizerTechnique)
   * 2. `session.finalize()
   * 3. `session.insertScore(scoreContainingFinalizerTechnique)
   * 4. `session.finalize() // finalizer invoked a second time`
   */
  finalize? : {(session : FluidSession) : any }
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
 * While parsing a score, each pattern string will create a clip
 * @member duration length measured in whole notes
 */
export interface Clip {
  events : TechniqueEvent[];
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
 * When parsing a score, a UseContext is created for each event (character) in
 * the score. Note that the .data property is created anew for each Clip (clips
 * are created by pattern strings in the score).
 */
export interface UseContext {
  d: DynamicObject;

  /**
   * `data` is a convenient place to store data between `.use` callbacks. One
   * `.data` object will be created for each pattern string found in a score.
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
