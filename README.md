# Fluid Engine

The Fluid Engine is a Swiss Army Knife for **computational sound design** and electro-acoustic composition.

The Fluid Engine introduces the concept of **sound design recipes**, which encapsulate some of the tasks conventionally performed in a DAW in modular blocks of imperative code. The Fluid Engine aims to:

1. Expedite the monotonous parts of sound design by abstracting sound design tasks into **sound design recipes**
1. Document the sound design practices used to achieve certain musical results in a way that is both *human readable* and *machine readable*.
1. Enable sharing, distribution, versioning, and remixing of **sound design recipes**
1. Provide a foundation to experiment with new kinds of recorded music that are more dynamic and more flexible than the static audio files commonly distributed today.

Together, these are necessary prerequisites for effective *fluid music*.

## Comparison with other tools

- GUI/DAW based systems are useful for precision editing along a timeline.
- Graphical programming languages like Max and PureData are useful for prototyping realtime interactive systems.
- Code based languages like SuperCollider and CSound are useful for designing and deploying systems are more complex that what is supported in a DAW

The fluid engine strikes a different balance
- Can run headless:
  - Necessary for deploying on a server
- Integrates with a conventional DAW GUI for precision timeline based editing.
  - This is necessary for releasing music that is competitive with music created professionally using the conventional DAW based workflow.
- Can render results in realtime, which is necessary for:
  - playing the engine like an instrument
  - exploring the output space possibilities as a musician/composer
  - mixing/matching/tweaking input recipes
  - Can run as a streaming server
- Can render offline. Necessary for:
  - generating content faster than realtime
  - using the engine in machine learning contexts such as GANs or reinforcement learning.

## Workflow

The engine strikes a balance between code based workflow and a GUI/DAW based workflow. The most basic use of the Fluid Engine looks like this:

1. Write **sound design recipes** using the language described in the `fluid-music` node module (recipes encapsulate sound design procedures that would traditionally be performed in a DAW.)
2. Send a collection of recipes to the Fluid Engine server. Update the recipe parameters while auditioning the sonic output in realtime until results are satisfactory.
3. Tweak the result in a DAW. Currently, [Tracktion Waveform](https://www.tracktion.com/products/waveform) is supported. Support for other formats may be added.

...but much more complicated and flexible uses can be built on the tools in this repository.

## CLI

The most common invocation is `cybr -e -f`, opens an empty document (`-e`) and starts a server listening for `fluid-music` recipes (`-f`). Recipes can then be sent from `fluid-music` client code.

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
