/*
  ==============================================================================

    CLIApp.cpp
    Created: 3 May 2019 2:46:39pm
    Author:  Charles

  ==============================================================================
*/

#include "CliApp.h"

#define DRIVER_CLI_OPTION "--driver"
#define DEVICE_CLI_OPTION "--device"
#define OUT_DEVICE_CLI_OPTION "--device-out"

bool CLIApp::moreThanOneInstanceAllowed() { return true; }
void CLIApp::anotherInstanceStarted(const String&) {}
void CLIApp::suspended() {}
void CLIApp::resumed() {}
void CLIApp::systemRequestedQuit() { quit(); }

void CLIApp::unhandledException(const std::exception*, const String&, int)
{
    jassertfalse;
}

void CLIApp::initialise(const String& commandLine)
{
    te::DeviceManager& dm     = engine.getDeviceManager();
    ArgumentList argumentList = ArgumentList(getApplicationName(), getCommandLineParameterArray());

    // Before anything else, check if the user specified an audio driver.
    // Im using getValueForOption instead of removeValueForOption, because if
    // the option gets removed, then we can no longer access the detailed info
    // with `$ cybr -h --driver`
    String driverArgument = argumentList.getValueForOption(DRIVER_CLI_OPTION);
    if (driverArgument.isNotEmpty()) {
        // Annoyingly, setCurrentAudioDevice doesn’t do anything until the
        // private juce::AudioDeviceManager::scanDevicesIfNeeded() has been
        // called. We can circumvent the private call by calling
        // getAvailableDeviceTypes, which indirectly calls scanDevicesIfNeeded.
        // Here getAvailableDeviceTypes serves a dual purpose. We also use it to
        // check if the value (argument) is an available driver type.
        String driverName;
        for (auto d : dm.deviceManager.getAvailableDeviceTypes()) {
            if (d->getTypeName().equalsIgnoreCase(driverArgument)) {
                driverName = String(d->getTypeName());
            }
        }
        if (driverName.isNotEmpty()) {
            dm.deviceManager.setCurrentAudioDeviceType(driverName, false);
        } else {
            std::cout << "Invalid " << DRIVER_CLI_OPTION << " value. Driver not available: " << driverArgument << std::endl;
            quit();
            return;
        }
    }

    // By default the te::DeviceManager is initialised automatically. However we
    // disabled the default initialisation by pasing a custom EngineBehavior
    // to the te::Engine constructor, necessitating an explicit .initialise()
    // call. This enables us to configure a default audio device type before
    // tracktion engine and juce initialize access to the hardware.
    dm.initialise();

    // Now check if the user specified an audio device. This has to be done
    // after initialization, dm.devideManager.getCurrentDeviceTypeObject()
    // will return a null pointer.
    String deviceArgument = argumentList.getValueForOption(DEVICE_CLI_OPTION);
    String outDeviceArgument = argumentList.getValueForOption(OUT_DEVICE_CLI_OPTION);
    if (deviceArgument.isNotEmpty() || outDeviceArgument.isNotEmpty()) {
        AudioIODeviceType* driver = dm.deviceManager.getCurrentDeviceTypeObject();
        if (!driver) {
            std::cout << "Failed to set device. No audio driver active" << std::endl;
            quit();
            return;
        }

        String outDeviceName;
        String inDeviceName;
        for (auto checkDeviceName : driver->getDeviceNames()) {
            if (deviceArgument.isNotEmpty()) {
                if (checkDeviceName.equalsIgnoreCase(deviceArgument)) {
                    outDeviceName = checkDeviceName;
                    inDeviceName = checkDeviceName;
                }
            }
            if (outDeviceArgument.isNotEmpty()) {
                if (checkDeviceName.equalsIgnoreCase(outDeviceArgument)) {
                    outDeviceName = checkDeviceName;
                }
            }
        }

        if (outDeviceName.isEmpty()) {
            std::cout << "Fatal Error: Invalid "
                << (outDeviceArgument.isEmpty() ? DEVICE_CLI_OPTION : OUT_DEVICE_CLI_OPTION)
                << " value. Device not avilable for output: "
                << (outDeviceArgument.isEmpty() ? deviceArgument : outDeviceArgument) << std::endl;
            quit();
            return;
        } else if (inDeviceName.isEmpty() && deviceArgument.isNotEmpty()) {
            std::cout << "Fatal Error: Invalid " << DEVICE_CLI_OPTION
                << "value. Device not available for input: " << deviceArgument
                << std::endl;
        } else {
            auto setup = dm.deviceManager.getAudioDeviceSetup();
            setup.inputDeviceName = inDeviceName;
            setup.outputDeviceName = outDeviceName;

            // Charles: I don't know know why, but sometimes ALSA devices give a
            // "no channels" error originating from the following code:
            // https://github.com/juce-framework/JUCE/blob/a54da0b832681c8567a9b5046e423fce3195b19a/modules/juce_audio_devices/native/juce_linux_ALSA.cpp#L610
            //
            // This seems to have to do with pulseaudio. I was able to avoid the
            // error by suspending pulseaudio like this:
            // $ pasuspender -- ./cybr --device="my usb device" -f
            String error = dm.deviceManager.setAudioDeviceSetup(setup, false);
            if (error.isNotEmpty()) {
                std::cout << "Fatal Error when setting audio device: " << error << std::endl;
                quit();
                return;
            }
            std::cout << "Using Input Device:  \"" << (inDeviceName .isEmpty() ? "<none>" : inDeviceName) << "\"" << std::endl;
            std::cout << "Using Output Device: \"" << (outDeviceName.isEmpty() ? "<none>" : outDeviceName)  << "\"" << std::endl;
        }
    }

    engine.getPluginManager().createBuiltInType<OpenFrameworksPlugin>();
    appJobs.addChangeListener(this);
    MessageManager::getInstance()->callAsync([this, argumentList] { onRunning(argumentList); });
}

void CLIApp::shutdown()
{
    // Gurantee that changes to the settings file will be written to disk.
    // Careful, dispatch may only be called from the main message thread.
    engine.getPluginManager().knownPluginList.dispatchPendingMessages();
    // I'm calling dispatchPendingMessages on the application settings too, in
    // hopes that this will guarantee that changes to the project manager
    // manager info will be saved (for example, when using
    // --autodetect-pm). A very Cursory test suggests that this is not
    // needed; the Project Manager settings will be saved anyway. I'm not %100
    // sure that this is the right way to do it, but for now I'm leaving it in.
    te::getApplicationSettings()->dispatchPendingMessages();
}

const String CLIApp::getApplicationName()
{
    return "cybr";
}

const String CLIApp::getApplicationVersion()
{
    return "0.1.0";
}



void CLIApp::onRunning(ArgumentList argumentList)
{
    ConsoleApplication cApp;

    cApp.addCommand({
        DRIVER_CLI_OPTION,
        DRIVER_CLI_OPTION + String("=JACK"),
        "Select the audio driver",
        "Select a non-default driver. ALSA or JACK on Linux. ASIO or DirectSound\n\
        on Windows. Use --list-io to see which drivers are available. This\n\
        command is not useful in MacOS were only CoreAudio is available.",
        [](auto&){ return; } // --driver is handled in initialise. Use noop
    });

    cApp.addCommand({
        DEVICE_CLI_OPTION,
        DEVICE_CLI_OPTION + String("=system"),
        "Choose input+output device (ex. USB Audio Interface)",
        "Use --list-io to see avaiable device names (nested under drivers). Conbine\n\
        with the --device-out flag to choose different input/output devices. Note that\n\
        all devices must support their selected IO mode. For example, you cannot choose\n\
        a headphone device as an input device (unless that device has a microphone, or\n\
        otherwise supports audio input channels.",
        [](auto&){ return; } // --device is handled in initialise. Use noop
    });
    
    cApp.addCommand({
        OUT_DEVICE_CLI_OPTION,
        OUT_DEVICE_CLI_OPTION + String("=system"),
        "Choose output device (ex. USB Audio Interface)",
        "Use --list-io to see avaiable device names (nested under drivers). The chosen\n\
        deivce must support audio output (i.e. not a USB microphone).",
        [](auto&){ return; } // --device-out is handled in initialise. Use noop
    });

    cApp.addCommand({
        "-f|--fluid-server",
        "-f|--fluid-server",
        "Launch a server and listen for fluid engine OSC messages",
        "This runs a server that listens for OSC messages",
        [this](auto&) {
            appJobs.fluidIpcServer = std::make_unique<FluidIpcServer>(appJobs.fluidOscServer);
            if (!appJobs.fluidIpcServer->beginWaitingForSocket(options.listenPort)) {
                std::cout << "FluidIpcServer: Falied to connect" << std::endl;
                return false;
            }
            std::cout << "Listening for IPC Connections" << std::endl;

            if (!appJobs.fluidOscServer.connect(options.listenPort)) {
                std::cout << "FluidOscServer falied to connect" << std::endl;
                return false;
            }

            appJobs.setRunForever(true);
            std::cout << "Listening for UDP Connections" << std::endl;
            if (cybrEdit) {
                CybrEdit* newCybrEdit = copyCybrEditForPlayback(*cybrEdit);
                appJobs.fluidOscServer.activeCybrEdit.reset(newCybrEdit);
                std::cout << "FluidOscServer activated cybr edit from CLI input" << std::endl;
            }
            return true;
        } });

    cApp.addCommand({
        "--scan-plugins",
        "--scan-plugins", // this is printed by -h
        "Scan for plugins, adding them to the settings file", // printed by -h
        "Searches the default plugin paths, and saves results in the persistent\n\
        application properties file. Once plugins are saved in the file, you\n\
        should not need to scan again unless you install more plugins.",
        [this](auto&) {
            scanVst2(engine);
            scanVst3(engine);
        } });

    cApp.addCommand({
        "-a|--autodetect-pm",
        "-a|--autodetect-pm",
        "Add Tracktion Waveform project manager to the settings file",
        "This is useful if you want to load .tracktionedit files that were\n\
        saved in Waveform. These edits refer to audio clips with an id, not a\n\
        filepath. To load them you need to import project manager settings.\n\
        You should only need to run this once every time you create a new\n\
        Tracktion Waveform project, and the results will be saved in cybr's\n\
        configuration file. It will only work on a machine that also has\n\
        Tracktion Waveform installed.",
        [this](auto&) { autodetectPmSettings(engine); }
        });

    cApp.addCommand({
        "--list-plugins",
        "--list-plugins",
        "List available plugins",
        "Lists available plugins. This includes built-in plugins, and those\n\
        saved in the settings file. Run this after --scan-plugins to see\n\
        which plugins were found. For external plugins, the plugin type\n\
        (ex. VST/VST3/AU) is also output even though it is not part of the\n\
        plugin's name.",
        [this](auto&) { listPlugins(engine); }
        });

    cApp.addCommand({
        "--list-plugin-params",
        "--list-plugin-params=name",
        "List all the automatable parameters in the given plugin",
        "Given a for a plugin, print a list of all automatable parameters\n\
        To see a list of available plugins, use the --list-plugins option.\n\
        NOTE: --list-plugins may output the type as well as the name. The\n\
        type should not be included in the argument value for this argument.\n\
        \n\
        IMPORTANT: For internal plugins, the plugin name is case sensitive.\n\
        for external plugins (VST/VST3/AudioUnit) the name is case insensitive.",
        [this](const ArgumentList& args) {
            String pluginName = args.getValueForOption("--list-plugin-params");
            if (pluginName.isEmpty()) {
                std::cout << "--list-plugin-params requires a plugin name";
                return;
            }
            listPluginParameters(engine, pluginName);
        }});

    cApp.addCommand({
        "--list-plugin-presets",
        "--list-plugin-presets=name",
        "Print all presets (programs) for a named plugin",
        "Print all presets (programs) for a named plugin\n\
        IMPORTANT: For internal plugins, the plugin name is case sensitive.\n\
        for external plugins (VST/VST3/AudioUnit) the name is case insensitive.",
        [this](const ArgumentList& args) {
            String pluginName = args.getValueForOption("--list-plugin-presets");
            if (pluginName.isEmpty()) {
                std::cout << "--list-plugin-programs requires a plugin name";
                return;
            }
            listPluginPresets(engine, pluginName);
        }});

    cApp.addCommand({
        "--list-projects",
        "--list-projects",
        "List all the projects from the project manager",
        "Edit files saved in Waveform may include references to projects from\n\
        the Waveform project manager. Print a list of all the projects found.\n\
        If the list is empty, Waveform may not be installed, or you may need\n\
        run with the --autodetect-pm option.",
        [this](auto&) { listProjects(engine); }
        });

    cApp.addCommand({
        "-i",
        "-i file.tracktionedit",
        "Load the specified .tracktionedit file",
        "Command line options that follow will operate on the specified input\n\
        file. Note that the order of arguments matters.",
        [this](const ArgumentList& args) {
            auto inputFile = args.getExistingFileForOption("-i");
            cybrEdit = std::make_unique<CybrEdit>(createEdit(inputFile, engine));
        }});

    cApp.addCommand({
        "-o",
        "-o out.tracktionedit",
        "Save/render the active edit to a .tracktionedit or .wav",
        "Save as file. The output format will be detected from the filename.\n\
        If no argument is specified, use \"./default-out.tracktionedit\"",
        [this](const ArgumentList& args) {
            // Create an output file
            // if no output filename is specified, use this default filename
            auto outputFilename = args.getValueForOption("-o");
            if (outputFilename == "") outputFilename = "default-out.tracktionedit";
            auto outputFile = File::getCurrentWorkingDirectory().getChildFile(outputFilename);
            if (cybrEdit) cybrEdit->saveActiveEdit(outputFile);
        }});

    cApp.addCommand({
        "--list-clips",
        "--list-clips",
        "Print a list of the clips in the active Edit",
        "The output includes the name of the parent track, and source property",
        [this](auto&) {
            if (cybrEdit) cybrEdit->listClips();
        } });

    cApp.addCommand({
        "--list-tracks",
        "--list-tracks",
        "Print a list of tracks in the active Edit",
        "Output includes type of track",
        [this](auto&) {
            if (cybrEdit) cybrEdit->listTracks();
        } });

    cApp.addCommand({
        "-e|--empty",
        "-e|--empty[=editfile]",
        "Activate an empty edit with optional .tracktionedit file",
        "Edits need a tracktionedit file or they cannot save. This file does\n\
        need to exist, but it does need to be specified. I'm not sure that the\n\
        location of the file affects anything, because when saving an edit,\n\
        source paths are updated based on the new file location.",
        [this](const ArgumentList& args) {
            auto filename = args.getValueForOption("-e");
            if (filename == "") filename = "default.tracktionedit";
            File file = File::getCurrentWorkingDirectory().getChildFile(filename);
            cybrEdit = std::make_unique<CybrEdit>(createEmptyEdit(file, engine));
        } });

    cApp.addCommand({
        "-j",
        "-j",
        "Experimental custom plugin. WORK-IN-PROGRESS",
        "Just used for testing (for now) - This applies a custom plugin, which\n\
        is the recomended way to insert audio processing into an edit.",
        [this](auto&) {
            if (cybrEdit) cybrEdit->junk();
        } });

    cApp.addCommand({
        "--print-length",
        "--print-length",
        "Print the length in seconds of the active edit",
        "No-op if there is no active edit.",
        [this](auto&) {
            if (!cybrEdit) return;
            std::cout << "Edit Length: " << cybrEdit->getEdit().getLength() << " seconds" << std::endl << std::endl;
        } });

    cApp.addCommand({
        "--print-config-filename",
        "--print-config-filename",
        "Print the complete settings filename.",
        "Print the complete path and filename of the settings file",
        [](const ArgumentList&) {
            std::cout << te::getApplicationSettings()->getFile().getFullPathName() << std::endl;
        } });

    cApp.addCommand({
        "-p",
        "-p",
        "Play the active edit",
        "no-op if there is no active edit.",
        [this](auto&) {
            if (!cybrEdit) {
                std::cerr << "Faild to play, because there is no active edit." << std::endl;
                return;
            }
            appJobs.play(*cybrEdit);
        } });

    cApp.addCommand({
        "-r",
        "-r",
        "Record OSC while playing the Edit. WORK-IN-PROGRESS",
        "Undocumented! TODO: doc",
        [this](auto&) {
             // Creating an OscInputDevice indirectly creates an OscInputDeviceInstance
             // if one is needed. Where does the input device instance get instantiated?
             // It happens from the `TransportControl::ensureContextAllocated` method,
             // which is called whenever we play the edit.
            auto result = createOscInputDevice(engine, OscInputDevice::name, options.listenPort);
            if (result.wasOk()){
                std::cout << "Created OscInputDevice: SUCCESS!" << std::endl;
            } else {
                std::cout << "Created OscInputDevice: FAILURE! " << result.getErrorMessage() << std::endl;
            };

            if (cybrEdit) {
                cybrEdit->getOrCreateCybrHostAudioTrack();
                appJobs.record(*cybrEdit);
            } else {
                std::cerr << "Failed to record osc, because there is no active CybrEdit" << std::endl << std::endl;
            }
        } });

    cApp.addCommand({
        "--list-io",
        "--list-io",
        "Print the engine's MIDI and Wave IO devices",
        "Output a list of devices from TracktionEngine's device manager and JUCE's\n\
        AudioDeviceManager.\n\
        \n\
        The TracktionEngine API includes several ways to refer to devices.\n\
        These are an abstraction layer over actual devices that is used in\n\
        tracktionedit files.\n\
          - dm.getInputDevice(int)    // Indexes wave then midi devices\n\
          - dm.getOutputDeviceAt(int) // Note inconsistent name\n\
          - dm.get[Wave|Midi][In|Out]Device(int)\n\
          - dm.findOutputDeviceWithName(String)\n\
          - dm.get[Midi|Wave][Input|Output]Device(int) // Index all devices\n\
        All these methods really do the same thing, which is iterate over the one\n\
        or more of four raw arrays for each of wave and MIDI input and output\n\
        devices. cybr commands that accept a device index argument by its index\n\
        should use this convention\n\
        \n\
        The JUCE API also has a lower level manager called AudioDeviceManager,\n\
        These represent audio devices such as a connected USB audio interface",
        [this](auto&) {
            listWaveDevices(engine);
            listMidiDevices(engine);
        } });

    cApp.addCommand({
        "--list-edit-inputs",
        "--list-edit-inputs",
        "Print edit inputs (only print available inputs)",
        "\
        Output a list of inputs from the edit. This is made to only print inputs that\n\
        are available in your current hardware. This command looks up all the inputs\n\
        that are available on your current hardware. For each of those input devices,\n\
        print its XML if that device is in the edit. Note that prints the state from\n\
        the information in the edit's ValueTree, as opposed to creating an\n\
        EditPlaybackContext and retrieving the input device instances.",
        [this](auto&) {
            if (cybrEdit) cybrEdit->listInputDevices();
        } });

    cApp.addCommand({
        "--list-state",
        "--list-state",
        "Print type of top level chilren in the edit",
        "Sometimes usefull for debugging. I originally wrote this to check if an\n\
        empty edit has a INPUTDEVICES element before it is even saved. (It does)",
        [this](auto&) {
            if (cybrEdit) cybrEdit->listState();
        } });

    cApp.addCommand({
        "--target-port",
        "--target-port=9999",
        "Set OSC destination port",
        "Set the destionation port for OSC. Valid only for subsequent args.\n\
        Default is 9999",
        [this](const ArgumentList& args) {
            String portStr = args.getValueForOption("--target-port");
            int portInt = portStr.getIntValue();
            if (portInt > 0) {
                options.targetPort = portInt;
                std::cout << "Target port set to " << portInt << std::endl;
            } else {
                std::cerr << "Invalid --target-port: " << portStr << std::endl;
            }
        } });

    cApp.addCommand({
        "--target-host",
        "--target-host=127.0.0.1",
        "Set OSC Destination hostname",
        "Sets the destination hostname for OSC. Valid only for subsequent args.\n\
        Default=127.0.0.1",
        [this](const ArgumentList& args) {
            String hostname = args.getValueForOption("--target-host");
            if (hostname.length() > 0) {
                options.targetHostname = hostname;
                std::cout << "Target Hostname set to: " << hostname << std::endl;
            } else {
                std::cerr << "Invalid --target-host: " << hostname << std::endl;
            }
        } });

    cApp.addCommand({
        "--ping-osc",
        "--ping-osc[=100]",
        "Repeatedly send a test osc message",
        "Sends '/test' OSC message with a single int argument. To specify the target\n\
        hostname and port, preceed this argument with --target-host and --target-port.\n\
        You may optionally specify a period in milliseconds. For example, to send\n\
        every 500 milliseconds, you would specify --ping-osc=500. This uses a\n\
        dedicated thread and a High Resolution Timer, and unlike sending from Max or\n\
        node.js it can send with quite high frequency, and quite low jitter. In a\n\
        cursory test it was sending every 1ms with with ~0.1ms jitter (as measured on\n\
        receieving end). The test was on a 2015 MacbookPro. Default=100",
        [this](const ArgumentList& args) {
            if (oscSource) {
                std::cout << "There is already an oscSource. Cannot start a seconds one" << std::endl;
                return;
            }
            int period = args.getValueForOption("--ping-osc").getIntValue();
            oscSource = std::make_unique<OscSource>(options.targetHostname,
                                                    options.targetPort,
                                                    period > 0 ? period : 100);
            appJobs.setRunForever(true);
        } });

    cApp.addCommand({
        "--jack-test",
        "--jack-test",
        "check if jack audio is supported",
        "check if jack audio I/O devices are supported.",
        [](const ArgumentList&) {
            std::unique_ptr<AudioIODeviceType> d(juce::AudioIODeviceType::createAudioIODeviceType_JACK());
            if (d) {
                std::cout << "JACK is available. Use --list-io to show available streams. Use --driver=jack to enable." << std::endl;
            } else {
                std::cout << "JACK is NOT available" << std::endl;
            }
        } });

    cApp.addCommand({
        "--print-block-size",
        "--print-block-size",
        "Print audio block size",
        "undocumented",
        [this](const ArgumentList& args) {
            std::cout << "Block Size: " << engine.getDeviceManager().getBlockSize() << std::endl;
        } });

    cApp.addCommand({
        "--query-param",
        "--query-param=plugin,param",
        "Query and print data points for a plugin parameter",
        "This is helpful for when reverse engineering plugin paramteter curves\n\
        while writing plugin adapters. Example:\n\
        ./cybr --query-param=helm,cutoff # list helm (plugin) cutoff (parameter)\n\
        IMPORTANT: For internal plugins, the plugin name is case sensitive.\n\
        for external plugins (VST/VST3/AudioUnit) the name is case insensitive.",
        [this](const ArgumentList& args) {
            String pluginAndParam = args.getValueForOption("--query-param");

            int delimiter = pluginAndParam.indexOf(",");
            String pluginName = pluginAndParam.substring(0, delimiter);
            String paramName = pluginAndParam.substring(delimiter+1);

            if (pluginAndParam.isEmpty()) {
                std::cout << "--query-param requires a plugin name" << std::endl;
                return;
            }
            queryPluginParamPoints(engine, pluginName, paramName);
        }});

    // App search paths
    File prefsDir = engine.getPropertyStorage().getAppPrefsFolder();

    // Preset search paths
    File cybrPresets = prefsDir.getChildFile(CYBR_PRESET);
    File tracktionPresets = getWaveformAppDir().getChildFile("Presets");
    cybrPresets.createDirectory();
    String presetSearchPaths =
        cybrPresets.getFullPathName() + ";"
        + tracktionPresets.getFullPathName();
    CybrSearchPath presetSearchPath(CYBR_PRESET);
    presetSearchPath.init(cApp, presetSearchPaths);

    // Samples search path
    File defaultSampleDir = prefsDir.getChildFile(CYBR_SAMPLE);
    defaultSampleDir.createDirectory();
    CybrSearchPath sampleSearchPath(CYBR_SAMPLE);
    sampleSearchPath.init(cApp, defaultSampleDir.getFullPathName());

    // Because of the while loop below, we must not use the "default command"
    // functionality built into the juce::ConsoleApplication class. If there is
    // a default command, cApp.findCommand will always return that command, even
    // when the supplied ArgumentList is empty, causing our while loop below to
    // repeat indefinitely.
    cApp.addCommand({
        "-h|--help",
        "-h|--help [-i ...]",
        "Print detailed info for subsequent arguments",
        "If there are no arguments after this one, print short description of all\n\
        arguemtns. If there are subsequent arguments, instead of executing/applying\n\
        them, show their detailed help string.",
        [this, &cApp](const ArgumentList& args) {
            options.helpModeFlag = true;
            if (args.size() == 1) {
                std::cout << std::endl
                    << "Usage information:" << std::endl
                    << "Some arguments accept a value. Long form arguments are specified with a '='" << std::endl
                    << "    cybr --empty=./somefile.tracktionedit" << std::endl
                    << "Short form argument values are specified by a space like this:" <<std::endl
                    << "    cybr -e ./somefile.tracktionedit" << std::endl
                    << std::endl
                    << "Below is a list of possible arguments. Argument order is significant." << std::endl
                    << "Use -h  --some-arg to get more info about an argument." << std::endl;
                // I believe args are only used to get the exe name (cybr), which
                // is used in the output.
                cApp.printCommandList(args);
            }
        } });
    // Instead of using the default command, add -h if the arg list is empty.
    if (argumentList.size() == 0) argumentList.arguments.add({ "-h" });

    // Check only the first argument in the ArgumentList. If that command
    // exists, either execute it, or print its detailed help info (depending
    // on the state of options.helpModeFlag. Remove it and its value (if any).
    while (auto command = cApp.findCommand(argumentList, true)) {
        if (options.helpModeFlag) {
            std::cout
                << command->argumentDescription << "\t" << command->shortDescription
                << std::endl
                << command->longDescription
                << std::endl << std::endl;
        } else {
            command->command(argumentList);
        }
        argumentList.removeValueForOption(command->commandOption);
    }

    // Inform user of malformed (unhandled) arguments
    for (auto arg : argumentList.arguments) {
        std::cerr << "ERROR: unhandled argument: " << arg.text << std::endl;
    }

    // If jobs were added to EditJobs, wait for them to finish
    quitIfReady();
}

START_JUCE_APPLICATION(CLIApp)
