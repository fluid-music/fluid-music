import * as tab from './tab'
import { FluidTrack, TrackConfig } from './FluidTrack';
import { ScoreConfig, ClipEventContext, ClipEvent } from './fluid-interfaces';
import { EventClass, AudioFile, MidiNote, TrackAuto, PluginAuto, MidiChord, Chord, ILayers, Random } from './fluid-techniques'

export interface TracksConfig {
  [trackName: string] : TrackConfig | FluidTrack
}

export interface SessionConfig extends ScoreConfig {
  bpm?: number
}

export class FluidSession {
  constructor(config: SessionConfig, tracks: TracksConfig = {}) {
    if (typeof config.bpm === 'number') this.bpm = config.bpm
    this.scoreConfig = config

    for (const [name, track] of Object.entries(tracks)) {
      if (!track.name) track.name = name;
      const newTrack = (track instanceof FluidTrack)
        ? track
        : new FluidTrack(track);

      this.tracks.push(newTrack)
    }

    this.registerEventClass(AudioFile, 'file')
    this.registerEventClass(MidiNote, 'midiNote')
    this.registerEventClass(TrackAuto, 'trackAuto')
    this.registerEventClass(PluginAuto, 'pluginAuto')
    this.registerEventClass(MidiChord, 'midiChord')
    this.registerEventClass(Chord)
    this.registerEventClass(ILayers, 'iLayers')
    this.registerEventClass(Random, 'random')
  }

  scoreConfig : ScoreConfig = {}
  bpm : number = 120
  tracks : FluidTrack[] = []
  regions : any[] = []
  startTime? : number
  duration? : number
  readonly eventTypes : Map<string, EventClass> = new Map<string, EventClass>()

  /**
   * Register a custom class type for handling raw events. Raw events are just
   * JavaScript objects that have a .type string. Use this method to register
   * constructors for Raw objects.
   *
   * @param eventClass A Class that extends EventBase. The class name (for
   *    example, `EventAudioFile`) will be registered automatically.
   * @param extraTypeNames Raw events use a .type string to identify which
   *    class they should be constructed with. Any type string
   */
  registerEventClass(eventClass : EventClass, ...extraTypeNames : string[]) {
    extraTypeNames.unshift(eventClass.name)
    for (const name of extraTypeNames) {
      if (this.eventTypes.has(name)) console.warn('WARNING: overwriting event type: ' + name)
      this.eventTypes.set(name, eventClass)
    }
  }

  getOrCreateTrackByName(name: string) : FluidTrack {
    for (const track of this.tracks)
      if (track.name === name)
        return track

    const newTrack = new FluidTrack({ name })
    this.tracks.push(newTrack)
    return newTrack
  }

  insertScore(score: any, config: any = {}) {
    const r = parse(score, this, config)
    // Charles: duration and startTime could be wrong if insert score is called more than once OR config specifies a non-zero start time
    this.duration = r.duration
    this.startTime = r.startTime
    // Charles: processEvents also breaks if insertScore is called more than once
    this.processEvents()
  }

  processEvents() {
    for (const track of this.tracks) {
      if (tab.reservedKeys.hasOwnProperty(track.name)) {
        continue
      }

      if (!track.clips || !track.clips.length) {
        console.warn(`processEvents: skipping ${track.name}, because it has no .clips`)
        continue
      }

      track.clips.forEach((clip, clipIndex) => {
        const context : ClipEventContext = {
          track,
          clip,
          clipIndex,
          data: {},
          d: {},
        };

        const processEvent = (event : ClipEvent|ClipEvent[]|null) => {
          if (!event) return

          if (Array.isArray(event)) {
            if (!event.length) return
            return processEvent(event.map(processEvent).filter(e => !!e))
          }

          if (event.technique?.constructor === Object) {
            if (typeof event.technique.type !== 'string') throw new Error(`invalid event (Object without .type string):${JSON.stringify(event)}`)
            let typeClass = this.eventTypes.get(event.technique.type)
            if (!typeClass) throw new Error(`"${event.technique.type}" is not a registered event type: ${JSON.stringify(event)}`)
            event.technique = new typeClass(event.technique)
          }

          if (typeof event.technique?.use === 'function') {
            if (event.d) context.d = event.d
            return processEvent(event.technique.use(event.startTime, event.duration, context))
          }

          throw new Error(`Unhandled Event (no .use(...) method): ${JSON.stringify(event)}`)
        }

        for (let event of clip.events) processEvent(event)
      }); // iterate over clips  with clips.forEach method
    }     // iterate over tracks with for...of loop
  }
}

/**
 * Parse descends through a Score Object, and creates clips for every pattern
 * string in a child object. These clips will be added to their parent track,
 * on the supplied session.
 *
 * Note that the clips will not be ready for use: All events will be placed in
 * the clip.events member. `session.processEvents` moves the events to their
 * final homes.
 */
export function parse(
  scoreObject,
  session : FluidSession = new FluidSession({}),
  config)
{
  if (!config) config = {}
  else config = Object.assign({}, config); // Shallow copy should be ok

  const result = {
    duration: 0,
    startTime: 0,
  };
  if (typeof config.startTime === 'number') result.startTime = config.startTime as number;

  //------------------------------------------------------------------------------ ensure that we do not modify the n/dLibrary, as it may be reused later
  if (scoreObject.hasOwnProperty('nLibrary'))     config.nLibrary = Object.assign((config.nLibrary && Object.assign({}, config.nLibrary)) || {}, scoreObject.nLibrary);
  if (scoreObject.hasOwnProperty('dLibrary'))     config.dLibrary = Object.assign((config.dLibrary && Object.assign({}, config.dLibrary)) || {}, scoreObject.dLibrary);
  if (scoreObject.hasOwnProperty('r'))            config.r = scoreObject.r;
  if (scoreObject.hasOwnProperty('d'))            config.d = scoreObject.d;
  // Note that we cannot specify a .startTime in a score like we can for rhythms
  if (typeof config.startTime !== 'number') config.startTime = 0;

  // Internally, there are three handlers for (1)arrays (2)strings (3)objects
  //
  // All three handlers must:
  // - return an object that has a .duration property. Durations are interpreted
  //   differently for Arrays, Objects, and Strings found in the input object.
  //   - Array:  sum of the duration of the array's elements
  //   - Object: duration of the longest child
  //   - string: duration of the associated rhythm string
  //
  // The array and object handlers must:
  // - create an appropriate `config` object for each child
  // - call parse on each child
  //
  // The string handler must:
  // - create clips with a .startTime and .duration
  // - add those clips to the track.clips array

  // create the track if it does not exist
  config.trackKey && session.getOrCreateTrackByName(config.trackKey);

  if (Array.isArray(scoreObject)) {
    let arrayStartTime = config.startTime;

    for (let o of scoreObject) {
      config.startTime = arrayStartTime + result.duration;
      let r = parse(o, session, config);
      result.duration += r.duration;
    }
  } else if (typeof scoreObject === 'string') {
    // We have a string that can be parsed with parseTab
    if (typeof config.trackKey !== 'string')
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a track name`);
    const track = session.getOrCreateTrackByName(config.trackKey);

    // Get the dynamic and rhythm strings
    const d = config.d || track.scoreConfig.d || session.scoreConfig.d; // might be defined
    const r = config.r || track.scoreConfig.r || session.scoreConfig.r; // must be defined
    if (r === undefined)
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a rhythm`);

    // Make the nLibrary and dLibrary
    const nLibrary = {};
    if (session.scoreConfig.nLibrary) Object.assign(nLibrary, session.scoreConfig.nLibrary);
    if (track.scoreConfig.nLibrary) Object.assign(nLibrary, track.scoreConfig.nLibrary);
    if (config.nLibrary) Object.assign(nLibrary, config.nLibrary);
    const dLibrary = {};
    if (session.scoreConfig.dLibrary) Object.assign(dLibrary, session.scoreConfig.dLibrary);
    if (track.scoreConfig.dLibrary) Object.assign(dLibrary, track.scoreConfig.dLibrary);
    if (config.dLibrary) Object.assign(dLibrary, config.dLibrary);

    // create the clip
    const rhythmObject = tab.parseRhythm(r);
    const resultClip = tab.parseTab(rhythmObject, scoreObject, nLibrary);
    resultClip.startTime = config.startTime;

    // add dynamics
    if (d) {
      const getDynamic = tab.createDynamicGetter(rhythmObject, d, dLibrary);
      for (const event of resultClip.events) event.d = getDynamic(event.startTime);
    }
    track.clips.push(resultClip);
    result.duration = resultClip.duration;
  } else {
    // Assume we have a JavaScript Object
    for (let [key, val] of Object.entries(scoreObject)) {
      if (tab.reservedKeys.hasOwnProperty(key) && key !== 'clips') continue;
      if (key !== 'clips') config.trackKey = key; // if key='clips' use parent key
      let r = parse(val, session, config);
      if (r.duration > result.duration) result.duration = r.duration;
    }
  }

  return result;
};
