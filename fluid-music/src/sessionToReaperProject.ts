import { FluidPlugin } from './plugin'
import { FluidSession } from './FluidSession'
import { vst2ToReaperObject } from './vst2ToReaperObject'
import * as cybr from './cybr/index';
import { IpcClient } from './cybr/IpcClient'
import { ClipEventContext, MidiNoteEvent, AudioFileEvent } from './fluid-interfaces'

const rppp = require('rppp')

// Reaper appears to store gain as a simple numeric multiplier. I am choosing a
// max value of 12 db. Remember that this is equivalent to voltage gain, so we
// use 20 for the denominator in the equation below. This means that 6.02 db of
// gain is approximately equal to a gain factor of 2. Remember Power=Voltage^2
// which is how the 20 ends up in the db equation instead of 10.
const db2Gain = (db) => Math.pow(10, Math.min(db, 12) / 20)

/**
 * Create a `ReaperProject` from a `FluidSession`
 */
export async function sessionToReaperProject(session : FluidSession, client: IpcClient) {
  if (!session.bpm) throw new TypeError('tracksToReaperProject could not find a session.bpm')

  await client.send(cybr.global.activate('reaper-helper.tracktionedit', true))

  const reaperProject = new rppp.objects.ReaperProject();
  reaperProject.getOrCreateStructByToken('TEMPO').params = [session.bpm, 4, 4]

  // // example tracks object
  // const tracks = [
  //   { name: 'bass', clips: [ clip1, clip2... ] },
  //   { name: 'kick', clips: [ clip1, clip2... ] },
  // ];
  for (const track of session.tracks) {

    const newTrack = new rppp.objects.ReaperTrack();
    newTrack.getOrCreateStructByToken('NAME').params[0] = track.name;

    const volPan = newTrack.getOrCreateStructByToken('VOLPAN')
    volPan.params[0] = db2Gain(track.gain)
    volPan.params[1] = track.pan

    reaperProject.addTrack(newTrack);

    // handle receives (and sends, implicitly)
    track.receives.forEach(receive => {
      // get the absolute index of the sending track
      let found = false
      let index = 0
      session.forEachTrack((track, i) => {
        if (found) return
        if (track === receive.from) {
          index = i
          found = true;
        }
      })

      if (found) {
        newTrack.addReceive({
          sourceTrackNumber: index,
          gain: db2Gain(receive.gainDb),
        })
      } else {
        throw new Error(`sessionToReaperProject failed: ${track.name} contained broken receive: ${JSON.stringify(receive)}`)
      }
    })

    // handle Clips
    track.clips.forEach((clip, clipIndex) => {

      // Create one EventContext object for each clip.
      const context = {
        session,
        track,
        clip,
        clipIndex,
        data: {},
        d: {},
      };

      if (clip.midiEvents && clip.midiEvents.length) {
        newTrack.contents.push(midiEventsToReaperObject(clip.midiEvents, context));
      }

      if (clip.fileEvents && clip.fileEvents.length) {
        newTrack.contents = newTrack.contents.concat(fileEventsToReaperObject(clip.fileEvents, context));
      }
    }); // track.clips.forEach

    // Handle track specific automation.
    for (const [name, automation] of Object.entries(track.automation)) {
      let autoObject: any;
      let normalize  = (v) => v;

      if (name === 'gain' || name === 'gainDb') {
        autoObject = new rppp.objects.ReaperVolumeAutomation();
        normalize = db2Gain;
      } else if (name === 'pan') {
        autoObject = new rppp.objects.ReaperPanAutomation();
      } else if (name === 'width') {
        autoObject = new rppp.objects.ReaperWidthAutomation();
      }

      if (!autoObject) {
        throw new Error(`Unsupported reaper track automation lane: "${name}"`);
      }

      automation.points.sort((a, b) => a.startTime - b.startTime)
      for (const autoPoint of automation.points) {
        if (typeof autoPoint.value === 'number') {
          autoObject.addBezierPoint(
            autoPoint.startTime * 4 * 60 / session.bpm,
            normalize(autoPoint.value),
            autoPoint.curve
          );
        }
      }
      newTrack.add(autoObject);
    } // for [name, automation] of track.automation

    // Handle plugins/plugin automation
    const count : any = {};
    const nth = (plugin : FluidPlugin) => {
      const str = plugin.pluginName + '|' + plugin.pluginType;
      if (!count.hasOwnProperty(str)) count[str] = 0;
      return count[str]++;
    }

    if (track.plugins.length > 0) {
      const FXChain = new rppp.objects.ReaperFXChain();
      newTrack.add(FXChain);

      for (const plugin of track.plugins) {
        const vst2 = await vst2ToReaperObject(client, track.name, plugin, nth(plugin), session.bpm);
        FXChain.add(vst2);
      } // for (plugin of track.plugins)
    }
  }     // for (track of tracks)
  return reaperProject;
};

function midiEventsToReaperObject(midiEvents : MidiNoteEvent[] , context : ClipEventContext) {
  const bpm = context.session.bpm

  if (typeof context.clip.startTime !== 'number')
    throw new Error('Clip is missing startTime')
  if (typeof bpm !== 'number')
    throw new Error('midiEventsToReaperObject did not find a .bpm in the context')

  const midiItem = new rppp.objects.ReaperItem()
  const clipName  = `${context.track.name} ${context.clipIndex}`
  const startTime = context.clip.startTime
  const duration  = context.clip.duration

  midiItem.getOrCreateStructByToken('NAME').params[0] = clipName
  midiItem.getOrCreateStructByToken('POSITION').params[0] = startTime * 4 * 60 / bpm
  midiItem.getOrCreateStructByToken('LENGTH').params[0] = duration * 4 * 60 / bpm

  const midiArray : any[] = []
  for (const event of midiEvents) {
    const velocity = (typeof event.velocity === 'number')
      ? event.velocity
      : undefined
    midiArray.push({ n: event.note, s: event.startTime, l: event.duration, v: velocity });
  }

  const midiSource = new rppp.objects.ReaperSource()
  midiSource.makeMidiSource()
  midiSource.setMidiNotes(midiArray, duration)
  midiItem.add(midiSource)

  return midiItem;
};

function fileEventsToReaperObject(fileEvents : AudioFileEvent[], context : ClipEventContext) {
  if (typeof context.clip.startTime !== 'number')
    throw new Error('Clip is missing startTime')

  const bpm = context.session.bpm
  if (!bpm) throw new Error('fileEventToReaperObject could not find a session.bpm parameter')

  // exampleClipEvent = {
  //   type: 'file',
  //   path: 'media/kick.wav',
  //   startTime: 0.50,
  //   duration: 0.25,
  //   d: { v: 70, dbfs: -10 }, // If .v is present here...
  // };

  return fileEvents.map((event, eventIndex) => {
    if (typeof context.clip.startTime !== 'number')
      throw new Error('fileEventsToReaperObject found a clip with no .startTime')

    const startTime = context.clip.startTime + event.startTime

    if (typeof event.path !== 'string') {
      console.error(event);
      throw new Error('tracksToFluidMessage: A file event found in the note library does not have a .path string');
    };

    const audioItem = new rppp.objects.ReaperItem();
    const clipName = `s${context.clipIndex}.${eventIndex}`;
    audioItem.getOrCreateStructByToken('NAME').params[0] = clipName
    audioItem.getOrCreateStructByToken('POSITION').params[0] = startTime * 4 * 60 / bpm

    const audioSource = new rppp.objects.ReaperSource()
    audioSource.makeWaveSource()
    audioSource.getOrCreateStructByToken('FILE').params = [event.path]
    audioItem.add(audioSource)

    if (event.startInSourceSeconds)
      audioItem.getOrCreateStructByToken('SOFFS').params[0] = event.startInSourceSeconds

    if (event.oneShot && event.info && typeof event.info.duration === 'number')
      audioItem.getOrCreateStructByToken('LENGTH').params[0] = event.info.duration - (event.startInSourceSeconds || 0)
    else
      audioItem.getOrCreateStructByToken('LENGTH').params[0] = event.duration * 4 * 60 / bpm

    // apply fade in/out times (if specified)
    if (typeof event.fadeOutSeconds === 'number')
      audioItem.getOrCreateStructByToken('FADEOUT').params = [1, event.fadeOutSeconds, 0, 1, 0, 0]
    if (typeof event.fadeInSeconds === 'number')
      audioItem.getOrCreateStructByToken('FADEIN').params = [1, event.fadeInSeconds, 0, 1, 0, 0]

    // Remember, it is the the final .use call's job to set event.gainDb. The
    // AudioFile technique's .use method looks for a dynamic Object, and sets
    // the event.gainDb property.
    if (typeof event.gainDb === 'number')
      audioItem.getOrCreateStructByToken('VOLPAN').params = [1, 0, db2Gain(event.gainDb), -1]

    return audioItem;
  });
}
