# Fluid Engine

The Fluid Engine is a Swiss Army Knife for **computational sound design** and electro-acoustic composition.

The Fluid Engine introduces the concept of **sound design recipes**, which encapsulate sound design tasks inside modular blocks of imperative code. This recipe-based system aims to:

1. Make new kinds of computational sound design feasible
1. Expedite the monotonous parts of sound design
1. Document and parametrize the sound design practices used to achieve certain musical results
1. Enable sharing, distribution, versioning, and remixing of **sound design recipes**
1. Provide foundational infrastructure to experiment with new ways of creating, packaging and distributing dynamic music systems

## Install

Most work happens on the `develop` branch:

```
git clone https://github.com/CharlesHolbrow/cybr.git
cd cybr
git checkout develop
git submodule update --init --recursive
```

### Building in Linux

First open `cybr.jucer` in [Projucer](https://juce.com/discover/projucer).

If you do not need [JACK](https://jackaudio.org/) support, disable it in the
projucer project via `modules -> juce_audio_devices -> JUCE_JACK`. If you leave
JACK enabled, make sure that you have the JACK development files installed:

```
sudo apt install libjack-jackd2-dev # Ubuntu/Debian
```

Save the projucer project with `^+p` to generate `Builds/LinuxMakefile/Makefile`.

```sh
cd Builds/LinuxMakefile/
make                     # build debug binary
env CONFIG=Release make  # build release binary
```

## Comparison with other tools

The Fluid Engine aims to bridge the gap between DAWs and existing procedural audio languages by integrating computational code-based techniques directly into a conventional audio workstation. The following design choices show a balance between timeline-centric, GUI-based DAWs, and other systems for imperative computational sound design.

**The Fluid Engine:**
- Integrates with a conventional DAW GUI, which is necessary for:
  - precision timeline based editing
  - carefully inspecting the output of computational content and recipes
  - creating content that is competitive with music created professionally using the conventional DAW based workflow
- Can render results in realtime, which is necessary for:
  - playing the engine like an instrument
  - exploring recipe parameter space as a sound designer
  - mixing/matching/tweaking input recipes as a musician/composer
  - running in an dynamic audio streaming server
- Can render offline. Necessary for:
  - offline personalized content systems
  - deploying in machine learning projects such as a GANs and reinforcement learning systems
  - efficient machine listening based recipes
- Can run headless, which is necessary for:
  - deploying to a web server
- Can describe sound design documents in a format that is human readable and machine readable, allowing:
  - an ecosystem of recipe sharing, akin to a package manager AND
  - integration with procedural and ML workflows

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
    - precise timeline-based editing/composing on a timeline (while Csound is built on the concept of a text based "score," it is very clumsy to work with when compared with a DAW)
    - support for pro quality plugins
    - precise audio editing support

## Workflow

The engine strikes a balance between code based workflow and a GUI/DAW based workflow. The most basic use of the Fluid Engine looks like this:

1. Write **sound design recipes** using the language described in the `fluid-music` node module (recipes encapsulate sound design procedures that would traditionally be performed in a DAW.)
2. Send a collection of recipes to the Fluid Engine server. Update the recipe parameters while auditioning the sonic output in realtime until results are satisfactory.
3. Tweak the result in a DAW. Currently, [Tracktion Waveform](https://www.tracktion.com/products/waveform) is supported. Support for other formats may be added.

...but much more complicated and flexible uses can be built on the tools in this repository.

## CLI

The most common invocation is `cybr -e -f`, which opens an empty document (`-e`) and starts a server listening for `fluid-music` recipes (`-f`). Recipes can then be sent from `fluid-music` client code.

For up-to-date info on all the possible commands, run `cybr -h`.

For detailed information about an option,  (ex `-f`) run `cybr -h -f`

```
cybr -f|--fluid-server           Launch a server and listen for fluid engine OSC messages
cybr --scan-plugins              Scan for VST/VST3/AU plugins, adding them to the settings file
cybr -a|--autodetect-pm          Add Tracktion Waveform project manager to the settings file
cybr --list-plugins              List available plugins
cybr --list-plugin-params=name   List all the automatable parameters in the given plugin
cybr --list-plugin-presets=name  Print all presets (programs) for a named plugin
cybr --list-projects             List all the projects from the project manager
cybr -i file.tracktionedit       Load the specified .tracktionedit file
cybr -o out.tracktionedit        Save/render the active edit to a .tracktionedit or .wav
cybr --list-clips                Print a list of the clips in the active Edit
cybr --list-tracks               Print a list of tracks in the active Edit
cybr -e|--empty[=editfile]       Activate an empty edit with optional .tracktionedit file
cybr -j                          Experimental custom plugin. WORK-IN-PROGRESS
cybr --print-length              Print the length in seconds of the active edit
cybr --print-config-filename     Print the complete settings filename.
cybr -p                          Play the active edit
cybr -r                          Record OSC while playing the Edit. WORK-IN-PROGRESS
cybr --list-io                   Print the engine's MIDI and Wave IO devices
cybr --list-edit-inputs          Print edit inputs (only print available inputs)
cybr --list-state                Print type of top level chilren in the edit
cybr --target-port=9999          Set OSC destination port
cybr --target-host=127.0.0.1     Set OSC Destination hostname
cybr --ping-osc[=100]            Repeatedly send a test osc message
cybr --jack-test                 check if jack audio is supported
cybr --print-block-size          print audio block size
cybr --preset-path[=./path|!]    Print/Add/Reset preset search path
cybr --sample-path[=./path|!]    Print/Add/Reset sample search path
cybr -h|--help [-i ...]          Print detailed info for subsequent arguments
```

## File Search Paths

When running as a server, some methods like the one below accept a file name among their inputs.

- `/audiotrack/insert/wav` (use `--sample-path` to view/update paths)
- `/plugin/sampler/add` (use `--sample-path` to view/update paths)
- `/plugin/load` (use `--preset-path` to view/update paths)

How do these work, and what paths to they search? Generally, these tend to work like this:

1. If an absolute path is specified, use that.
1. Check if the file is relative to the active edit
1. Search the configurable list of paths for the relevant file type.

Here are the current defaults on mac (these will look different on Windows and Linux). Note that you can change these defaults with the relevant CLI.

- `/audiotrack/insert/wav` and `/plugin/sampler/add`
  1. `~/Library/Application Support/cybr/sample`
- `/plugin/load`
  1. `~/Library/Application Support/cybr/preset`
  1. `~/Library/Application Support/Tracktion/Waveform/Presets`

Note that `/plugin/load` and `/plugin/save` expect to look for `.trkpreset` files. If the filename supplied does not have a `.trkpreset` extension, one will be added automatically. This means that the methods can simply specify a preset name like `'4OSC Clinics Unison WMF'`, and if Tracktion Waveform is installed.

Note that `/plugin/save` will save preset files in the *first* directory in the preset search path. Currently, saving a plugin with an absolute pathname is not supported.

Under the hood, these methods use the `CybrSearchPath` class to search a list of directories. These directories can be configured with the `--sample-path=/some/path` and `--preset-path=/some/path` command line arguments. These modify the cybr settings file by adding the supplied path to the start of the search path. Note that OSC method handlers will still check relative to the active edit file when searching for files.

It is worth looking at the OSC method handlers, because these might further customize the behavior.
