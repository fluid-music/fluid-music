# About Fluid Music

The Fluid Music framework is made to describe musical ideas and music production
techniques with code.

The high-level goal is to enable users to write customizable music production
tools, and share these tools via a massive, open repository. Users can than
create music by customizing and reusing different combinations of tools and
techniques. The software patterns defined by [`fluid-music` npm
package](https://www.npmjs.com/package/fluid-music) help to keep these tools
interoperable by providing a simple JavaScript based language for describing
musical rhythms, chord progressions, audio sample sequences, VST plugin presets,
midi notes, audio tracks, routing, automation, and more.

Fluid Music aims to be:
- **Useful** for creating music that people care about
    - Integration with "professional" tools (ex. Reaper, VST Plugins)
    - Designed around the Node.js and NPM ecosystem
- **Welcoming** to developers with a wide variety of backgrounds
    - Select integrated commercial tools carefully, balancing cost and usefulness
    - Simple and accessible API
    - Typescript definitions for syntax completion
    - Accessible documentation

SuperCollider, CSound, and Sonic Pi are all code-based tools for sound design.
They are useful for educational purposes, and for creating experimental
instruments and experimental music. In my experience working as a sound designer
and audio engineer it is much faster and easier to use a conventional digital
audio workstation (DAW) to record, produce, or edit music than it is with
code-based tools. This is doubly true when I want to tweak details and get
highly polished results. In music production, details matter.

Existing code-based are not designed for producing music. They are useful when
you want to use digital primitives like oscillators and filters to build audio
processors from scratch. However in most musical production settings, building
things from scratch is not the goal. You want to have a high-quality reverb, bus
compressor, and synthesizer collection ready-to-go, so that you can focus your
efforts on getting musical results, and avoid getting caught up in technical
implementation details. This is probably why even audio engineers and producers
who really enjoy writing code still tend to use a DAW at the core of their music
production workflow.

Unlike existing code-based sound design tools, Fluid Music is made to integrate
with a conventional DAW/VST music production workflow.

**You can use Fluid to play audio and render audio files without *any* external commercial software.**

However, you get the most out of Fluid Music by using it with a supported DAW.
Reaper and Tracktion Waveform are currently supported. I chose these DAWs for
several reasons. They are affordable, flexible, have an established user base,
an accessible file format, and run on Mac, Windows, and Linux. I considered
supporting Ableton Live, but decided that its high price tag and lack of proper
Linux support excluded too many users. I may add support for other DAWs in the
future, but not until after I get feedback on the current implementation. I
considered Ardour, which is free and open source, but it is generally less
powerful and flexible than Reaper, and has a much smaller user base.

Currently, VST2 is the only fully supported plugin format. The choice to support
VST2 plugins was a difficult based on many factors. VST2 offers several
advantages:

- All major DAWs support VST2, so Fluid Music sessions using VST2 plugins can be
  interoperable with DAWs. DAW interoperability is an essential feature of Fluid
  Music, and is part of what distinguishes it from other code-base tools for
  sound design and music production.
- There are many high-quality, free VST2 plugins available
- Most popular, useful commercial plugins are available in VST2 format
- VST2s are well supported on Windows, Linux, and MacOS

However, the VST2 format also comes with non-trivial disadvantages:

- The VST2 standard is not open. Steinberg, the company that created the format,
  does not allow anyone without an existing license to distribute VST2 plugins
  or VST2 hosts. This means that for now, only users who already have access to
  the VST2 SDK can use plugins in the Fluid Music. This is probably the biggest
  limitation of Fluid Music that needs to be addressed before `v1.0.0`
- VST plugin state is not always fully configurable from the host - certain VST2
  parameters (on certain VST2 plugins) can only be modified from the plugin's
  GUI. This means that a VST2s are not currently fully-configurable in Fluid
  Music.
- The format is not well defined, and different plugin hosts support slightly
  different feature sets.
- Sometimes simple modular audio primitives like delays or oscillators are
  useful for sound design, and while these are readily available in languages
  like CSound, VSTs don not work well for this.

Steinberg wants to encourage users to move to the newer VST3 format. However,
the Fluid Music server is written with the JUCE C++ SDK. Limitations in the
JUCE's VST3 host implementation will make adding VST3 support to the Fluid Music
time consuming, and I have not yet had the time to do it.

The best way to use a VST plugin inside Fluid Music with a JavaScript VST
"adapter" class written in JavaScript. The fluid music library comes bundled
with VST adapter classes for some existing VST plugins. I prioritized bundling
adapters for high-quality, free VST plugins that support MacOS, Windows, and
Linux, including:
- Audio Damage RoughRider3 (compressor)
- U-He Podolski Synthesizer
- U-He TyrellN6 Virtual Analog Synthesizer
- Dragonfly Room Reverb

Fluid music can auto-generate adapter templates for VST plugins that you have
installed on your machine. These adapters can be published on NPM, for easy
distribution and versioning. Unfortunately, you still need the VST2 SDK to do
this.

## Integration with Commercial Software.

In some cases, there is a tension between what is useful and what is welcoming
to a wide audience. The choice to integrate commercial DAWs in Fluid Music
illustrates this tension. In my experience, Reaper is more useful than Ardour.
At the same time, a personal Reaper license costs $60, while Ardour is free. The
license cost limits *who* Reaper is welcoming to.

The following design choices and implementation details affect what Fluid Music
is useful for, and who it is welcoming to:

- The Fluid Music server was written with
  [JUCE](https://github.com/juce-framework/JUCE) and [Tracktion
  Waveform](https://github.com/Tracktion/tracktion_engine), both of which are
  open-source, but commercially oriented C++ libraries.
- The fluid music client library is designed to be very extensible. This
  extensibility is facilitated by [npm](https://npmjs.com), which has a (mostly)
  permissive license, but commercially oriented, and has both open source and
  close source components.
- It can host and configure VST2 audio plugins. VSTs are in important part of
  professional audio production workflow, unfortunately the VST standard is not
  open - you may not legally distribute software that uses it without approval
  from its creator, Steinberg. The best way to use VST plugins is to use the
  Fluid Music tools to auto-generate an "adapter" for the plugin. The adapter
  exposes plugin parameters to Node.js. Users can create plugin adapters for
  their plugins, and publish their adapters on npm. The main
  `[fluid-music](https://www.npmjs.com/package/fluid-music)` npm library comes
  bundled with several adapters for free VST2 plugins, so these plugins can be
  used and edited out-of-the-box. This approach allows users to work with
  commercial plugins, but encourages users to work with free plugins when
  possible.
- It can export to the Reaper digital audio workstation format. Reaper is a
  commercial DAW, but a personal license costs 60$ - significantly less than
  most DAWs, especially given how powerful and flexible Reaper is. It also has a
  unrestricted trial version that can be used for free. Reaper does not use
  any copy-protection system.
- It can export to the Waveform digital audio workstation format. Waveform is
  also commercial software, but it comes in several flavors including "Waveform
  Pro" and "Waveform Free." The free version has a limited feature set, but it
  still works well for studying or editing Fluid Music compositions.

## Design Background

Some of the design choices were informed by my own experience working as an
audio engineer and sound designer, a lot of the jobs that I wanted to do, were
just more difficult or more time consuming than I would like. I spent way more
time than I wanted manually writing automation in a digital audio workstation
(DAW). Surely some parts of this (often repetitive and monotonous) work could be
scripted or automated?

Some DAWs like Reaper and BitWig Studio have built-in scripting support. They
provide a mechanism run user-written code that controls the DAW while it is
running normally. I tried using these to automate time-consuming and repetitive
tasks, but in both cases it turned out to be clumsy. DAW-hosted scripting
support worked reasonably well in simple situations, but for more complicated
projects I ran into limitations of the system. Scripts hosted by the DAWs that I
used often had difficulty interacting with external software libraries. For
example, BitWig Studio can run JavaScript files. Internally, BitWig uses Nashorn
JavaScript interpreter. Nashorn only supports JavaScript language version 1.6
which was added to the Firefox browser in 2005. JavaScript changed a lot in the
past 15 years. The outdated language support prevents virtually any npm modules
from working within the BitWig JavaScript environment system. A determined
developer can overcome these limitations, but such inconveniences prevent the
developer environment from being welcoming.

Reaper's scripting support has similar limitations. Reaper can host Python
scripts, but its awkward interaction with the host operating system's Python
installation makes for a rough user experience, especially when managing
external dependencies. In order to be welcoming to developers, the system needs
to run smoothly without requiring users to fiddle with layers of user
preferences, while also placing all code and dependencies in obscure directories
on the hard drive that may change confusingly depending on the user's operating
system.

I found code-based sound design languages (like CSound and SuperCollider) were
effective for some sound-design tasks, but they are not good for building larger
software applications.

All three use a "domain specific language," (DSL) meaning that each tool uses a
custom programming language designed for a specific purpose. In my experience,
DSLs are (by design) useful for a narrow range tasks. The CSound "instrument"
and "score" language works well for writing certain types of musical scores, but
it is not useful for other programming tasks. You can build a full digital audio
workstation with a GUI and all the features that make Ableton Live useful on top
of SuperCollider, but this is impractical, compared to using lower level
software libraries for the same purpose.

Robust software depends on testing: User testing, test-driven-development, or
unit tests. General purpose programming languages have libraries and conventions
that make writing tests easier (and more welcoming). The audio DSLs I used made
writing unit tests difficult or infeasible.

When you spend time learning and working with a general purpose programming, you
are building skills that are transferable to other kinds of tasks. Learning a
DSL feels like driving down a cul-de-sac. The skills that you learn while using
a DSL are less useful outside of the domain that language was made for.

DSLs tend to have limited tooling support, making them less welcoming to new
users. When writing JavaScript code in Visual Studio Code, we get lots of
helpful features like syntax completion, editor plugins, type introspection,
visual identification of syntax errors, git integration, and package manager
integration. DSLs tend to have niche audiences and fewer person-hours invested
in supporting the features that make a welcoming developer environment.

## Comparison with other tools

The following design choices show a balance between timeline-centric, GUI-based DAWs, and other systems for computational sound design.

**The Fluid Engine can:**
- Describe sound design documents in a format that is human readable and machine readable, allowing:
  - an ecosystem of recipe sharing, akin to a package manager AND
  - integration with procedural and ML workflows
- Integrate with a conventional DAW GUI, which is necessary for:
  - precision timeline based editing
  - carefully inspecting the output of computational content and recipes
  - creating content that is competitive with music created professionally using the conventional DAW based workflow
- Host and configure VST2 plugins (if you have access to the VST2 sdk), which is important for:
  - Inspecting and modifying output material in a DAW
- Render results in realtime, which is necessary for:
  - playing the engine like an instrument
  - exploring recipe parameter space as a sound designer
  - mixing/matching/tweaking input recipes as a musician/composer
  - running in an dynamic audio streaming server
- Render offline. Necessary for:
  - offline personalized content systems
  - deploying in machine learning projects such as a GANs and reinforcement learning systems
  - efficient machine listening based recipes
- Run headless, which is necessary for:
  - deploying to a web server

**Traditional DAWs**
- Useful if you want:
  - precise timeline-based editing. No other tool works as well for common timeline based sound design like precise parameter automation, audio editing, and mixing, arranging
  - great for both realtime editing and offline audio rendering
  - professional plugin ecosystem
- Not helpful if you need to:
  - insert any kind of computation or procedural content into the the production pipeline
  - deploy dynamic content to a web server or mobile devices

**Graphical programming languages like Max and PureData**
- Useful when you want to:
  - prototype realtime interactive systems
- Not useful if you need:
  - precise timeline-based editing
  - design systems that are too complex to manage in a graphical programming environment

**Code based languages like SuperCollider and ChucK, and CSound**
- Useful when you want to:
  - design complex interactive audio graphs
  - deploy on a server or in mobile app
  - do experimental sound design
- Not useful if you need:
  - precise timeline-based editing/composing on a timeline (while CSound is built on the concept of a text based "score," it is very clumsy to work with when compared with a DAW)
  - support for pro quality plugins
  - precise audio editing support
  - DAW integration

**Code based languages like Sonic Pi and TidalCycles**
- Useful when you want to write code as a live musical performance
- Not useful if you want to compose on a timeline

**Music21 (symbolic music notation library)**
- Useful for computational score analysis
- Not useful for
  - computational composition
  - daw integration
