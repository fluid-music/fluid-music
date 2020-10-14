import { FluidPlugin, Automation } from "./plugin";

export interface Event {
  startTime: number
  duration: number
  d? : DynamicObject
}

export interface AudioFileInfo {
  [key: string] : any
  /** length in seconds */
  duration? : number
  bitsPerSample? : number
  sampleRate? : number
  numberOfChannels? : number
}

export interface AudioFileEvent extends Event {
  path : string
  fadeOutSeconds : number
  fadeInSeconds : number

  /**
   * When true, the inserted audio file will play to its end instead of obeying
   * event length (default=false)
   */
  oneShot : boolean
  info : AudioFileInfo
  startInSourceSeconds : number
}

export interface DynamicObject {
  [key : string] : any
}

export interface ClipEvent {
  startTime : number
  duration : number
  technique : any
  d? : DynamicObject
}

/**
 * @member duration length measured in whole notes
 */
export interface Clip {
  events : ClipEvent[];
  midiEvents : any[];
  fileEvents : AudioFileEvent[];
  unmappedEvents: any[];
  duration : number;
  startTime? : number;
}

export interface xLibrary {
  [key: string]: any[];
}

export interface ScoreConfig {
  nLibrary?: xLibrary;
  dLibrary?: xLibrary;
  r?: string;
  d?: string;
}

export interface ScoreObject {
  [key : string] : any | any[];
  [key : number] : any | any[];
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

/**
 * Score.parse passes ClipEventContext objects as the second argument to
 * eventMapper functions. Its fields specify the context of the ClipEvent
 * currently being processed, including the track and clip that contain the
 * note.
 * @member bpm the bpm of the clip, this is needed in 
 *    tracksToReaperProject.
 * @member clip the Clip that contains the current event
 * @member track the Track that contains the current event
 * @member clipIndex index of the clip within the track
 * @member eventIndex index of the event within the clip.
 *    session.processEvents updates this automatically before each event is
 *    processed.
 * @member data this is a convenient place to store data if between .process
 *    callbacks. Like the EventContext, it is replaced for each Clip.
 */
export interface ClipEventContext {
  /**
   * dynamic object
   */
  d: DynamicObject;

  clip: Clip;
  track: Track;
  clipIndex: number;
  data: { [key: string] : any };
  bpm?: number;
  eventIndex?: number;
}
