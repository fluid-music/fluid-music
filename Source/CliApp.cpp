/*
  ==============================================================================

    CLIApp.cpp
    Created: 3 May 2019 2:46:39pm
    Author:  Charles

  ==============================================================================
*/

#include "CliApp.h"

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
    engine.getPluginManager().createBuiltInType<OpenFrameworksPlugin>();
    appJobs.addChangeListener(this);
    MessageManager::getInstance()->callAsync([this] { onRunning(); });
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

    std::cout << "Shutdown!" << std::endl << std::endl;
}

const String CLIApp::getApplicationName() 
{
    return "Cybernetic Production";
}

const String CLIApp::getApplicationVersion() 
{
    return "0.0.1";
}

void CLIApp::autodetectPmSettings()
{
    auto appPrefsDir =  File::getSpecialLocation(File::userApplicationDataDirectory);
#ifdef JUCE_MAC
    auto osxSubfolder = appPrefsDir.getChildFile("Application Support");
    if (osxSubfolder.isDirectory()) appPrefsDir = osxSubfolder;
#endif
    auto file = appPrefsDir
        .getChildFile("Tracktion")
        .getChildFile("Waveform")
        .getChildFile("Waveform.settings");

    std::cout << "Looking for Waveform settings: " << file.getFullPathName() << std::endl;
    if (!file.existsAsFile())
    {
        std::cout << "Waveform settings not found" << std::endl;
    }
    else
    {
        std::cout << "Found Waveform settings" << std::endl;
        XmlDocument parser(file);
        std::unique_ptr<XmlElement> xml(parser.getDocumentElement());
        if (xml == nullptr) std::cout << "Failed to parse Waveform.settings" << std::endl;
        
        ValueTree folders;
        folders = ValueTree::fromXml(*xml);
        if (folders.isValid())
        {
            folders = folders.getChildWithProperty(te::IDs::name, "projectList");
            if (folders.isValid())
            {
                folders = folders.getChildWithName(te::IDs::ROOT);
                if (folders.isValid())
                {
                    // folders is the element that contains the following two children
                    // - te::IDs::LIBRARY
                    // - te::IDs::ACTIVE
                    te::ProjectManager::getInstance()->folders = folders;
                    std::cout
                        << "LIBRARY uid: " << folders.getChildWithName(te::IDs::LIBRARY).getProperty("uid").toString() << std::endl
                        << "ACTIVE uid:  " << folders.getChildWithName(te::IDs::ACTIVE).getProperty("uid").toString() << std::endl
                        << std::endl;
                    return;
                }
            }
        }
    }
    std::cout << "Failed to load Tracktion Waveform settings from: " << file.getFullPathName() << std::endl << std::endl;
    return;
}

void CLIApp::listWaveDevices() {
    std::cout << "Wave Input Devices:" << std::endl;
    auto& dm = engine.getDeviceManager();
    for (int i = 0; i < dm.getNumWaveInDevices(); i++) {
        auto d = dm.getWaveInDevice(i);
        std::cout << i << ". "
        << d->getName() << " - " << d->getAlias()
        << (d->isEnabled() ? "" : " (disabled)") << std::endl;
    }
    std::cout << std::endl;

    std::cout << "Wav Output Devices:" << std::endl;
    for (int i = 0; i < dm.getNumWaveOutDevices(); i++) {
        auto d = dm.getWaveOutDevice(i);
        std::cout << i << ". "
        << d->getName() << " - " << d->getAlias()
        << (d->isEnabled() ? "" : " (disabled)") << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::listMidiDevices() {
    std::cout << "MIDI Input Devices:" << std::endl;
    auto& dm = engine.getDeviceManager();
    for (int i = 0; i < dm.getNumMidiInDevices(); i++) {
        auto d = dm.getMidiInDevice(i);
        std::cout << i << ". "
            << d->getName() << " - " << d->getAlias()
            << (d->isEnabled() ? "" : " (disabled)") << std::endl;
    }
    std::cout << std::endl;

    std::cout << "MIDI Output Devices:" << std::endl;
    for (int i = 0; i < dm.getNumMidiOutDevices(); i++) {
        auto d = dm.getMidiOutDevice(i);
        std::cout << i << ". "
            << d->getName() << " - " << d->getAlias()
            << (d->isEnabled() ? "" : " (disabled)") << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::scanVst3()
{
    std::cout << "Scanning for VST3 plugins..." << std::endl;
    
    juce::VST3PluginFormat vst3;
    juce::String deadPlugins;
    juce::PluginDirectoryScanner pluginScanner{
        engine.getPluginManager().knownPluginList,
        vst3,
        vst3.getDefaultLocationsToSearch(),
        true,
        deadPlugins
    };
    
    juce::String pluginName;
    do {
        std::cout << "Scanning: \"" << pluginScanner.getNextPluginFileThatWillBeScanned() << "\"" << std::endl;
    } while (pluginScanner.scanNextFile(true, pluginName));
    
    // log failures
    std::cout << "Dead Plugins: " << deadPlugins << std::endl << std::endl;
    for (auto filename : pluginScanner.getFailedFiles()) {
        std::cout << "Failed to load plugin: " << filename << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::scanVst2() {
#if JUCE_PLUGINHOST_VST
    juce::VSTPluginFormat vst2;
    std::cout << "Scanning for VST2 plugins in: " << vst2.getDefaultLocationsToSearch().toString() << std::endl;
    
    juce::String deadPlugins;
    juce::PluginDirectoryScanner pluginScanner{
        engine.getPluginManager().knownPluginList,
        vst2,
        vst2.getDefaultLocationsToSearch(),
        true,
        deadPlugins
    };
    
    juce::String pluginName;
    do {
        std::cout << "Scanning: \"" << pluginScanner.getNextPluginFileThatWillBeScanned() << "\"" << std::endl;
    } while (pluginScanner.scanNextFile(true, pluginName));
    
    // log failures
    std::cout << "Dead Plugins: " << deadPlugins << std::endl << std::endl;
    for (auto filename : pluginScanner.getFailedFiles()) {
        std::cout << "Failed to load plugin: " << filename << std::endl;
    }
    std::cout << std::endl;
#else
    std::cout << "VST 2 hosting is not enabled in the projucer project. Skipping VST 2 scan." << std::endl;
    return;
#endif
}

void CLIApp::listPlugins()
{
    std::cout << "Known Plugins:" << std::endl;
    for (auto plugin : engine.getPluginManager().knownPluginList) {
        std::cout << plugin->pluginFormatName << " - " << plugin->name << " - " << plugin->fileOrIdentifier << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::listProjects() {
    std::cout << "List Projects..." << std::endl;
    const auto& pm = te::ProjectManager::getInstance();
    for (auto project : pm->getAllProjects(pm->getLibraryProjectsFolder()))
    {
        std::cout << project->getName() << " - " << project->getProjectFile().getFullPathName() << std::endl;
    }
    std::cout << "Active Projects: " << std::endl;
    for (auto project : pm->getAllProjects(pm->getActiveProjectsFolder()))
    {
        std::cout << project->getName() << " - " << project->getProjectFile().getFullPathName() << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::onRunning()
{
    ArgumentList argumentList = ArgumentList(String{ "cybr" }, getCommandLineParameterArray());
    ConsoleApplication cApp;

    cApp.addCommand({
        "-s|--scan-plugins",
        "-s|--scan-plugins", // this is printed by -h
        "Scan for plugins, adding them to the settings file", // printed by -h
        "Searches the default plugin paths, and saves results in the persistent\n\
        application properties file. Once plugins are saved in the file, you\n\
        should not need to scan again unless you install more plugins.",
        [this](auto&) {
            scanVst2();
            scanVst3();
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
        [this](auto&) { autodetectPmSettings(); }
        });

    cApp.addCommand({
        "--list-plugins",
        "--list-plugins",
        "List all the plugins that are registered in the settings file",
        "Lists all detected plugins. Run this after --scan-plugins.",
        [this](auto&) { listPlugins(); }
        });

    cApp.addCommand({
        "--list-projects",
        "--list-projects",
        "List all the projects from the project manager",
        "Edit files saved in Waveform may include references to projects from\n\
        the Waveform project manager. Print a list of all the projects found.\n\
        If the list is empty, Waveform may not be installed, or you may need run\n\
        with the --autodetect-pm option.",
        [this](auto&) { listProjects(); }
        });

    cApp.addCommand({
        "-i",
        "-i file.tracktionedit",
        "Load the specified .tracktionedit file",
        "Command line options that follow will operate on the specified input\n\
        file. Note that the order of arguments matters.",
        [this](const ArgumentList& args) {
            auto inputFile = args.getExistingFileForOption("-i");
            cybrEdit = std::make_unique<CybrEdit>(loadEditFile(inputFile, engine));
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
        "-e|--empty [editfile]",
        "Activate an empty edit with optional .tracktionedit file",
        "Edits need a tracktionedit file or they cannot save. This file does\n\
        need to exist, but it does need to be specified. I'm not sure that the\n\
        location of the file affects anything, because when saving an edit,\n\
        source paths are updated based on the new file location.",
        [this](const ArgumentList& args) {
            auto filename = args.getValueForOption("-e");
            if (filename == "") filename = "default.tracktionedit";
            File file = File::getCurrentWorkingDirectory().getChildFile(filename);
            cybrEdit = std::make_unique<CybrEdit>(activateEmptyEdit(file, engine));
        } });

    cApp.addCommand({
        "-j",
        "-j",
        "Experimental command. WORK-IN-PROGRESS",
        "Just used for testing (for now)",
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
            std::cout << "Edit Length: " << cybrEdit->edit->getLength() << " seconds" << std::endl << std::endl;
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
            appJobs.play(*(cybrEdit->edit));
        } });
    
    cApp.addCommand({
        "-r",
        "-r",
        "Setup OSC Recording. Use before calling -p. WORK-IN-PROGRESS",
        "Undocumented! TODO: doc",
        [this](auto&) {
            if (cybrEdit) cybrEdit->recordOsc();
            else std::cerr << "Failed to record osc, because there is no active CybrEdit" << std::endl << std::endl;
        } });

    cApp.addCommand({
        "--list-io",
        "--list-io",
        "Print the engine's MIDI and Wave IO devices",
        "Output a list of devices from TracktionEngine's device manager. The device\n\
        manager API includes many ways to refer to devices.\n\
        - dm.getInputDevice(int)    // Indexes wave then midi devices\n\
        - dm.getOutputDeviceAt(int) // Note inconsistent name\n\
        - dm.get[Wave|Midi][In|Out]Device(int)\n\
        - dm.findOutputDeviceWithName(String)\n\
        - dm.get[Midi|Wave][Input|Output]Device(int) // Index all devices\n\
        All the methods really do the same thing, which is iterate over the one or\n\
        more of four raw arrays for each of wave and MIDI input and output devices.\n\
        cybr commands that accept a device index argument by its index should use\n\
        this convention",
        [this](auto&) {
            listMidiDevices();
            listWaveDevices();
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

    // Because of the while loop below, we must not use the "default command"
    // functionality built into the juce::ConsoleApplication class. If there is
    // a default command, cApp.findCommand will always return that command, even
    // when the supplied ArgumentList is empty, causing our while loop below to
    // repeat indefinitely.
    cApp.addCommand({
        "-h|--help",
        "-h|--help --list-io",
        "Print detailed info for subsequent arguments",
        "If there are no arguments after this one, print short description of all\n\
        arguemtns. If there are subsequent arguments, instead of executing/applying\n\
        them, show their detailed help string.",
        [this, &cApp](const ArgumentList& args) {
            options.helpModeFlag = true;
            if (args.size() == 1) {
                std::cout << std::endl
                    << "Usage information..." << std::endl
                    << "Some arguments accept a value. Long form arguments are specified with a '='" << std::endl
                    << "    cybr --empty=./somefile.tracktionedit" << std::endl
                    << "Short form argument values are specified by a space like this:" <<std::endl
                    << "    cybr -e ./somefile.tracktionedit" << std::endl
                    << "Below is a list of possible arguments. Argument order is significant." << std::endl;
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
