import * as path from 'path'
import * as chalk from 'chalk'

import * as tab from './tab'
import * as cybr from './cybr'
import { FluidReceive, FluidTrack, TrackConfig } from './FluidTrack';
import { dLibrary, ScoreConfig, tLibrary, UseContext, Event } from './fluid-interfaces';
import { sessionToTemplateFluidMessage, sessionToContentFluidMessage } from './sessionToFluidMessage'
import { sessionToReaperProject } from './sessionToReaperProject';
import { createWriteStream } from 'fs';
import { AudioFileMode } from './FluidAudioFile'

export interface SessionConfig extends ScoreConfig {
  /** Beats per minute */
  bpm?: number

  /** Looping is disabled by default unless you specify a `loopStartTime` */
  loopEnabled? : boolean

  /** Loop region start time, specified in whole notes */
  loopStartTime? : number

  /**
   * Loop region duration, specified in whole notes. Automatically enables
   * looping unless `loopEnabled: false` is explicit
   * */
  loopDuration? : number
}

export class FluidSession {
  constructor(session: SessionConfig, tracks: TrackConfig[] = []) {
    if (typeof session.bpm === 'number') this.bpm = session.bpm
    if (typeof session.loopDuration === 'number') this.loopRegion.duration = session.loopDuration
    if (typeof session.loopStartTime === 'number') this.loopRegion.startTime = session.loopStartTime
    if (typeof session.loopEnabled === 'boolean') this.loopEnabled = session.loopEnabled
    else if (typeof session.loopDuration === 'number') this.loopEnabled = true

    if (session.d) this.scoreConfig.d = session.d
    if (session.dLibrary) this.scoreConfig.dLibrary = session.dLibrary
    if (session.r) this.scoreConfig.r = session.r
    if (session.tLibrary) this.scoreConfig.tLibrary = session.tLibrary
    if (session.trackKey) this.scoreConfig.trackKey = session.trackKey
    if (session.startTime) this.scoreConfig.startTime = session.startTime

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

  /** Position of the edit cursor, measured in whole notes */
  editCursorTime : number = 0

  /** Loop region, measured in whole notes */
  loopRegion : Event = {
    startTime: 0,
    duration: 0
  }

  loopEnabled : boolean = false

  /**
   * Recursively iterate over all tracks, including track folders and their
   * children, passing each track in to the supplied function as the first
   * argument. If the supplied function returns anything other than `undefined`,
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
  forEachTrack<T>(func : {(track : FluidTrack, index : number, ancestors: FluidTrack[]) : T }) : T|undefined {
    let cumulativeIndex = 0

    const iterateOver = (tracks: FluidTrack[], ancestors: FluidTrack[]) : T|undefined => {
      let i = 0 // parentIndex

      for (const track of tracks) {
        const result = func(track, i++, ancestors)
        if (result !== undefined) return result

        if (track.children.length) {
          const result = iterateOver(track.children, [...ancestors, track])
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
   * Find a track by name, returning that track and all of its ancestors in an
   * array. The first track in the array will always be a track at the root
   * level of the session. Every track in the array *except for the last one*,
   * is guaranteed to be a track folder (meaning its `.children.length` property
   * will be non-zero).
   *
   * If the track is not found, it will be created at the root level, and
   * returned in an array with `.length == 1`.
   * @param name
   */
  getOrCreateTrackAncestorsByName(name: string) : FluidTrack[] {
    const results = this.forEachTrack((track, index, ancestors) => {
      return track.name === name ? [...ancestors, track] : undefined
    })
    if (results) return results

    const newTrack = new FluidTrack({ name })
    this.tracks.push(newTrack)
    return [ newTrack ]
  }

  /**
   * Insert a score object into the session.
   *
   * The contents of the score will be inserted at `session.editCursorTime`,
   * unless a `config.startTime` is specified.
   *
   * Inserting moves `session.editCursorTime` to the end of newly inserted
   * content. (When no `config.startTime` is specified, calling `insertScore`
   * multiple times inserts contents sequentially)
   * @chainable
   */
  insertScore(score: any, config: ScoreConfig = {}) {
    config = { startTime: this.editCursorTime, ...config }
    const r = parse(score, this, config)
    this.editCursorTime = r.duration + r.startTime
    this.processEvents()
    return this
  }

  /**
   * Iterate over the tracks, and resolve any unresolved sends. This is used
   * internally by [[FluidSession.constructor]]. It does not need to be called
   * by consuming code unless you manually add tracks with unresolved sends to
   * [[FluidSession.tracks]].
   *
   * Sends are specified on sending tracks, but stored in receiving tracks. This
   * makes it easy to delete a track without having to go hunt down all the
   * tracks that send to it.
   * @internal
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

  /**
   * Iterate over track's plugins, and resolve sidechain receives. This is used
   * internally by [[FluidSession.constructor]]. It does not need to be called
   * from consuming code unless you manually add unresolved sidechain receives
   * to a new or existing track plugin.
   * @internal
   */
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

  timeWholeNotesToSeconds(timeInWholeNotes : number) {
    return timeInWholeNotes * 4 * 60 / this.bpm
  }

  timeSecondsToWholeNotes(timeInSeconds : number) {
    return timeInSeconds * this.bpm / 4 / 60
  }

  /**
   * Iterate over tracks and their clips, calling each technique's
   * `.use(context)` method.
   *
   * This is called internally by [[FluidSession.insertScore]], and does not
   * need to be called by consuming code.
   * @internal
   */
  processEvents() {
    this.forEachTrack(track => {
      track.clips.forEach((clip, clipIndex) => {
        const data = {}
        let eventIndex = 0
        for (const event of clip.events) {
          if (typeof event.technique?.use === 'function') {
            let useContext : UseContext = {
              d: event.d ? event.d : {},
              track,
              clip,
              clipIndex,
              data,
              eventIndex: eventIndex++,
              session: this,
              startTime: clip.startTime + event.startTime,
              duration: event.duration,
              startTimeSeconds: this.timeWholeNotesToSeconds(event.startTime + clip.startTime),
              durationSeconds: this.timeWholeNotesToSeconds(event.duration)
            }

            event.technique.use(useContext)
          } else {
            throw new Error(`Unhandled Event (no .use(...) method): ${JSON.stringify(event)}`)
          }
        } // iterate over "TechniqueEvent"
        clip.events = []
      })  // iterate over clips  with clips.forEach method
    })    // iterate over tracks with session.forEachTrack
  }

  finalize() {
    // Charles: At some point in the future, I may implement custom finalizers,
    // which could be stored in a Map like this:
    // const finalizers = new Map<Clip, {(clip : Clip) : any}[]>()

    // Finalize
    this.forEachTrack(track => {
      track.audioFiles.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
      for (let i = 1; i < track.audioFiles.length; i++) {
        const fEvent1 = track.audioFiles[i - 1]
        const fEvent2 = track.audioFiles[i]
        if (fEvent1.mode === AudioFileMode.OneVoice && typeof fEvent1.info.duration === 'number') {
          const secondsBetween = fEvent2.startTimeSeconds - fEvent1.startTimeSeconds
          const maxDurationSeconds = secondsBetween + fEvent1.fadeOutSeconds
          const currentSeconds = fEvent1.durationSeconds
          const trimSeconds = maxDurationSeconds - currentSeconds

          // Shrink only, don't expand
          if (trimSeconds < 0) {
            fEvent1.growRightEdgeBySecondsSafe(trimSeconds)
          }
        }
      }
    })

    return this
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
   *    `.tracktionedit` file extension will be added if it is not present
   * @param client an [[IpcClient]] will be created (and closed) automatically
   *    when not provided. When you do provide a client, that client must be
   *    configured with `keepOpen=true`.
   */
  async saveAsTracktionFile (
    filename : string = 'session',
    client? : cybr.IpcClient)
  {
    let closeWhenFinished = false

    // create a client if caller did not provide one
    if (!client) {
      closeWhenFinished = true
      client = new cybr.IpcClient()
      await client.connect(true)
    }

    await this.sendToServer(filename, client)
    await new Promise(resolve => setTimeout(resolve, 100))
    await client.send(cybr.global.save())

    if (closeWhenFinished) client.close()
  }

  /**
   * Send the entire session to the cybr server. If the server already has an
   * active session, it will be replaced by this session.
   *
   * @param filename can be absolute or relative to the working directory. The
   *    `.tracktionedit`. This file extension will be added if it is not present
   * @param client an [[IpcClient]] will be created (and closed) automatically
   *    when not provided. When you do provide a client, that client must be
   *    configured with `keepOpen=true`.
   */
  async sendToServer (
    filename : string = 'session',
    client? : cybr.IpcClient
  ) {
    let closeWhenFinished = false

    // create a client if caller did not provide one
    if (!client) {
      closeWhenFinished = true
      client = new cybr.IpcClient()
      await client.connect(true)
    }

    // create a filename if the caller did not provide one
    if (!filename) filename = 'session'
    if (!path.isAbsolute(filename)) filename = path.join(process.cwd(), filename)
    if (!filename.toLowerCase().endsWith('.tracktionedit')) filename += '.tracktionedit'

    await client.send([
      cybr.global.activate(filename, true),
      sessionToTemplateFluidMessage(this),
      sessionToContentFluidMessage(this),
    ])

    if (closeWhenFinished) client.close()
  }

  /**
   * Save the session as a [Reaper](https://reaper.fm) `.RPP` file. If the
   * session contains any VST plugins, the `cybr` server must be running (and
   * it must be compiled with VST support).
   * @param filename can be absolute or relative to the working directory. The
   *    `.RPP` file extension will be added if it is not already present.
   * @param client an [[IpcClient]] will be created (and closed) automatically
   *    when not provided
   */
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
 * on the supplied session. It is used internally by
 * [[FluidSession.insertScore]].
 *
 * Note that the clips will not be ready for use: All events will be placed in
 * the clip.events member. `session.processEvents` moves the events to their
 * final homes.
 * @internal
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
    if (typeof config.trackKey !== 'string') {
      const msg = `Encountered a pattern (${scoreObject}), but could not find a track name`
      throw new Error(msg)
    }

    // Build technique and dynamic libraries from the track (and its ancestors)
    const trackAncestry = session.getOrCreateTrackAncestorsByName(config.trackKey)
    const track = trackAncestry[trackAncestry.length - 1]
    const [trackTLibrary, trackDLibrary] = trackAncestry.reduce<[tLibrary, dLibrary]>(([ prevTLibrary, prevDLibrary ], track) => {
      const tLibrary = track.scoreConfig.tLibrary
      const dLibrary = track.scoreConfig.dLibrary
      return [
        tLibrary ? Object.assign(prevTLibrary, tLibrary) : prevTLibrary,
        dLibrary ? Object.assign(prevDLibrary, dLibrary) : prevDLibrary
      ]
    }, [{}, {}])

    const tLibrary = {}
    const sessionTLibrary = session.scoreConfig.tLibrary || {}
    const configTLibrary = config.tLibrary || {}
    Object.assign(tLibrary, sessionTLibrary, trackTLibrary, configTLibrary)

    const dLibrary = {}
    const sessionDLibrary = session.scoreConfig.dLibrary || {}
    const configDLibrary = config.dLibrary || {}
    Object.assign(dLibrary, sessionDLibrary, trackDLibrary, configDLibrary)

    // Get the dynamic and rhythm strings
    const d = config.d || track.scoreConfig.d || session.scoreConfig.d // might be defined
    const r = config.r || track.scoreConfig.r || session.scoreConfig.r // must be defined
    if (r === undefined) {
      const msg = `Encountered a pattern ("${scoreObject}") on a track (${track?.name}), but could not find a .r rhythm`
      throw new Error(msg)
    }

    // create the clip
    let rhythmObject
    let resultClip
    try {
      rhythmObject = tab.parseRhythm(r)
      resultClip = tab.parseTab(rhythmObject, scoreObject, tLibrary);
    } catch (error) {
      console.error((chalk.reset`{bold.red SCORE ERROR} ${error.message}
{green track:}   "${track?.name}"
{green rhythm:}  "${r}"
{green pattern:} "${scoreObject}"
`))
      throw error
    }
    resultClip.startTime = config.startTime

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
