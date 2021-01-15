## Cybr Audio Server

The `cybr` server is a companion to the [`fluid-music` JavaScript library](https://www.npmjs.com/package/fluid-music), which enables you to:

- Play and render audio from JavaScript
- Use and configure VST plugins from JavaScript

To get the most out of the the fluid music system, you will want to run an instance of `cybr` alongside your JavaScript code.

## CLI

The most common invocation is `cybr -e -f`, which opens an empty document (`-e`) and starts a server listening for `fluid-music` recipes (`-f`). Recipes can then be sent from `fluid-music` client code.

For up-to-date info on all the possible commands, run `cybr -h`.

For detailed information about an option,  (ex `-f`) run `cybr -h -f`

```
cybr --driver=JACK               Select the audio driver
cybr --device=system             Choose input+output device (ex. USB Audio Interface)
cybr --device-out=system         Choose output device (ex. USB Audio Interface)
cybr -f|--fluid-server           Launch a server and listen for fluid engine OSC messages
cybr --scan-plugins              Scan for plugins, adding them to the settings file
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
cybr --print-length              Print the length in seconds of the active edit
cybr --print-config-filename     Print the complete settings filename.
cybr -p                          Play the active edit
cybr --list-io                   Print the engine's MIDI and Wave IO devices
cybr --list-edit-inputs          Print edit inputs (only print available inputs)
cybr --list-state                Print type of top level children in the edit
cybr --target-port=9999          Set OSC destination port
cybr --target-host=127.0.0.1     Set OSC Destination hostname
cybr --ping-osc[=100]            Repeatedly send a test osc message
cybr --jack-test                 check if jack audio is supported
cybr --print-block-size          Print audio block size
cybr --query-param=plugin,param  Query and print data points for a plugin parameter
cybr --preset-path[=./path|!]    Print/Add/Reset preset search path
cybr --sample-path[=./path|!]    Print/Add/Reset sample search path
cybr -h|--help [-i ...]          Print detailed info for subsequent arguments
```


## Development

Most work happens on the `develop` branch:

```
git clone https://github.com/CharlesHolbrow/cybr.git
cd cybr/server
git checkout develop
git submodule update --init --recursive
```
### Building for MacOS and Windows

**Add**

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
