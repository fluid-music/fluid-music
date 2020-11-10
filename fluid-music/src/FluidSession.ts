import * as path from 'path'

import * as tab from './tab'
import * as cybr from './cybr'
import { FluidReceive, FluidTrack, TrackConfig } from './FluidTrack';
import { ScoreConfig, ClipEventContext, Clip } from './fluid-interfaces';
import { sessionToTemplateFluidMessage, sessionToContentFluidMessage } from './sessionToFluidMessage'
import { sessionToReaperProject } from './sessionToReaperProject';
import { createWriteStream } from 'fs';
import { AudioFileMode } from './FluidAudioFile'

export interface SessionConfig extends ScoreConfig {
  bpm?: number
}

export class FluidSession {
  constructor(session: SessionConfig, tracks: TrackConfig[] = []) {
    if (typeof session.bpm === 'number') this.bpm = session.bpm
    this.scoreConfig = session

    for (const [name, track] of Object.entries(tracks)) {
      if (!track.name) track.name = name;
      const newTrack = (track instanceof FluidTrack)
        ? track
        : new FluidTrack(track);

      this.tracks.push(newTrack)
    }

    this.resolveSends()
    this.resolveSidechainReceives()
  }

  scoreConfig : ScoreConfig = {}
  bpm : number = 120
  tracks : FluidTrack[] = []
  regions : any[] = []

  /** position of the edit cursor, measured in whole notes */
  editCursorTime : number = 0

  /**
   * Recursively iterate over all tracks, including track folders and their
   * children, passing each track in to the supplied function as the first
   * argument. If the supplied function returns anything other than undefined,
   * the iteration is interrupted, and forEachTrack will return the value
   * returned by `func`.
   *
   * Note that iteration will be interrupted when `func` returns ANY value
   * other than `undefined`. This includes falsy values like `null` and `0`.
   *
   * IMPORTANT: This iterates over the underlying arrays directly, so you
   * should not add or remove tracks to the session during iteration.
   *
   * @param func for each track, func will be called with three arguments:
   *    (1) a `FluidTrack`
   *    (2) an index which specifies the position of the track within
   *    its immediate parent
   *    (3) a 'ancestors' array, which contains the track's parent, (and its
   *    parent's parent, etc) starting with the 'oldest' grandparent, and ending
   *    with the tracks immediate parent.
   */
  forEachTrack<T>(func : {(track : FluidTrack, index : number, parents: FluidTrack[]) : T }) : T|undefined {
    let cumulativeIndex = 0

    const iterateOver = (tracks: FluidTrack[], parents: FluidTrack[]) : T|undefined => {
      let i = 0 // parentIndex

      for (const track of tracks) {
        const result = func(track, i++, parents)
        if (result !== undefined) return result

        if (track.children.length) {
          const result = iterateOver(track.children, [...parents, track])
          if (result !== undefined) return result
        }
      }
      return undefined
    }

    return iterateOver(this.tracks, [])
  }

  getTrackByName(name: string) : FluidTrack|null {
    const result = this.forEachTrack(track => {
      return track.name === name ? track : undefined
    })

    return result || null
  }

  getOrCreateTrackByName(name: string) : FluidTrack {
    const track = this.getTrackByName(name)
    if (track) return track

    const newTrack = new FluidTrack({ name })
    this.tracks.push(newTrack)
    return newTrack
  }

  /**
   * Insert a score object into the session.
   *
   * The contents of the score will be inserted at `session.editCursorTime`,
   * unless a `config.starTime` is specified.
   *
   * Inserting moves `session.editCursorTime` to the end of newly inserted
   * content. (When no `config.startTime is specified, calling `insertScore`
   * multiple times inserts contents sequentially)
   */
  insertScore(score: any, config: ScoreConfig = {}) {
    config = { startTime: this.editCursorTime, ...config }
    const r = parse(score, this, config)
    this.editCursorTime = r.duration + r.startTime
    this.processEvents()
  }

  /**
   * Iterate over the tracks, and resolve any unresolved sends. This is used
   * internally, and does not need to be called by consuming code.
   *
   * Sends are specified on sending tracks, but stored in receiving tracks. This
   * makes it easy to delete a track without having to go hunt down all the
   * tracks that send to it.
   */
  resolveSends() {
    this.forEachTrack((sendTrack, i) => {
      if (!sendTrack.unresolvedSends.length) return

      sendTrack.unresolvedSends = sendTrack.unresolvedSends.filter(send => {
        const receiveTrack = this.getTrackByName(send.to)
        if (receiveTrack) {
          const receiveOptions = Object.assign({}, send, {from: sendTrack})
          const receive = new FluidReceive(receiveOptions)
          receiveTrack.receives.push(receive)
          return false
        } else {
          console.warn(`WARNING: Track (${sendTrack.name}) contains a send to a non-existent track (${send.to})`)
          return true
        }
      })
    })
  }

  resolveSidechainReceives() {
    this.forEachTrack(track => {
      for (const plugin of track.plugins) {
        if (plugin.unresolvedSidechainReceive) {
          const sendTrackName = plugin.unresolvedSidechainReceive.from;
          const sendTrack = this.getTrackByName(sendTrackName)
          if (sendTrack) {
            plugin.sidechainReceive = new FluidReceive({
              from: sendTrack,
              tap: plugin.unresolvedSidechainReceive.tap,
              gainDb: plugin.unresolvedSidechainReceive.gainDb
            })
            delete plugin.unresolvedSidechainReceive
          } else {
            console.warn(`WARNING: Track (${track.name}) includes a plugin (${plugin.pluginName})which contains a sidechain receive from a non-existent track (${sendTrackName})`)
          }
        }
      }
    })
  }

  processEvents() {
    // Charles: At some point in the future, I may implement custom finalizers,
    // which could be stored in a Map like this:
    // const finalizers = new Map<Clip, {(clip : Clip) : any}[]>()

    this.forEachTrack(track => {

      if (!track.clips || !track.clips.length) {
        console.warn(`processEvents: skipping ${track.name}, because it has no .clips`)
      }

      track.clips.forEach((clip, clipIndex) => {
        const context : ClipEventContext = {
          session: this,
          track,
          clip,
          clipIndex,
          data: {},
          d: {},
        }

        for (const event of clip.events) {
          if (typeof event.technique?.use === 'function') {
            if (event.d) context.d = event.d
            event.technique.use(event.startTime, event.duration, context)
          } else {
            throw new Error(`Unhandled Event (no .use(...) method): ${JSON.stringify(event)}`)
          }
        } // iterate over "TechniqueEvent"
        clip.events = []
      })  // iterate over clips  with clips.forEach method
    })    // iterate over tracks with session.forEachTrack

    // Finalize
    this.forEachTrack(track => {
      track.audioFiles.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
      for (let i = 1; i < track.audioFiles.length; i++) {
        const fEvent1 = track.audioFiles[i - 1]
        const fEvent2 = track.audioFiles[i]
        if (fEvent1.mode === AudioFileMode.OneVoice && typeof fEvent1.info.duration === 'number') {
          const maxDuration = fEvent1.info.duration - fEvent1.startInSourceSeconds
          const secondsBetween = fEvent2.startTimeSeconds - fEvent1.startTimeSeconds
          fEvent1.durationSeconds = Math.min(secondsBetween + fEvent1.fadeOutSeconds, maxDuration)
        }
      }
    })
  }

  /**
   * Create a .tracktionedit file from the session. The `cybr` server must be
   * running when this is called.
   *
   * WARNING: sessionToTracktionEdit may not be called simultaneously with other
   * methods that access the cybr server. Use `await` or `.then` to make sure that
   * this method finishes before using communicating with the server
   *
   * @param filename can be absolute or relative to the working directory. The
   *    .tracktionedit file extension will be added if it is not present
   * @param client created (and closed) automatically when not provided
   */
  async saveAsTracktionFile (
    filename : string = 'fluid',
    client? : cybr.IpcClient)
  {
    let closeWhenFinished = false

    // create a client if caller did not provide one
    if (!client) {
      closeWhenFinished = true
      client = new cybr.IpcClient()
      await client.connect(true)
    }

    // create a filename if the caller did not provide one
    if (!filename) filename = 'fluid'
    if (!path.isAbsolute(filename)) filename = path.join(process.cwd(), filename)
    if (!filename.toLowerCase().endsWith('.tracktionedit')) filename += '.tracktionedit'

    await client.send([
      cybr.global.activate(filename, true),
      sessionToTemplateFluidMessage(this),
      sessionToContentFluidMessage(this),
    ])

    await new Promise(resolve => setTimeout(resolve, 100))
    await client.send(cybr.global.save())

    if (closeWhenFinished) client.close()
  }

  async saveAsReaperFile (
    filename : string = 'fluid',
    client? : cybr.IpcClient)
  {
    // create a filename if the caller did not provide one
    if (!filename) filename = 'fluid'
    if (!path.isAbsolute(filename)) filename = path.join(process.cwd(), filename)
    if (!filename.toLowerCase().endsWith('.rpp')) filename += '.RPP'

    const rpp = await sessionToReaperProject(this, client)
    const stream = createWriteStream(filename, 'utf8')
    stream.write(rpp.dump())
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
  config : ScoreConfig = {})
{
  config = Object.assign({}, config); // Shallow copy should be ok

  const result = {
    duration: 0,
    startTime: 0,
  };
  if (typeof config.startTime === 'number') result.startTime = config.startTime as number;

  //------------------------------------------------------------------------------ ensure that we do not modify the n/dLibrary, as it may be reused later
  if (scoreObject.hasOwnProperty('tLibrary'))     config.tLibrary = Object.assign((config.tLibrary && Object.assign({}, config.tLibrary)) || {}, scoreObject.tLibrary);
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

    // Make the tLibrary and dLibrary
    const tLibrary = {};
    if (session.scoreConfig.tLibrary) Object.assign(tLibrary, session.scoreConfig.tLibrary);
    if (track.scoreConfig.tLibrary) Object.assign(tLibrary, track.scoreConfig.tLibrary);
    if (config.tLibrary) Object.assign(tLibrary, config.tLibrary);
    const dLibrary = {};
    if (session.scoreConfig.dLibrary) Object.assign(dLibrary, session.scoreConfig.dLibrary);
    if (track.scoreConfig.dLibrary) Object.assign(dLibrary, track.scoreConfig.dLibrary);
    if (config.dLibrary) Object.assign(dLibrary, config.dLibrary);

    // create the clip
    const rhythmObject = tab.parseRhythm(r);
    const resultClip = tab.parseTab(rhythmObject, scoreObject, tLibrary);
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
