## Modules

<dl>
<dt><a href="#module_fluid">fluid</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#audioclip">audioclip</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#audiotrack">audiotrack</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#clip">clip</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#global">global</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#midiclip">midiclip</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#plugin">plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#sampler">sampler</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#transport">transport</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#noteObject">noteObject</a> : <code>Object</code></dt>
<dd><p>Represents a MIDI note within midi clip</p>
</dd>
</dl>

<a name="module_fluid"></a>

## fluid
<a name="audioclip"></a>

## audioclip : <code>object</code>
**Kind**: global namespace  

* [audioclip](#audioclip) : <code>object</code>
    * [.reverse(reverse)](#audioclip.reverse)
    * [.fadeInOutSeconds(fadeInSeconds, fadeOutSeconds)](#audioclip.fadeInOutSeconds)
    * [.fadeIn(seconds)](#audioclip.fadeIn)
    * [.fadeOut(seconds)](#audioclip.fadeOut)
    * [.gain(dBFS)](#audioclip.gain)

<a name="audioclip.reverse"></a>

### audioclip.reverse(reverse)
Set the reversed state of the selected audio clip

**Kind**: static method of [<code>audioclip</code>](#audioclip)  

| Param | Type | Description |
| --- | --- | --- |
| reverse | <code>boolean</code> | true=reverse false=forward |

<a name="audioclip.fadeInOutSeconds"></a>

### audioclip.fadeInOutSeconds(fadeInSeconds, fadeOutSeconds)
Set a fade in and fade out. No effect if there is no selected clip, or the
selected clip is a midi clip.

**Kind**: static method of [<code>audioclip</code>](#audioclip)  

| Param | Type | Description |
| --- | --- | --- |
| fadeInSeconds | <code>number</code> | fade in time in seconds |
| fadeOutSeconds | <code>number</code> | fade out time in seconds |

<a name="audioclip.fadeIn"></a>

### audioclip.fadeIn(seconds)
Set the fade in time in seconds. No effect if there is no selected clip, or
the selected clip is a midi clip.

**Kind**: static method of [<code>audioclip</code>](#audioclip)  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | fade in time in seconds |

<a name="audioclip.fadeOut"></a>

### audioclip.fadeOut(seconds)
Set the fade out time in seconds. No effect if there is no selected clip,
or the selected clip is a midi clip.

**Kind**: static method of [<code>audioclip</code>](#audioclip)  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | fade in time in seconds |

<a name="audioclip.gain"></a>

### audioclip.gain(dBFS)
Adjust the gain of the selected audio clip.

**Kind**: static method of [<code>audioclip</code>](#audioclip)  

| Param | Type | Description |
| --- | --- | --- |
| dBFS | <code>number</code> | full scale decibel to set |

<a name="audiotrack"></a>

## audiotrack : <code>object</code>
**Kind**: global namespace  

* [audiotrack](#audiotrack) : <code>object</code>
    * [.select(trackName)](#audiotrack.select)
    * [.insertWav(clipName, startBeats, fileName)](#audiotrack.insertWav)
    * [.selectReturnTrack(busName)](#audiotrack.selectReturnTrack)
    * [.send(busName, [levelDb])](#audiotrack.send)
    * [.mute([mute])](#audiotrack.mute)
    * [.unmute()](#audiotrack.unmute)
    * [.renderRegion(outFilename, [startQuarterNotes], [durationQuarterNotes])](#audiotrack.renderRegion)
    * [.removeClips()](#audiotrack.removeClips)

<a name="audiotrack.select"></a>

### audiotrack.select(trackName)
Select an audio track by name

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type |
| --- | --- |
| trackName | <code>string</code> | 

<a name="audiotrack.insertWav"></a>

### audiotrack.insertWav(clipName, startBeats, fileName)
Insert a audio file clip into the selected audio track. No effect if there
is no selected track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Description |
| --- | --- | --- |
| clipName | <code>string</code> | name the new clip |
| startBeats | <code>number</code> | clip start time in quarter notes |
| fileName | <code>string</code> |  |

<a name="audiotrack.selectReturnTrack"></a>

### audiotrack.selectReturnTrack(busName)
Selects a track, ensuring that it has a bus return. Afterwords, other
tracks can add sends that target the track selected with this method.

Use the audiotrack.send method to send from other tracks to a return.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Description |
| --- | --- | --- |
| busName | <code>string</code> | name of audiotrack (the return will be named                           after the audio track). |

<a name="audiotrack.send"></a>

### audiotrack.send(busName, [levelDb])
Adjust the send level to the specified bus, adding the send (post-gain) if
it does not yet exist. Use with audiotrack.selectReturnTrack(busName).

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| busName | <code>string</code> |  | The name of the return bus to send to |
| [levelDb] | <code>number</code> | <code>0</code> | default on the server is 0 |

<a name="audiotrack.mute"></a>

### audiotrack.mute([mute])
Mute or unmute the selected audio track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mute] | <code>boolean</code> | <code>true</code> | true if track should be muted. false = unmute. |

<a name="audiotrack.unmute"></a>

### audiotrack.unmute()
Unmute the selected audio track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  
<a name="audiotrack.renderRegion"></a>

### audiotrack.renderRegion(outFilename, [startQuarterNotes], [durationQuarterNotes])
Render a region of the track to an audio file. If no time range is
supplied, the engine should use the loop time range.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Description |
| --- | --- | --- |
| outFilename | <code>string</code> | output filename |
| [startQuarterNotes] | <code>number</code> | start time in quarter notes |
| [durationQuarterNotes] | <code>number</code> | duration in quarter notes |

<a name="audiotrack.removeClips"></a>

### audiotrack.removeClips()
Remove all clips (ex. audio, midi clips) from the selected audio track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  
<a name="clip"></a>

## clip : <code>object</code>
**Kind**: global namespace  

* [clip](#clip) : <code>object</code>
    * [.render(filename, [tailInSeconds])](#clip.render)
    * [.select(clipName)](#clip.select)
    * [.length(quarterNotes, [trimStart])](#clip.length)
    * [.trimSeconds([secondsToStart], [secondsFromEnd])](#clip.trimSeconds)
    * [.setSourceOffsetSeconds(startAtSeconds)](#clip.setSourceOffsetSeconds)

<a name="clip.render"></a>

### clip.render(filename, [tailInSeconds])
Render the selected clip (audio or midi) to an audio file.

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | output file name |
| [tailInSeconds] | <code>number</code> | optionally render addition reverb tail |

<a name="clip.select"></a>

### clip.select(clipName)
Select a clip on the currently selected track.

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type |
| --- | --- |
| clipName | <code>string</code> | 

<a name="clip.length"></a>

### clip.length(quarterNotes, [trimStart])
Change the length of the clip.

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| quarterNotes | <code>number</code> |  | new length of the clip |
| [trimStart] | <code>boolean</code> | <code>false</code> | if true, trim the beginning of the clip,    effectively changing the start time. |

<a name="clip.trimSeconds"></a>

### clip.trimSeconds([secondsToStart], [secondsFromEnd])
Trim the clip. positive number will make the clip shorter from both the
beginning and the end. Unlike many methods, this operates with seconds
as the time unit instead of whole notes (or quarter notes).

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type | Default |
| --- | --- | --- |
| [secondsToStart] | <code>number</code> | <code>0</code> | 
| [secondsFromEnd] | <code>number</code> | <code>0</code> | 

<a name="clip.setSourceOffsetSeconds"></a>

### clip.setSourceOffsetSeconds(startAtSeconds)
Update the source start time. This does not affect time that the clip is
positioned within the session.

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type | Description |
| --- | --- | --- |
| startAtSeconds | <code>number</code> | Time in the source to start the clip |

<a name="global"></a>

## global : <code>object</code>
**Kind**: global namespace  
<a name="midiclip"></a>

## midiclip : <code>object</code>
**Kind**: global namespace  

* [midiclip](#midiclip) : <code>object</code>
    * [.clear()](#midiclip.clear)
    * [.select(name, startTimeInQuarterNotes, lengthInQuarterNotes)](#midiclip.select)
    * [.note(noteNum, startTimeInWholeNotes, durationInWholeNotes, [velocity])](#midiclip.note)
    * [.create(clipName, startBeats, lengthBeats, notes)](#midiclip.create)

<a name="midiclip.clear"></a>

### midiclip.clear()
Clear all MIDI notes in the currently selected clip.

**Kind**: static method of [<code>midiclip</code>](#midiclip)  
<a name="midiclip.select"></a>

### midiclip.select(name, startTimeInQuarterNotes, lengthInQuarterNotes)
Select a MIDI clip by name on the currently selected track. Create the clip
if it does not exist. Set the clip's start time and length in quarter notes.

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the MIDI clip to select. |
| startTimeInQuarterNotes | <code>number</code> |  |
| lengthInQuarterNotes | <code>number</code> |  |

<a name="midiclip.note"></a>

### midiclip.note(noteNum, startTimeInWholeNotes, durationInWholeNotes, [velocity])
Create an /midiclip/n message

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Description |
| --- | --- | --- |
| noteNum | <code>Integer</code> | MIDI Note Number |
| startTimeInWholeNotes | <code>Number</code> | Note start time in Whole notes |
| durationInWholeNotes | <code>Number</code> | Note length in Whole notes |
| [velocity] | <code>Integer</code> | Optional MIDI note velocity. |

<a name="midiclip.create"></a>

### midiclip.create(clipName, startBeats, lengthBeats, notes)
Build an OSC message that creates a clip with a bunch of midi notes

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Description |
| --- | --- | --- |
| clipName | <code>string</code> | name of the clip. |
| startBeats | <code>number</code> | Clip start time in quarter notes |
| lengthBeats | <code>number</code> | Clip length in quarter notes |
| notes | [<code>Array.&lt;noteObject&gt;</code>](#noteObject) | array of objects, which look like:    { l: length, n: note, s: start } |

<a name="plugin"></a>

## plugin : <code>object</code>
**Kind**: global namespace  

* [plugin](#plugin) : <code>object</code>
    * [.select(pluginName, [pluginType], [pluginId])](#plugin.select)
    * [.setParamNormalized(paramName, normalizedValue)](#plugin.setParamNormalized)
    * [.setParamExplicit(paramName, paramValue)](#plugin.setParamExplicit)
    * [.setParamNormalizedAt(paramName, normalizedValue, timeInQuarterNotes, curve)](#plugin.setParamNormalizedAt)
    * [.setParamExplicitAt(paramName, paramValue, timeInQuarterNotes, curve)](#plugin.setParamExplicitAt)
    * [.setSideChainInput(inputTrackName)](#plugin.setSideChainInput)
    * [.loadTrkpreset(file)](#plugin.loadTrkpreset)

<a name="plugin.select"></a>

### plugin.select(pluginName, [pluginType], [pluginId])
Creates an object that looks like this:
```
 {
   address: '/plugin/select',
   args: [
     { type: 'string', value: 'zebra2' },
     { type: 'integer', value: 0 },
     { type: 'string', value: 'vst' },
   ],
 }
```

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pluginName | <code>string</code> |  | the name of the vst plugin |
| [pluginType] | <code>string</code> |  | optional type, for example 'VST', 'VST3',        'AudioUnit'. If omitted, search all types. |
| [pluginId] | <code>number</code> | <code>0</code> | the id of the plugin |

<a name="plugin.setParamNormalized"></a>

### plugin.setParamNormalized(paramName, normalizedValue)
Changes the specified parameter to the normalized value provided.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | the name of the parameter |
| normalizedValue | <code>number</code> | the normalized value of the parameter set |

<a name="plugin.setParamExplicit"></a>

### plugin.setParamExplicit(paramName, paramValue)
Changes the specified parameter to the explicit value provided.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | the name of the parameter |
| paramValue | <code>number</code> | the explicit value of the parameter set |

<a name="plugin.setParamNormalizedAt"></a>

### plugin.setParamNormalizedAt(paramName, normalizedValue, timeInQuarterNotes, curve)
Changes the automation curve of the parameter value,
adds a point to the curve at the specified normalized value and time.
The server automatically adds a point at the default value of the parameter at time 0.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | the name of the parameter |
| normalizedValue | <code>number</code> | a normalized parameter value from 0 to 1 |
| timeInQuarterNotes | <code>number</code> | time of parameter change in quarter notes |
| curve | <code>number</code> | the curvature of the line formed by this point and the next point |

<a name="plugin.setParamExplicitAt"></a>

### plugin.setParamExplicitAt(paramName, paramValue, timeInQuarterNotes, curve)
Changes the automation curve of the parameter value,
adds a point to the curve at the specified value and time.
The server automatically adds a point at the default value of the parameter at time 0.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | the name of the parameter |
| paramValue | <code>number</code> | the explicit value of the parameter set |
| timeInQuarterNotes | <code>number</code> | time of parameter change in quarter notes |
| curve | <code>number</code> | the curvature of the line formed by this point and the next point |

<a name="plugin.setSideChainInput"></a>

### plugin.setSideChainInput(inputTrackName)
Route the named track to the side chain input for the selected plugin. Note
that this might not actually enable the side chain in the plugin
configuration. For VSTs, enabling the side chain input may not be
accessible from the fluid API, in which case it must be accomplished with a
plugin preset.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| inputTrackName | <code>string</code> | a track with this name will feed the    selected plugin's side chain input. The track will be created if it does    not exist. |

<a name="plugin.loadTrkpreset"></a>

### plugin.loadTrkpreset(file)
Load a .trkpreset file on the client side, and send it to

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>Buffer</code> \| <code>String</code> | A |

<a name="sampler"></a>

## sampler : <code>object</code>
**Kind**: global namespace  
<a name="sampler.add"></a>

### sampler.add(name, filename, noteNum, [gain], [pan], [oneShot])
Add a sample to the currently selected sampler.

**Kind**: static method of [<code>sampler</code>](#sampler)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | the name of the sample to add |
| filename | <code>string</code> |  | the filename (relative to server WD, or absolute) |
| noteNum | <code>Number</code> |  | the Midi note number to add the sample to |
| [gain] | <code>number</code> | <code>0</code> | Gain in DBFS (0 is unity) |
| [pan] | <code>number</code> | <code>0</code> | pan (-1 = hard left, 1 = hard right) |
| [oneShot] | <code>boolean</code> | <code>false</code> |  |

<a name="transport"></a>

## transport : <code>object</code>
**Kind**: global namespace  
<a name="transport.loop"></a>

### transport.loop(startQuarterNotes, lengthQuarterNotes)
Set loop points, and enable looping.

**Kind**: static method of [<code>transport</code>](#transport)  

| Param | Type | Description |
| --- | --- | --- |
| startQuarterNotes | <code>Number</code> \| <code>false</code> | The number of quarter notes at        which the loop should begin. Or `false`, which disables looping. |
| lengthQuarterNotes | <code>Number</code> | The length of the loop, measured in        quarter notes. |

<a name="noteObject"></a>

## noteObject : <code>Object</code>
Represents a MIDI note within midi clip

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| n | <code>number</code> |  | note (probably a MIDI note number) |
| l | <code>number</code> |  | length in whole notes |
| s | <code>number</code> |  | start time in whole notes |
| [v] | <code>number</code> | <code>64</code> | optional midi velocity |

