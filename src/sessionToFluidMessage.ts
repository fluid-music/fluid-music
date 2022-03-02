import { basename } from 'path'
import { FluidPlugin, PluginType } from './FluidPlugin'
import { Tap } from './fluid-interfaces'
import { FluidTrack } from './FluidTrack'
import { FluidSession } from './FluidSession'
import { FluidAudioFile, resolveFades } from './FluidAudioFile'
import * as cybr from './cybr/index'

// This amplification conversion is hard-coded in Tracktion
const normalizeTracktionGain = (db) => {
  const normalized = Math.exp((db-6) * (1/20))
  return Math.max(Math.min(normalized, 1), 0)
}

const isSubmixTrack = (track : FluidTrack) => {
  return !!track.children.length
}
const createSelectMessage = (track : FluidTrack, parentName? : string) => {
  return isSubmixTrack(track)
    ? cybr.audiotrack.selectSubmixTrack(track.name, parentName)
    : cybr.audiotrack.select(track.name, parentName)
}

/**
 * Create a fluid message that constructs the template of the project without
 * any content. This includes Tracks (with pan and gain) plugins (with state)
 * but no clips or automation.
 * @param session
 */
export function sessionToTemplateFluidMessage(session : FluidSession) {
  const sessionMessages : any[] = [
    cybr.global.version('^0.3.0'),
    cybr.tempo.set(session.bpm),
  ]

  session.forEachTrack((track, i, ancestors) => {
    // Create a sub-message for each track
    const parentName = ancestors.length ? ancestors[ancestors.length - 1].name : undefined
    const trackMessages : any[] = [
      createSelectMessage(track, parentName),
      cybr.audiotrack.gain(track.gainDb), // normalization not needed with .gain
      cybr.audiotrack.pan(track.pan),
      cybr.audiotrack.width(track.width),
    ]
    sessionMessages.push(trackMessages)
  })

  session.forEachTrack((track, i, ancestors) => {
    const parentName = ancestors.length ? ancestors[ancestors.length - 1].name : undefined
    const trackMessages : any[] = [createSelectMessage(track, parentName)]
    sessionMessages.push(trackMessages)

    // Handle plugins. This deals with plugin state (not automation)
    const count : any = {}
    const nth = (plugin : FluidPlugin) => {
      const str = plugin.pluginName + '|' + plugin.pluginType
      if (!count.hasOwnProperty(str)) count[str] = 0
      return count[str]++
    }
    const allPluginMessages : any[] = []
    trackMessages.push(allPluginMessages)

    for (const plugin of track.plugins) {
      const pluginMessages : any[] = []
      allPluginMessages.push(pluginMessages)

      const cybrType = plugin.pluginType === PluginType.unknown ? null : plugin.pluginType
      pluginMessages.push(cybr.plugin.select(plugin.pluginName, cybrType, nth(plugin)))

      if (plugin.vst2?.presetBase64) {
        pluginMessages.push(cybr.plugin.loadVst2Preset(plugin.vst2.presetBase64))
      }

      // set parameters
      for (const [paramKey, explicitValue] of Object.entries(plugin.parameters)) {
        const paramName = plugin.getParameterName(paramKey)
        if (typeof explicitValue === 'number') {
          const normalizedValue = plugin.getNormalizedValue(paramKey, explicitValue)
          if (typeof normalizedValue === 'number') {
            pluginMessages.push(cybr.plugin.setParamNormalized(paramName, normalizedValue))
          } else {
            pluginMessages.push(cybr.plugin.setParamExplicit(paramName, explicitValue))
          }
        } else {
          console.warn(`found non-number parameter value in ${plugin.pluginName} - ${paramKey}: ${explicitValue}`)
        }
      }

      // check for side chain routing
      if (plugin.sidechainReceive) {
        pluginMessages.push(cybr.plugin.setSidechainInput(plugin.sidechainReceive.from.name))
        if (plugin.sidechainReceive.gainDb !== 0) {
          console.warn(`${plugin.pluginName} on ${track.name} track has non-zero sidechain gain, but this type of gain is not supported by tracktion`)
        }
        if (plugin.sidechainReceive.tap !== Tap.postFader) {
          console.warn(`${plugin.pluginName} on ${track.name} track has non post-fader Tap, but tracktion only supports post-fader sidechain input`)
        }
      }
    }
  })

  // Now that the tracks have been created, iterate over them again, adding
  // sends and receives as needed
  session.forEachTrack(track => {
    if (!track.receives.length) return

    const sendReceiveMessage = [] as any[]
    sessionMessages.push(sendReceiveMessage)

    // cybr identifies return tracks by name. at the time of writing, there is
    // no proper way to use two tracks that have the same name, while using one
    // of those tracks as a return.
    sendReceiveMessage.push(cybr.audiotrack.selectReturnTrack(track.name))
    for (const receive of track.receives) {
      const selectSendingTrack = receive.from.children.length
        ? cybr.audiotrack.selectSubmixTrack(receive.from.name)
        : cybr.audiotrack.select(receive.from.name);
      const sendToReceivingTrack = cybr.audiotrack.send(track.name, receive.gainDb)

      sendReceiveMessage.push(selectSendingTrack, sendToReceivingTrack)
    }
  })

  return sessionMessages
}

/**
 * Create a `FluidMessage` from a `FluidSession`
 *
 * @param session object generated by score.parse
 */
export function sessionToContentFluidMessage(session : FluidSession) {
  const sessionMessages : any[] = []

  // Configure loop region
  if (session.loopEnabled) {
    sessionMessages.push(cybr.transport.loop(
      session.timeWholeNotesToSeconds(session.loopRegion.startTime),
      session.timeWholeNotesToSeconds(session.loopRegion.duration)
    ))
  } else {
    sessionMessages.push(cybr.transport.loop(false))
  }

  let summativeIndex = 0
  session.forEachTrack((track, i, ancestors) => {
    const parentName = ancestors.length ? ancestors[ancestors.length - 1].name : undefined
    const isSubmix = isSubmixTrack(track)

    // Create a sub-message for each track
    let trackMessages : any[] = []
    sessionMessages.push(trackMessages)
    trackMessages.push(createSelectMessage(track, parentName))
    for (const audioFile of track.audioFiles) {
      trackMessages.push(fileEventToFluidMessage(audioFile, session, summativeIndex++))
    }

    if (isSubmix && track.audioFiles.length) {
      throw new Error(`sessionToTemplateFluidMessage: ${track.name} track has file events and child tracks, but tracktion does not allow events directly on submix tracks`)
    }

    track.midiClips.forEach((midiClip, clipIndex) => {
      if (isSubmix && midiClip.events.length) {
        // Charles: The best thing to do is probably to have some system that
        // creates an additional track, and puts the clips on it. However, I'm
        // not going to add that until it is clearly needed.
        throw new Error(`sessionToTemplateFluidMessage: ${track.name} track has both MIDI clips and child tracks, but tracktion does not allow clips directly on submix tracks`)
      }

      if (midiClip.events && midiClip.events.length) {
        // Create a sub-message for each clip.
        const clipMessages : any[] = []
        trackMessages.push(clipMessages)
        const clipName  = `${track.name} ${clipIndex}`
        clipMessages.push(cybr.midiclip.select(clipName, midiClip.startTimeSeconds, midiClip.durationSeconds))
        clipMessages.push(midiClip.events.map(event => {
          // Velocity in the event takes priority over velocity in the .d object
          const velocity = (typeof event.velocity === 'number')
            ? event.velocity
            : undefined

          // When we add support for variable tempo, the start time and duration
          // calculations will have to be updated. As of February 2021, the bpm
          // is constant throughout the FluidSession, so it is okay to use a
          // simple version of timeWholeNotesToSeconds.
          const startTimeSeconds = session.timeWholeNotesToSeconds(event.startTime)
          const durationSeconds = session.timeWholeNotesToSeconds(event.duration)

          return cybr.midiclip.note(event.note, startTimeSeconds, durationSeconds, velocity)
        }))
      }
    }) // track.clips.forEach

    // Handle track specific automation.
    for (const [name, automation] of Object.entries(track.automation)) {
      let trackAutoMsg : any[] = []
      trackMessages.push(trackAutoMsg)

      for (const autoPoint of automation.points) {
        if (typeof autoPoint.value === 'number') {
          let msg : any = null
          const startTimeSeconds = autoPoint.startTimeSeconds
          if (name === 'gain' || name === 'gainDb')  msg = cybr.audiotrack.gain(autoPoint.value, startTimeSeconds, autoPoint.curve)
          else if (name === 'pan')   msg = cybr.audiotrack.pan(autoPoint.value, startTimeSeconds, autoPoint.curve)
          else if (name === 'width') msg = cybr.audiotrack.width(autoPoint.value, startTimeSeconds, autoPoint.curve)
          else throw new Error(`Fluid Track Automation found unsupported parameter: "${name}"`)
          trackAutoMsg.push(msg)
        }
      }
    } // for [name, automation] of track.automation

    // handle send automation
    for (const receive of track.receives) {
      if (receive.automation?.gainDb?.points?.length) {
        let sendAutoMsg : any[] = []
        trackMessages.push(sendAutoMsg)
        sendAutoMsg.push(createSelectMessage(receive.from), cybr.audiotrack.send(track.name))
        for (const point of receive.automation.gainDb.points) {
          if (typeof point.value === 'number') {
            sendAutoMsg.push(cybr.plugin.setParamNormalizedAt('Send level', normalizeTracktionGain(point.value), point.startTimeSeconds, point.curve || 0))
          }
        }
      }
    } // for receive of track.receives

    // Handle plugins/plugin automation
    const count : any = {}
    const nth = (plugin : FluidPlugin) => {
      const str = plugin.pluginName + '|' + plugin.pluginType
      if (!count.hasOwnProperty(str)) count[str] = 0
      return count[str]++
    }
    for (const plugin of track.plugins) {
      const cybrType = (plugin.pluginType === PluginType.unknown) ? undefined : plugin.pluginType
      const pluginName = plugin.pluginName
      trackMessages.push(cybr.plugin.select(pluginName, cybrType, nth(plugin)))

      // Plugin Parameter Automation
      for (const [paramKey, automation] of Object.entries(plugin.automation)) {
        const paramName = plugin.getParameterName(paramKey) // JUCE style name
        // iterate over points. Ex { startTime: 0, value: 0.5, curve: 0 }
        for (const autoPoint of automation.points) {
          if (typeof autoPoint.value === 'number') {
            // - paramName is the JUCE style parameter name we need
            // - value is an explicit value. look for a normalizer
            // Notice how paramKey and paramName are used in the code below, and
            // be careful not to mix them up. They may (or may not) be identical
            // so mixing them up could lead to hard-to-find bugs.
            const explicitValue   = autoPoint.value
            const normalizedValue = plugin.getNormalizedValue(paramKey, explicitValue)

            if (typeof normalizedValue === 'number') {
              trackMessages.push(cybr.plugin.setParamNormalizedAt(
                paramName,
                Math.max(Math.min(normalizedValue, 1), 0),
                autoPoint.startTimeSeconds,
                autoPoint.curve))
            } else {
              trackMessages.push(cybr.plugin.setParamExplicitAt(
                paramName,
                explicitValue,
                autoPoint.startTimeSeconds,
                autoPoint.curve))
            }
          }
        } // for (autoPoint of automation.points)
      }   // for (paramName, automation of plugin.automation)
    }     // for (plugin of track.plugins)
  })      // for (track of tracks)

  return sessionMessages
}

function fileEventToFluidMessage(audioFile : FluidAudioFile, session : FluidSession, summativeIndex : number) {
  if (typeof audioFile.path !== 'string') {
    console.error(audioFile)
    throw new Error(`fileEventsToFluidMessage: A file event is missing a .path string ${JSON.stringify(audioFile)}`)
  }

  // tracktion does not deal well with AudioClip objects that extend beyond
  // the boundaries of the source material. It handles the case where a clip
  // is longer than than the audio file, but it cannot handle the case where a
  // negative startInSourceSeconds offsets the onset of the source material.
  // It is similarly obstinate with reversed audio clips. For these reasons,
  // let's identify the "true" start time, meaning the start/end time of the
  // actual content.
  const isReversed = audioFile.isReversed()
  let durationSeconds = audioFile.durationSeconds
  let startTimeSeconds = audioFile.startTimeSeconds
  let sOff = isReversed ? audioFile.getEndInSourceSeconds() : audioFile.startInSourceSeconds
  // Amount to from from the end of the ITEM
  const trimFromEnd = Math.min(0, audioFile.getTailRightSeconds()) * -1
  const trimFromStart = Math.min(0, audioFile.getTailLeftSeconds()) * -1

  if (trimFromEnd) {
    durationSeconds -= trimFromEnd
  }
  if (trimFromStart) {
    startTimeSeconds += trimFromStart
    durationSeconds -= trimFromStart
    if (isReversed) sOff = audioFile.getSourceDurationSeconds()
    else sOff = 0
  }

  const clipName = audioFile.name.length ? audioFile.name : `${basename(audioFile.path)}.${summativeIndex}`
  const msg = [cybr.audiotrack.insertWav(clipName, startTimeSeconds, audioFile.path)] as any[]

  // Unlike Reaper (and fluid-music) tracktion measures start offset *after*
  // applying the playback rate
  msg.push(cybr.clip.setSourceOffsetSeconds(sOff / audioFile.playbackRate))
  // tracktion engine tries to help us by adjusting the length when we adjust
  // the speed ratio. For that reason, we must first set the speed ratio, and
  // then set the length.
  msg.push(cybr.audioclip.speedRatio(Math.abs(audioFile.playbackRate)))
  msg.push(cybr.clip.lengthSeconds(durationSeconds))
  
  const { fadeInSeconds, fadeOutSeconds, gainDb } = resolveFades(audioFile)

  // apply fade in/out times (if specified)
  if (fadeOutSeconds || fadeInSeconds) {
    // the cybr `/audioclip/reverse` method also swaps the fade in/out times
    const fIn = isReversed ? fadeOutSeconds : fadeInSeconds
    const fOut = isReversed ? fadeInSeconds : fadeOutSeconds
    msg.push(cybr.audioclip.fadeInOutSeconds(fIn, fOut))
  }

  if (gainDb) {
    msg.push(cybr.audioclip.gain(gainDb))
  }
  if (audioFile.pan) {
    msg.push(cybr.audioclip.pan(audioFile.pan))
  }
  if (audioFile.isReversed()) {
    msg.push(cybr.audioclip.reverse(true))
  }

  if (audioFile.pitchSemitones) {
    msg.push(cybr.audioclip.pitchSemitones(audioFile.pitchSemitones))
  }

  return msg
}
