## Modules

<dl>
<dt><a href="#module_fluid">fluid</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#audioclip">audioclip</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#clip">clip</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#plugin">plugin</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#global">global</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#audiotrack">audiotrack</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#transport">transport</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#sampler">sampler</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#midiclip">midiclip</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#reservedKeys">reservedKeys</a></dt>
<dd><p>These keys cannot be used for patterns in tabs and scores.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#choice">choice(input)</a></dt>
<dd><p>Randomly get an element from an object or array.</p>
</dd>
<dt><a href="#parseRhythm">parseRhythm(rhythm)</a> ⇒ <code>object</code></dt>
<dd><p>Convert rhythm string to a cumulative array of durations.</p>
</dd>
<dt><a href="#parseVelocity">parseVelocity(vPattern, symbolsAndCounts, vLibrary)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Helper method to convert velocity string to an array corresponding to
velocties of each symbol in symbolsAndCounts.</p>
</dd>
<dt><a href="#parseTab">parseTab(rhythm, pattern, noteLibrary)</a></dt>
<dd><p>Convert a rhythm, pattern, and note library to a collection of note objects.</p>
</dd>
<dt><a href="#division">division(char)</a></dt>
<dd><p>Helper method gets the implied division of a rhythm char.</p>
</dd>
<dt><a href="#rhythmToAdvanceArray">rhythmToAdvanceArray(rhythm)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Convert each character in an string to an duration.
In the following examples, q=1/4 and e=1/8 and h=1/2
Quarter notes:
  rhythm - &#39;1+2+&#39;
  result - [e,e,e,e]
Spaces leave a 0 in the array.
  rhythm - &#39;1 + &#39;
  result - [e,0,e,0]
Eighth and quarter notes:
  rhythm - &#39;1234+&#39;
  result - [q,q,q,e,e]
Whole notes always 1. Half notes always get 0.5
  rhythm - &#39;h34&#39;
  result - [h,q,q]
See tests for more examples.</p>
</dd>
<dt><a href="#advanceArrayToSegments">advanceArrayToSegments(advances)</a></dt>
<dd><p>Create sub groups for advances.</p>
<p>This helper class is only exported for testing purposes.
  in  - [1,0,0,0,2,0]
  out - [[1,0,0,0], [2,0]]</p>
</dd>
<dt><a href="#getSegmentStartTotals">getSegmentStartTotals(advances)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>getSegmentStartTotals is a helper method used by parseRhythm. It calculates
the start time for each &quot;segment.&quot; As an example:
&quot;advances&quot; are returned by rhythmToAdvanceArray: [.4,0,0,0,  .5,0,  .5,0]
&quot;segments&quot; are returned by getSegments:         [[.4,0,0,0],[.5,0],[.5,0]]</p>
<p>Given the advances here, this should return the total amount of time elapsed
at the beginning of each segment:                [0,         .4,    .9]</p>
<p>Calculating start times before distributing the advances across any zeros in
segments allows us to accumulate less floating point error. I do not think
there is a reason to export getSegmentStartTotals for public use.</p>
</dd>
<dt><a href="#patternToSymbolsAndCounts">patternToSymbolsAndCounts(pattern)</a></dt>
<dd><p>This helper method converts a pattern into an intermediary format that is
helpful for parsing a tab. Its easiest to understand with an example:</p>
<p>const input = &#39;a-1-bb...&#39;;
const output = [[&#39;a&#39;,2], [&#39;1&#39;,2], [&#39;b&#39;,1], [&#39;b&#39;, 1], [&#39;.&#39;, 3]];</p>
<p>For every new symbol, the out output lists that symbol, and the number of
positions that that symbols is active for.</p>
</dd>
<dt><a href="#parse">parse(object, [rhythm], [noteLibrary], [startTime])</a> ⇒ <code><a href="#Clip">Clip</a></code></dt>
<dd><p>Creates noteObject arrays from deeply nested objects. Takes a deeply nested
Object or Array, and converts it to an array of notes. The following example
will generate four eighth notes separated by eighth note rests.</p>
<pre><code class="language-json"> {
   &quot;noteLibrary&quot;: [1, 2, 3, 4],
   &quot;r&quot;: &quot;1+2+&quot;,
   &quot;p&quot;: [
     &quot;1.3.&quot;,
     &quot;3.4.&quot;
   ]
 }</code></pre>
<p>The <code>.p</code> field in the object above is a pattern. Each character in the string
indexes the note library (for details, see the parseTab documentation).</p>
<p>Several important things to understand:</p>
<ul>
<li>The example above contains a sub pattern specified in the <code>.p&#39; field. The
key (</code>.p<code>) is arbitrary. It could also</code>.b<code>,</code>.c<code>, or</code>.pattern<code>. However,
it must not be one of the reserved keys such as</code>.nLibrary<code>or</code>.r`.</li>
<li>Pattern arrays imply a sequence of events</li>
<li>Pattern objects imply layering of events</li>
<li>Sub-patterns inherit their parent&#39;s <code>.r</code>hythm and <code>.nLibrary</code> unless it
is an object sub-pattern, in which case it may optionally specify its own.</li>
</ul>
<p>The following example contains has an pattern object, with two layers. One
for hi-hat, and one for kick and snare. Note that unlike the pattern array
example above, the two layers in the pattern object occur simultaneously.</p>
<pre><code class="language-json">{
 &quot;noteLibrary&quot;: { &quot;k&quot;: 36, &quot;h&quot;: 42, &quot;s&quot;: 38 },
 &quot;r&quot;:  &quot;1 + 2 + 3 + 4 + &quot;,
 &quot;ks&quot;: &quot;k . s . . . s k &quot;,
 &quot;hh&quot;: &quot;h h h h h h h h &quot;
}</code></pre>
<p>For more diverse examples (and more deeply nested objects), see the tests.</p>
</dd>
<dt><a href="#applyGroove">applyGroove(notes, grooveItem, multipliers, randomness)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Applies a specified groove onto an array of note objects</p>
</dd>
<dt><a href="#valueToWholeNotes">valueToWholeNotes(value)</a> ⇒ <code>Number</code></dt>
<dd><p>Convert a string or number to a number of whole notes.</p>
</dd>
<dt><a href="#parse">parse(scoreObject, [config], [session])</a> ⇒ <code><a href="#Session">Session</a></code></dt>
<dd><p>score.parse is somewhat similar to tab.parse, except that it expects a
different input format, and outputs a <code>Session</code> instead of an array of notes.</p>
<p>Typically called with two arguments (other args are for internal use only)</p>
<ul>
<li>A ScoreObject array</li>
<li>A config object with (at minimum) a <code>.nLibrary</code> and <code>.r</code>hythm</li>
</ul>
</dd>
<dt><a href="#tracksToFluidMessage">tracksToFluidMessage(tracksObject)</a> ⇒ <code><a href="#FluidMessage">FluidMessage</a></code></dt>
<dd><p>Create a <code>FluidMessage</code> from a TracksObject</p>
<pre><code class="language-javascript">const session = fluid.score.parse(myScore, myConfig);
const message = fluid.score.tracksToFluidMessage(session.tracks);
const client = new fluid.Client();
client.send(message);</code></pre>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ScoreObject">ScoreObject</a> : <code>Object.&lt;string, ScoreObject&gt;</code> | <code><a href="#ScoreObject">Array.&lt;ScoreObject&gt;</a></code></dt>
<dd><p>A structured musical score encoded with <code>fluid.tab</code> notation</p>
</dd>
<dt><a href="#Session">Session</a> : <code>Object.&lt;string, Session&gt;</code></dt>
<dd><p>Session encapsulates the structure of a DAW Session.</p>
<pre><code>const exampleSession = {
  startTime: 0,
  duration: 4,
  tracks: {
    drums: {
      clips: [
        {
          notes: [ { s: 0, l: 0.25, n: 0 } ],
          duration: 1,
          startTime: 0
        },
        {
          notes: [ { s: 0, l: 0.25, n: 1 } ],
          duration: 1,
          startTime: 1
        },
        {
          notes: [ { s: 0, l: 0.25, n: 2 } ],
          duration: 1,
          startTime: 2
        },
        {
          notes: [ { s: 0, l: 0.25, n: 3 } ],
          duration: 1,
          startTime: 3
        }
      ]
    }
  },
  regions: [
    {
      startTime: 0,
      duration: 2,
      regions: [
        {
          notes: [ { s: 0, l: 0.25, n: 0 } ],
          duration: 1,
          startTime: 0
        },
        {
          notes: [ { s: 0, l: 0.25, n: 1 } ],
          duration: 1,
          startTime: 1
        }
      ]
    },
    { notes: [ { s: 0, l: 0.25, n: 2 } ], duration: 1, startTime: 2 },
    { notes: [ { s: 0, l: 0.25, n: 3 } ], duration: 1, startTime: 3 }
  ]
}</code></pre></dd>
<dt><a href="#Clip">Clip</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TracksObject">TracksObject</a> : <code>Object</code></dt>
<dd><p>Represents a collection of audio tracks, and clips on those tracks.</p>
<p>Example of a <code>TracksObject</code> containing a single <code>bass</code> track which has a
single MIDI clip and three MIDI notes.</p>
<pre><code class="language-javascript">{
  bass: {
    clips: [
      [
        { s: 0,     l: 0.0833, n: 33, v: 100 },
        { s: 0.25,  l: 0.0833, n: 35, v: 90 },
        { s: 0.33,  l: 0.0833, n: 38, v: 60 },
        startTime: 2,
        duration:  1,
      ]
    ]
  }
}</code></pre>
</dd>
<dt><a href="#NoteObject">NoteObject</a> : <code>Object</code></dt>
<dd><p>Represents an event in a score, often a MIDI note within midi clip</p>
</dd>
<dt><a href="#FluidMessage">FluidMessage</a> : <code>Object</code> | <code>Array</code></dt>
<dd><p>Represents any type of message that can be sent from a client such as
<code>FluidClient</code> or <code>FluidUdpClient</code> to the Fluid Engine.</p>
<p>A simple example looks like this:</p>
<pre><code class="language-javascript">const createNote = {
address: &#39;/midiclip/insert/note&#39;,
  args: [
    { type: &#39;integer&#39;, value: 60 },
    { type: &#39;float&#39;, value: 0 },
    { type: &#39;float&#39;, value: 4 },
    { type: &#39;integer&#39;, value: 127 }
 ]
}</code></pre>
<p>Internally, the <code>osc-min</code> npm package is used to convert JS Objects (like the
one above) to OSC buffers. See the <code>osc-min</code> spec here:
<a href="https://www.npmjs.com/package/osc-min#javascript-representations-of-the-osc-types">https://www.npmjs.com/package/osc-min#javascript-representations-of-the-osc-types</a></p>
<p><code>fluid-music</code> clients automatically convert JavaScript arrays to OSC
bundles, so FluidMessage Objects can also be nested arrays of JS objects
as long as all objects follow the <code>osc-min</code> spec.</p>
</dd>
<dt><a href="#NoteLibrary">NoteLibrary</a> : <code>Object</code> | <code>Array</code></dt>
<dd><p><code>NoteLibrary</code> objects are used in fluid music tablature. A <code>NoteLibrary</code>
maps single character strings (<code>.length === 1</code>) to music events (such as
notes, chords, values, or annotations) in a music score or MIDI clip.</p>
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

<a name="clip"></a>

## clip : <code>object</code>
**Kind**: global namespace  

* [clip](#clip) : <code>object</code>
    * [.render(filename, [tailInSeconds])](#clip.render)
    * [.select(clipName)](#clip.select)
    * [.length(durationInWholeNotes, [trimStart])](#clip.length)
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

### clip.length(durationInWholeNotes, [trimStart])
Change the length of the clip.

**Kind**: static method of [<code>clip</code>](#clip)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| durationInWholeNotes | <code>number</code> |  | new length of the clip |
| [trimStart] | <code>boolean</code> | <code>false</code> | if true, trim the beginning of the clip,    effectively changing the start time |

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

<a name="plugin"></a>

## plugin : <code>object</code>
**Kind**: global namespace  

* [plugin](#plugin) : <code>object</code>
    * [.select(pluginName, [pluginType], [pluginId])](#plugin.select)
    * [.setParamNormalized(paramName, normalizedValue)](#plugin.setParamNormalized)
    * [.setParamExplicit(paramName, paramValue)](#plugin.setParamExplicit)
    * [.setParamNormalizedAt(paramName, normalizedValue, [timeInWholeNotes], [curve])](#plugin.setParamNormalizedAt)
    * [.setParamExplicitAt(paramName, paramValue, [timeInWholeNotes], [curve])](#plugin.setParamExplicitAt)
    * [.setExternalParamHelper(paramName, paramValue, [timeInWholeNotes], [curve])](#plugin.setExternalParamHelper)
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

### plugin.setParamNormalizedAt(paramName, normalizedValue, [timeInWholeNotes], [curve])
Changes the automation curve of the parameter value, adds a point to the
curve at the specified normalized value and time. The server automatically
adds a point at the default value of the parameter at time 0.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| paramName | <code>string</code> |  | the name of the parameter |
| normalizedValue | <code>number</code> |  | a normalized parameter value from 0 to 1 |
| [timeInWholeNotes] | <code>number</code> | <code>0</code> | time of parameter change in whole notes |
| [curve] | <code>number</code> | <code>0</code> | A number from [-1, 1] (inclusive), which    represents the curvature of the line formed by this point and the next    point. Zero implies a linear change. Higher values create a curve that    begins slowly and accelerates. Lower values create a curve that begins    quickly, and decelerates. |

<a name="plugin.setParamExplicitAt"></a>

### plugin.setParamExplicitAt(paramName, paramValue, [timeInWholeNotes], [curve])
Changes the automation curve of the parameter value, adds a point to the
curve at the specified value and time. The server automatically adds a
point at the default value of the parameter at time 0.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| paramName | <code>string</code> |  | the name of the parameter |
| paramValue | <code>number</code> |  | the explicit value of the parameter set |
| [timeInWholeNotes] | <code>number</code> | <code>0</code> | time at which the param change will be    inserted |
| [curve] | <code>number</code> | <code>0</code> | A number from [-1, 1] (inclusive), which    represents the curvature of the line formed by this point and the next    point. Zero implies a linear change. Higher values create a curve that    begins slowly and accelerates. Lower values create a curve that begins    quickly, and decelerates. |

<a name="plugin.setExternalParamHelper"></a>

### plugin.setExternalParamHelper(paramName, paramValue, [timeInWholeNotes], [curve])
Helper that makes plugin speciffic modules easier to write. You probably
do not need this unless you are writing an adapter.

For Tracktion VSTs, all parameters are normalized, so setParamNormalized
and setParamExplicit are effectively the same. This can make code that
parameterizes VSTs difficult to read and write. To address this, plugin
speciffic adapters can provide an abstraction layer that makes the code
pretty and fun to read and write. This is a helper method that makes
those adapters cleaner.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| paramName | <code>string</code> |  | the name of the parameter |
| paramValue | <code>number</code> |  | the explicit value of the parameter set |
| [timeInWholeNotes] | <code>number</code> | <code>0</code> | time at which to insert automation    point |
| [curve] | <code>number</code> | <code>0</code> | A number from [-1, 1] (inclusive), which    represents the curvature of the line formed by this point and the next    point. Zero implies a linear change. Higher values create a curve that    begins slowly and accelerates. Lower values create a curve that begins    quickly, and decelerates. |

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
Load a .trkpreset file from the client. Request that the server load that
preset on the currently selected track.

**Kind**: static method of [<code>plugin</code>](#plugin)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> \| <code>Buffer</code> | A .trkpreset filename string OR a node Buffer    object containing the contents of a .trkpreset file |

<a name="global"></a>

## global : <code>object</code>
**Kind**: global namespace  
<a name="audiotrack"></a>

## audiotrack : <code>object</code>
**Kind**: global namespace  

* [audiotrack](#audiotrack) : <code>object</code>
    * [.select(trackName)](#audiotrack.select)
    * [.insertWav(clipName, startTimeInWholeNotes, fileName)](#audiotrack.insertWav)
    * [.selectReturnTrack(busName)](#audiotrack.selectReturnTrack)
    * [.send(busName, [levelDb])](#audiotrack.send)
    * [.mute([mute])](#audiotrack.mute)
    * [.unmute()](#audiotrack.unmute)
    * [.renderRegion(outFilename, [startTimeInWholeNotes], [durationInWholeNotes])](#audiotrack.renderRegion)
    * [.removeClips()](#audiotrack.removeClips)
    * [.removeAutomation()](#audiotrack.removeAutomation)

<a name="audiotrack.select"></a>

### audiotrack.select(trackName)
Select an audio track by name

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type |
| --- | --- |
| trackName | <code>string</code> | 

<a name="audiotrack.insertWav"></a>

### audiotrack.insertWav(clipName, startTimeInWholeNotes, fileName)
Insert a audio file clip into the selected audio track. No effect if there
is no selected track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Description |
| --- | --- | --- |
| clipName | <code>string</code> | name the new clip |
| startTimeInWholeNotes | <code>number</code> | clip start time in quarter notes |
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

### audiotrack.renderRegion(outFilename, [startTimeInWholeNotes], [durationInWholeNotes])
Render a region of the track to an audio file. If no time range is
supplied, the engine should use the loop time range.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  

| Param | Type | Description |
| --- | --- | --- |
| outFilename | <code>string</code> | output filename |
| [startTimeInWholeNotes] | <code>number</code> | start time in whole notes |
| [durationInWholeNotes] | <code>number</code> | duration in whole notes |

<a name="audiotrack.removeClips"></a>

### audiotrack.removeClips()
Remove all clips (ex. audio, midi clips) from the selected audio track.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  
<a name="audiotrack.removeAutomation"></a>

### audiotrack.removeAutomation()
Remove all automation from the track and from all the tracks plugins.

**Kind**: static method of [<code>audiotrack</code>](#audiotrack)  
<a name="transport"></a>

## transport : <code>object</code>
**Kind**: global namespace  
<a name="transport.loop"></a>

### transport.loop(startTimeInWholeNotes, durationInWholeNotes)
Set loop points, and enable looping.

**Kind**: static method of [<code>transport</code>](#transport)  

| Param | Type | Description |
| --- | --- | --- |
| startTimeInWholeNotes | <code>Number</code> \| <code>false</code> | The number of quarter notes    at which the loop should begin. Or `false`, which disables looping. |
| durationInWholeNotes | <code>Number</code> | The length of the loop, measured in    quarter notes. |

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

<a name="midiclip"></a>

## midiclip : <code>object</code>
**Kind**: global namespace  

* [midiclip](#midiclip) : <code>object</code>
    * [.clear()](#midiclip.clear)
    * [.select(name, startTimeInWholeNotes, durationInWholeNotes)](#midiclip.select)
    * [.note(noteNum, startTimeInWholeNotes, [durationInWholeNotes], [velocity])](#midiclip.note)
    * [.create(clipName, startTimeInWholeNotes, durationInWholeNotes, notes)](#midiclip.create)

<a name="midiclip.clear"></a>

### midiclip.clear()
Clear all MIDI notes in the currently selected clip.

**Kind**: static method of [<code>midiclip</code>](#midiclip)  
<a name="midiclip.select"></a>

### midiclip.select(name, startTimeInWholeNotes, durationInWholeNotes)
Select a MIDI clip by name on the currently selected track. Create the clip
if it does not exist. Set the clip's start time and length in whole notes.

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the MIDI clip to select. |
| startTimeInWholeNotes | <code>number</code> |  |
| durationInWholeNotes | <code>number</code> |  |

<a name="midiclip.note"></a>

### midiclip.note(noteNum, startTimeInWholeNotes, [durationInWholeNotes], [velocity])
Create an /midiclip/n message

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| noteNum | <code>Integer</code> |  | MIDI Note Number |
| startTimeInWholeNotes | <code>Number</code> |  | Note start time in whole notes |
| [durationInWholeNotes] | <code>Number</code> | <code>0.25</code> | Note length in whole notes |
| [velocity] | <code>Integer</code> |  | Optional MIDI note velocity. |

<a name="midiclip.create"></a>

### midiclip.create(clipName, startTimeInWholeNotes, durationInWholeNotes, notes)
Build an OSC message that creates a clip with a bunch of midi notes

**Kind**: static method of [<code>midiclip</code>](#midiclip)  

| Param | Type | Description |
| --- | --- | --- |
| clipName | <code>string</code> | name of the clip. |
| startTimeInWholeNotes | <code>number</code> | clip start time in whole notes |
| durationInWholeNotes | <code>number</code> | clip length in whole notes |
| notes | [<code>Array.&lt;NoteObject&gt;</code>](#NoteObject) | array of objects, which look like:    `{ l: lengthWholeNotes, n: midiNoteNumber, s: startTimeWholeNotes }`    Be careful that all note.n properties are numbers. |

<a name="reservedKeys"></a>

## reservedKeys
These keys cannot be used for patterns in tabs and scores.

**Kind**: global constant  
<a name="choice"></a>

## choice(input)
Randomly get an element from an object or array.

**Kind**: global function  

| Param | Type |
| --- | --- |
| input | <code>Object</code> \| <code>Array</code> | 

<a name="parseRhythm"></a>

## parseRhythm(rhythm) ⇒ <code>object</code>
Convert rhythm string to a cumulative array of durations.

**Kind**: global function  
**Returns**: <code>object</code> - - a javascript object representing timing. The object will
         have two properties, both of which are arrays:
         - .totals is a measure of elapsed times
         - .deltas is the duration of each character  

| Param | Type | Description |
| --- | --- | --- |
| rhythm | <code>string</code> | String representing of a rhythm |

<a name="parseVelocity"></a>

## parseVelocity(vPattern, symbolsAndCounts, vLibrary) ⇒ <code>Array.&lt;number&gt;</code>
Helper method to convert velocity string to an array corresponding to
velocties of each symbol in symbolsAndCounts.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - - an array representing the velocity of each symbol.  

| Param | Type | Description |
| --- | --- | --- |
| vPattern | <code>string</code> | String representation of note velocities. |
| symbolsAndCounts |  | from patternToSymbolsAndCounts |
| vLibrary | <code>Array.&lt;number&gt;</code> | an indexable array containing velocity values. |

<a name="parseTab"></a>

## parseTab(rhythm, pattern, noteLibrary)
Convert a rhythm, pattern, and note library to a collection of note objects.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| rhythm | <code>string</code> |  |
| pattern | <code>string</code> |  |
| noteLibrary | [<code>NoteLibrary</code>](#NoteLibrary) | an indexable object        containing notes or arrays of notes. Can be an object or an array.        If it is an array, the pattern is limited symbols single digit        numbers 0-9.        All symbols in the pattern should reference values in the noteLibrary.        To create 'c' and 'd' quarter notes on beats 1 and 3 respectively:        rhythm  = '1234'        pattern = '0.1.'        noteLibrary = [60, 62]        noteLibrary = {'0': 60, '1': 62 } |

<a name="division"></a>

## division(char)
Helper method gets the implied division of a rhythm char.

**Kind**: global function  

| Param | Type |
| --- | --- |
| char | <code>string</code> | 

<a name="rhythmToAdvanceArray"></a>

## rhythmToAdvanceArray(rhythm) ⇒ <code>Array.&lt;number&gt;</code>
Convert each character in an string to an duration.
In the following examples, q=1/4 and e=1/8 and h=1/2
Quarter notes:
  rhythm - '1+2+'
  result - [e,e,e,e]
Spaces leave a 0 in the array.
  rhythm - '1 + '
  result - [e,0,e,0]
Eighth and quarter notes:
  rhythm - '1234+'
  result - [q,q,q,e,e]
Whole notes always 1. Half notes always get 0.5
  rhythm - 'h34'
  result - [h,q,q]
See tests for more examples.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - - An array of durations for each character  

| Param | Type | Description |
| --- | --- | --- |
| rhythm | <code>string</code> | String representing of a rhythm |

<a name="advanceArrayToSegments"></a>

## advanceArrayToSegments(advances)
Create sub groups for advances.

This helper class is only exported for testing purposes.
  in  - [1,0,0,0,2,0]
  out - [[1,0,0,0], [2,0]]

**Kind**: global function  

| Param | Type |
| --- | --- |
| advances | <code>Array.&lt;number&gt;</code> | 

<a name="getSegmentStartTotals"></a>

## getSegmentStartTotals(advances) ⇒ <code>Array.&lt;number&gt;</code>
getSegmentStartTotals is a helper method used by parseRhythm. It calculates
the start time for each "segment." As an example:
"advances" are returned by rhythmToAdvanceArray: [.4,0,0,0,  .5,0,  .5,0]
"segments" are returned by getSegments:         [[.4,0,0,0],[.5,0],[.5,0]]

Given the advances here, this should return the total amount of time elapsed
at the beginning of each segment:                [0,         .4,    .9]

Calculating start times before distributing the advances across any zeros in
segments allows us to accumulate less floating point error. I do not think
there is a reason to export getSegmentStartTotals for public use.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - - total elapsed times at the beginning of each segment  

| Param | Type | Description |
| --- | --- | --- |
| advances | <code>Array.&lt;number&gt;</code> | an array returned by rhythmToAdvanceArray() |

<a name="patternToSymbolsAndCounts"></a>

## patternToSymbolsAndCounts(pattern)
This helper method converts a pattern into an intermediary format that is
helpful for parsing a tab. Its easiest to understand with an example:

const input = 'a-1-bb...';
const output = [['a',2], ['1',2], ['b',1], ['b', 1], ['.', 3]];

For every new symbol, the out output lists that symbol, and the number of
positions that that symbols is active for.

**Kind**: global function  

| Param | Type |
| --- | --- |
| pattern | <code>string</code> | 

<a name="parse"></a>

## parse(object, [rhythm], [noteLibrary], [startTime]) ⇒ [<code>Clip</code>](#Clip)
Creates noteObject arrays from deeply nested objects. Takes a deeply nested
Object or Array, and converts it to an array of notes. The following example
will generate four eighth notes separated by eighth note rests.
```json
 {
   "noteLibrary": [1, 2, 3, 4],
   "r": "1+2+",
   "p": [
     "1.3.",
     "3.4."
   ]
 }
```
The `.p` field in the object above is a pattern. Each character in the string
indexes the note library (for details, see the parseTab documentation).

Several important things to understand:
- The example above contains a sub pattern specified in the `.p' field. The
  key (`.p`) is arbitrary. It could also `.b`, `.c`, or `.pattern`. However,
  it must not be one of the reserved keys such as `.nLibrary` or `.r`.
- Pattern arrays imply a sequence of events
- Pattern objects imply layering of events
- Sub-patterns inherit their parent's `.r`hythm and `.nLibrary` unless it
  is an object sub-pattern, in which case it may optionally specify its own.

The following example contains has an pattern object, with two layers. One
for hi-hat, and one for kick and snare. Note that unlike the pattern array
example above, the two layers in the pattern object occur simultaneously.
```json
{
 "noteLibrary": { "k": 36, "h": 42, "s": 38 },
 "r":  "1 + 2 + 3 + 4 + ",
 "ks": "k . s . . . s k ",
 "hh": "h h h h h h h h "
}
```
For more diverse examples (and more deeply nested objects), see the tests.

**Kind**: global function  
**Returns**: [<code>Clip</code>](#Clip) - A Clip object containing all the notes from the input  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> \| <code>Array</code> \| <code>String</code> | The only required argument. |
| [rhythm] | <code>String</code> | rhythm string, if not specified, `object`        must have a `.r` property. |
| [noteLibrary] | <code>Object</code> \| <code>Array</code> | An object or array noteLibrary (see        parseTab for details). If not specified, `object` must have a        `.nLibrary` property. |
| [startTime] | <code>Number</code> | offset all the notes by this much |

<a name="applyGroove"></a>

## applyGroove(notes, grooveItem, multipliers, randomness) ⇒ <code>Array.&lt;Object&gt;</code>
Applies a specified groove onto an array of note objects

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - - The modified note array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| notes | <code>Array.&lt;Object&gt;</code> |  | An array of note objects |
| grooveItem | <code>string</code> \| <code>Object</code> |  | Either the name of the groove present         within the groove library, or a new groove object. |
| multipliers | <code>Object</code> |  | An object of the form {v: number, o: number, l: number}        the keys are: velocity, offset and level respectively.         Level affects the overall effect the groove has on the note objects. |
| randomness | <code>number</code> | <code>0</code> | A number representing the amount of randomness added to the offset |

<a name="valueToWholeNotes"></a>

## valueToWholeNotes(value) ⇒ <code>Number</code>
Convert a string or number to a number of whole notes.

**Kind**: global function  
**Returns**: <code>Number</code> - - A duration in whole notes  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>Number</code> | input value can be 'quarter' or '1/4' or 0.25 |

<a name="parse"></a>

## parse(scoreObject, [config], [session]) ⇒ [<code>Session</code>](#Session)
score.parse is somewhat similar to tab.parse, except that it expects a
different input format, and outputs a `Session` instead of an array of notes.

Typically called with two arguments (other args are for internal use only)
- A ScoreObject array
- A config object with (at minimum) a `.nLibrary` and `.r`hythm

**Kind**: global function  
**Returns**: [<code>Session</code>](#Session) - representation of the score.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scoreObject | [<code>ScoreObject</code>](#ScoreObject) \| <code>String</code> |  | The Score Object to parse |
| [config] | <code>Object</code> |  |  |
| [config.startTime] | <code>number</code> | <code>0</code> |  |
| [config.rhythm] | <code>string</code> |  | default rhythm string, which may be    overridden by values in `scoreObject`. If not specified, `scoreObject` must have a   `.r` property. |
| [config.trackKey] | <code>string</code> |  | name of the track being parsed |
| [config.vPattern] | <code>string</code> |  | optional velocity library |
| [config.vLibrary] | [<code>NoteLibrary</code>](#NoteLibrary) |  |  |
| [config.nLibrary] | [<code>NoteLibrary</code>](#NoteLibrary) |  | (see tab.parseTab for details about   `NoteLibrary`). If not specified, `scoreObject` must have a `.nLibrary` property. |
| [session] | [<code>Session</code>](#Session) |  | Only used in recursion. Consuming cose should not    supply this argument. |

<a name="tracksToFluidMessage"></a>

## tracksToFluidMessage(tracksObject) ⇒ [<code>FluidMessage</code>](#FluidMessage)
Create a `FluidMessage` from a TracksObject

```javascript
const session = fluid.score.parse(myScore, myConfig);
const message = fluid.score.tracksToFluidMessage(session.tracks);
const client = new fluid.Client();
client.send(message);
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tracksObject | [<code>TracksObject</code>](#TracksObject) | A tracks object generated by score.parse |

<a name="ScoreObject"></a>

## ScoreObject : <code>Object.&lt;string, ScoreObject&gt;</code> \| [<code>Array.&lt;ScoreObject&gt;</code>](#ScoreObject)
A structured musical score encoded with `fluid.tab` notation

**Kind**: global typedef  
<a name="Session"></a>

## Session : <code>Object.&lt;string, Session&gt;</code>
Session encapsulates the structure of a DAW Session.

```
const exampleSession = {
  startTime: 0,
  duration: 4,
  tracks: {
    drums: {
      clips: [
        {
          notes: [ { s: 0, l: 0.25, n: 0 } ],
          duration: 1,
          startTime: 0
        },
        {
          notes: [ { s: 0, l: 0.25, n: 1 } ],
          duration: 1,
          startTime: 1
        },
        {
          notes: [ { s: 0, l: 0.25, n: 2 } ],
          duration: 1,
          startTime: 2
        },
        {
          notes: [ { s: 0, l: 0.25, n: 3 } ],
          duration: 1,
          startTime: 3
        }
      ]
    }
  },
  regions: [
    {
      startTime: 0,
      duration: 2,
      regions: [
        {
          notes: [ { s: 0, l: 0.25, n: 0 } ],
          duration: 1,
          startTime: 0
        },
        {
          notes: [ { s: 0, l: 0.25, n: 1 } ],
          duration: 1,
          startTime: 1
        }
      ]
    },
    { notes: [ { s: 0, l: 0.25, n: 2 } ], duration: 1, startTime: 2 },
    { notes: [ { s: 0, l: 0.25, n: 3 } ], duration: 1, startTime: 3 }
  ]
}
```

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| startTime | <code>number</code> |  |
| duration | <code>number</code> |  |
| [regions] | [<code>Array.&lt;Session&gt;</code>](#Session) | (Only on sessions created from an array) |
| [tracks] | <code>TrackObject</code> | (Only on top level/outermost sessions) |

<a name="Clip"></a>

## Clip : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| notes | [<code>Array.&lt;NoteObject&gt;</code>](#NoteObject) |  |
| duration | <code>number</code> | duration in whole notes |
| [startTime] | <code>number</code> | start time in whole notes |

<a name="TracksObject"></a>

## TracksObject : <code>Object</code>
Represents a collection of audio tracks, and clips on those tracks.

Example of a `TracksObject` containing a single `bass` track which has a
single MIDI clip and three MIDI notes.
```javascript
{
  bass: {
    clips: [
      [
        { s: 0,     l: 0.0833, n: 33, v: 100 },
        { s: 0.25,  l: 0.0833, n: 35, v: 90 },
        { s: 0.33,  l: 0.0833, n: 38, v: 60 },
        startTime: 2,
        duration:  1,
      ]
    ]
  }
}
```

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| <trackName> | [<code>TracksObject</code>](#TracksObject) | TracksObjects can be deeply nested |
| <trackName> | <code>Array</code> |  |
| <trackName> | <code>string</code> |  |

<a name="NoteObject"></a>

## NoteObject : <code>Object</code>
Represents an event in a score, often a MIDI note within midi clip

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| n | <code>number</code> \| <code>Object</code> |  | probably a MIDI note number - however, nested  `NoteLibrary` objects might also put arbitrary JavaScipt Objects in this   field |
| l | <code>number</code> |  | length in whole notes |
| s | <code>number</code> |  | start time in whole notes |
| [v] | <code>number</code> | <code>64</code> | optional midi velocity |

<a name="FluidMessage"></a>

## FluidMessage : <code>Object</code> \| <code>Array</code>
Represents any type of message that can be sent from a client such as
`FluidClient` or `FluidUdpClient` to the Fluid Engine.

A simple example looks like this:
```javascript
const createNote = {
address: '/midiclip/insert/note',
  args: [
    { type: 'integer', value: 60 },
    { type: 'float', value: 0 },
    { type: 'float', value: 4 },
    { type: 'integer', value: 127 }
 ]
}
```

Internally, the `osc-min` npm package is used to convert JS Objects (like the
one above) to OSC buffers. See the `osc-min` spec here:
https://www.npmjs.com/package/osc-min#javascript-representations-of-the-osc-types

`fluid-music` clients automatically convert JavaScript arrays to OSC
bundles, so FluidMessage Objects can also be nested arrays of JS objects
as long as all objects follow the `osc-min` spec.

**Kind**: global typedef  
<a name="NoteLibrary"></a>

## NoteLibrary : <code>Object</code> \| <code>Array</code>
`NoteLibrary` objects are used in fluid music tablature. A `NoteLibrary`
maps single character strings (`.length === 1`) to music events (such as
notes, chords, values, or annotations) in a music score or MIDI clip.

**Kind**: global typedef  
