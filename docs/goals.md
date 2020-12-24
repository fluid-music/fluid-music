## Useful, Welcoming (Audio) Software

The [`fluid-music` framework](https://www.npmjs.com/package/fluid-music) is made to describe musical ideas and music production techniques with code.

The high-level goal enable users to write customizable music production tools, and share these tools via a massive, open repository. Users can than create music by customizing and reusing different combinations of tools and techniques. Software patterns defined by [`fluid-music` npm package](https://www.npmjs.com/package/fluid-music) helps to keep these tools interoperable by providing a simple JavaScript based language for describing musical rhythms, chord progressions, audio sample sequences, VST plugin presets, midi notes, audio tracks, routing, automation, and more.

Fluid Music aims to be:
- **Useful** for creating music that people care about
- **Welcoming** to developers with a wide variety of backgrounds

Unless otherwise indicated, in this document I will use the word "useful" to
mean "useful for creating music that people care about." Similarly, "welcoming"
means "welcoming to developers with a wide variety of backgrounds."

Fluid music was written as part of my ([Charles Holbrow](https://charlesholbrow.com))
PhD studies at the [MIT Media Lab](htts://media.mit.edu). The [fluid-music npm module](https://)

 The `fluid-music` npm library library is glue that holds
plumbing that
to


Fluid music is a
modular and extensible software library for

There are a lot of ways to create music with code. The design

While working as an audio engineer and
sound designer, a lot of the jobs that I wanted to do, were just more difficult
or more time consuming than I would like. I spent way more time than I wanted
manually writing automation in a digital audio workstation (DAW). Surely some
parts of this (often repetitive and monotonous) work could be scripted or
automated?

Some DAWs like Reaper and BitWig Studio have built-in scripting support. They
provide a mechanism run user-written code that controls the DAW while it is
running normally. I tried using these to automate time-consuming and repetitive
tasks, but in both cases it turned out to be clumsy. DAW-hosted scripting
support worked reasonably well in simple situations, but for more complicated
projects I ran into limitations of the system. Scripts hosted by the DAWs that
I used often had difficulty interacting with external software libraries.
For example, BitWig Studio can run JavaScript files. Internally, BitWig
uses Nashorn JavaScript interpreter. Nashorn only supports
JavaScript language version 1.6 which was added to the Firefox browser in 2005.
JavaScript changed a lot in the past 15 years. The outdated language support
prevents virtually any npm modules from working within the BitWig JavaScript
environment system. A determined developer can overcome these limitations, but
such inconveniences prevent the developer environment from being welcoming.

Reaper's scripting support has similar limitations. Reaper can host Python
scripts, but its awkward interaction with the host operating system's Python
installation makes for a rough user experience, especially when managing
external dependencies. In order to be welcoming to developers, the system needs
to run smoothly without requiring users to fiddle with layers of user
preferences, while also placing all code and dependencies in obscure directories
on the hard drive that may change confusingly depending on the user's operating
system.

I found code-based sound design languages like CSound, SuperCollider, and
Sonic Pi were effective for some sound-design tasks, but they are not good for
building larger software applications.

All three use a "domain specific language," (DSL) meaning that each tool uses a
custom programming language designed for a specific purpose.
In my experience, DSLs are (by design) useful for a narrow range tasks. The
CSound "instrument" and "score" language works well for writing certain types
of musical scores, but it is not useful for other programming tasks.
You can build a full digital audio workstation with a GUI and all the features
that make Ableton Live useful on top of SuperCollider, but this is impractical,
compared to using lower level software libraries for the same purpose.

Robust software depends on testing: User testing, test-driven-development,
or unit tests. General purpose programming languages have libraries and
conventions that make writing tests easier (and more welcoming). The audio
DSLs I used made writing unit tests difficult or infeasible.

When you spend time learning and working with a general purpose programming,
you are building skills that are transferable to other kinds of tasks. Learning
a DSL feels like driving down a cul-de-sac. The skills that you learn while
using a DSL are less useful outside of the domain that language was made for.

DSLs tend to have limited tooling support, making them less welcoming to new
users. When writing JavaScript code in Visual Studio Code, we get lots of
helpful features like syntax completion, editor plugins, type introspection,
visual identification of syntax errors, git integration, and package manager
integration. DSLs tend to have niche audiences and fewer person-hours invested
in supporting the features that make a welcoming developer environment.

My experience with audio DSLs is that they are less welcoming than general
purpose languages. However, they are also useful CSound and SuperCollider
work well for creating modulating FM synthesizers. However,

To make recorded music that really resonates with listeners.

There are exceptions of course, and there are many beautiful examples of music made with

Sonic Pi is designed for live coding,


When sequencing audio, midi, and parameter automation

If you want to create

Making music that is subtle, polished, and

I wanted fluid-music to be able to create audio that sounds good.

What does it mean to "sound good"? It is


For me it was very difficult and time-consuming to make polished sounding
content with audio DSLs. Listen to the examples that Audio DSLs

 Even the most widely shared projects created in audio DSLs
to my ear sound less polished and professional that

 barrier that I ran into when using audio DSLs was not how
welcoming they are





Additionally, they didn't work well with some of the "professional" tools that I had come to rely on to make things sound good, keeping my clients happy.

There is u

I found myself re-using sound design techniques,


I built up a
collection if tricks and techniques that I used to make audio content sound
exciting, gentle, powerful, soft, or beautiful. I found myself reusing these
techniques, and I spent too much time


software This document is an attempt to make the motivation for these decisions explicit.
During the design process
many small design decisions


### Integration with Commercial Software.

When working as an audio engineer pro

I've used a lot of software tools for making music from. Some of these, like
[CSound](https://csound.com/) and [Aurdour](https://ardour.org/), are free and
open source. Others, like Ableton Live, have a commercial license, and cost
hundreds or thousands of dollars per user.



For me, it would be difficult to
create music that I care about with only free and open source tools. However,
expensive tools like Ableton Live exclude a lot of users through their cost,
their licensing restrictions, and their hardware and software requirements. In
this way, there is a tension between the two goals.

Fluid Music strikes a balance. **You can use Fluid music without any external commercial software.**
It runs on Mac, Windows, and Linux, and can play audio and render audio
files without external commercial software. However, it does depend on some
code that is licensed commercially. It also supports some commercial formats.
The following notes illustrate some of the design choices that strike a
balance between power, flexibility, practicality, and accessibility.

- The Fluid Music server was written with [JUCE](https://github.com/juce-framework/JUCE) and [Tracktion Waveform](https://github.com/Tracktion/tracktion_engine), both of which are open-source, but commercially oriented C++ libraries.
- The fluid music client library is designed to be very extensible. This extensibility is facilitated by [npm](https://npmjs.com), which has a (mostly) permissive license, but commercially oriented, and has both open source and close source components.
- It can host and configure VST2 audio plugins. VSTs are in important part of professional audio production workflow, unfortunately the VST standard is not open - you may not legally distribute software that uses it without approval from its creator, Steinberg. The best way to use VST plugins is to use the Fluid Music tools to auto-generate an "adapter" for the plugin. The adapter exposes plugin parameters to Node.js. Users can create plugin adapters for their plugins, and publish their adapters on npm. The main `[fluid-music](https://www.npmjs.com/package/fluid-music)` npm library comes bundled with several adapters for free VST2 plugins, so these plugins can be used and edited out-of-the-box. This approach allows users to work with commercial plugins, but encourages users to work with free plugins when possible.
- It can export to the Reaper digital audio workstation format. Reaper is a commercial DAW, but a personal license costs 60$ - significantly less than most DAWs, especially given how powerful and flexible Reaper is. It also has a unrestricted trial version that can be used for free.
- It can export to the Waveform digital audio workstation format. Waveform is also commercial software, but it comes in several flavors including "Waveform Pro" and "Waveform Free." The free version has a limited feature set, but it still works well for studying or editing Fluid Music compositions.


Fluid Music is still a young project, and there is a long way to go before