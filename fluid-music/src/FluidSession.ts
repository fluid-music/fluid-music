const tab     = require('./tab');
const mappers = require('./event-mappers');

const reservedKeys = tab.reservedKeys;


import { FluidTrack, TrackConfig } from './FluidTrack';
import { ScoreConfig, ClipEventContext } from './ts-types';

export interface TracksConfig {
  [trackName: string] : TrackConfig | FluidTrack;
}

export interface SessionConfig extends ScoreConfig {
  bpm?: number;
}

export class FluidSession {
  constructor(config: SessionConfig, tracks: TracksConfig = {}) {
    if (typeof config.bpm === 'number') this.bpm = config.bpm;
    this.scoreConfig = config;

    for (const [name, track] of Object.entries(tracks)) {
      if (!track.name) track.name = name;
      const newTrack = (track instanceof FluidTrack)
        ? track
        : new FluidTrack(track);

      this.tracks.push(newTrack);
    }
  }

  scoreConfig : ScoreConfig = {};
  bpm : number = 120;
  tracks : FluidTrack[] = [];
  regions : any[] = [];
  startTime? : number;
  duration? : number;

  getOrCreateTrackByName(name: string) : FluidTrack {
    for (const track of this.tracks)
      if (track.name === name)
        return track;

    const newTrack = new FluidTrack({ name });
    this.tracks.push(newTrack);
    return newTrack;
  }

  insertScore(score: any, config: any) {
    const r = parse(score, this, config);
    // Charles: duration and startTime could be wrong if insert score is called more than once OR config specifies a non-zero start time
    this.duration = r.duration;
    this.startTime = r.startTime;
    // Charles: applyEventMappers also breaks if insertScore is called more than once
    applyEventMappers(this);
  }
}

/**
 * Parse descends through a Score Object, and creates clips for every pattern
 * string in a child object. These clips will be added to their parent track,
 * on the supplied session.
 *
 * Note that the clips will not be ready for use: All events will be placed in
 * the clip.events member. Use `applyEventMappers` to move the events to their
 * final homes.
 */
export function parse(
  scoreObject,
  session : FluidSession = new FluidSession({}),
  config)
{
  if (!config) config = {};
  else config = Object.assign({}, config); // Shallow copy should be ok

  const result = {
    duration: 0,
    startTime: 0,
  };
  if (typeof config.startTime === 'number') result.startTime = config.startTime as number;

  //                                                                               ensure that we do not modify the n/dLibrary, as it may be reused later
  if (scoreObject.hasOwnProperty('nLibrary'))     config.nLibrary = Object.assign((config.nLibrary && Object.assign({}, config.nLibrary)) || {}, scoreObject.nLibrary);
  if (scoreObject.hasOwnProperty('dLibrary'))     config.dLibrary = Object.assign((config.dLibrary && Object.assign({}, config.dLibrary)) || {}, scoreObject.dLibrary);
  if (scoreObject.hasOwnProperty('r'))            config.r = scoreObject.r;
  if (scoreObject.hasOwnProperty('d'))            config.d = scoreObject.d;
  if (scoreObject.hasOwnProperty('eventMappers')) config.eventMappers = scoreObject.eventMappers
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
    const d = config.d || track.scoreConfig.d || session.scoreConfig.d; // may be undefined
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
    if (config.eventMappers) resultClip.eventMappers = config.eventMappers;
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
      if (reservedKeys.hasOwnProperty(key) && key !== 'clips') continue;
      if (key !== 'clips') config.trackKey = key; // if key='clips' use parent key
      let r = parse(val, session, config);
      if (r.duration > result.duration) result.duration = r.duration;
    }
  }

  return result;
};

/**
 * @param {Session} session
 * @param {eventMapper[]} [ubiquitousMappers] fluid supplies a default
 *    collection of mappers that are needed for proper parsing. To override
 *    the default mappers, specify null or an empty array.
 */
export function applyEventMappers(session : FluidSession, ubiquitousMappers=mappers.default) {

  for (const track of session.tracks) {
    if (tab.reservedKeys.hasOwnProperty(track.name)) {
      continue;
    }

    if (!track.clips || !track.clips.length) {
      console.warn(`applyEventMappers: skipping ${track.name}, because it has no .clips`);
      continue;
    }

    track.clips.forEach((clip, clipIndex) => {
      const context : ClipEventContext = {
        track,
        clip,
        clipIndex,
        data: {},
      };

      ubiquitousMappers = ubiquitousMappers || []; // null overrides default
      let customMappers : any[] = [];
      if (clip.hasOwnProperty('eventMappers')) {
        customMappers = clip.eventMappers as any[];
        delete clip.eventMappers;
      }
      const eventMappers = customMappers.concat(ubiquitousMappers);
      // The code below shows what data are available inside eventMapper
      // callbacks. The contents of context.clip.events can look different to
      // each round of callbacks. Note the order of the loops: In the first
      // round, the first callback will be called on each event, potentially
      // removing that event from clip.events. Then, the second callback in the
      // eventMappers array will be called on each event. During the second
      // round of callbacks, clip.events may have a different length than during
      // the first round. This will happen if, for example, the callbacks in the
      // first round returned falsy values (removing events from clip.events in
      // subsequent rounds) or arrays (adding events to clip.events). Note that
      // changes to the contents of context.clip.events only take effect between
      // rounds. The exception would be if a callback explicitly modifies
      // context.clip.events -- however this would be a very poor design choice.
      // Callbacks should never need to do this and it could cause subtle bugs.
      //
      // A callback that needs access to the original list of events can access
      // it via the clip.unmappedEvents array. Note that even though events in
      // the unmappedEvents array will not be added or removed by eventMappers,
      // they will still be mutated by event mappers, so the event.n members
      // will likely not look the same as the objects in the .nLibrary objects.
      clip.unmappedEvents = clip.events;
      clip.events = clip.events.flat();
      for (const eventMapper of eventMappers) {
        clip.events = clip.events.flatMap((event, i) => {
          context.eventIndex = i;
          return eventMapper(event, context);
        }).filter(event => !!event);
      }; // iterate over eventMappers
    });  // iterate over clips
  }      // iterate over tracks
}
