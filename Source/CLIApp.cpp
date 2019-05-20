/*
  ==============================================================================

    CLIApp.cpp
    Created: 3 May 2019 2:46:39pm
    Author:  Charles

  ==============================================================================
*/

#include "CLIApp.h"

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
    MessageManager::getInstance()->callAsync([this] { onRunning(); });
}

void CLIApp::shutdown() 
{
    // Gurantee that changes to the settings file will be written to disk.
    // Careful, dispatch may only be called from the main message thread.
    engine.getPluginManager().knownPluginList.dispatchPendingMessages();

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

void CLIApp::ScanForPlugins()
{
    // Log all the stuff about the plugins
    std::cout << "Plugin Info..." << std::endl;

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

void CLIApp::ListPlugins()
{
    std::cout << "Known Plugins:" << std::endl;
    for (auto plugin : engine.getPluginManager().knownPluginList) {
        std::cout << plugin->pluginFormatName << " - " << plugin->name << " - " << plugin->fileOrIdentifier << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::ListProjects() {
    std::cout << "List Projects..." << std::endl;
    const auto& pm = te::ProjectManager::getInstance();
    std::cout << "Library Projects: " << std::endl;
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

void CLIApp::ListClips(te::Edit& edit) {
    std::cout << "List Clips..." << std::endl;
    // I believe "Clip" tracks may be Marker, Chord, or Audio tracks (and
    // possibly others). Audio Tracks may have midi clips
    for (auto track : te::getClipTracks(edit)) {
        for (auto clip : track->getClips()) {
            std::cout
                << track->getName() << " - "
                << clip->getName() << " - "
                << clip->typeToString(clip->type) << " - "
                << clip->getStartBeat() << " to " << clip->getEndBeat() << " - ";
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) {
                std::cout << "File: " << audioClip->getCurrentSourceFile().getFullPathName();
            }
            if (auto midiClip = dynamic_cast<te::MidiClip*>(clip)) {
                std::cout
                    << "Notes,CC: "
                    << midiClip->getSequence().getNumNotes() << ","
                    << midiClip->getSequence().getNumControllerEvents();
            } 
            std::cout << std::endl;
        }
    }
    std::cout << std::endl;
}

void CLIApp::ListTracks(te::Edit& edit) {
    std::cout << "List Tracks..." << std::endl;
    for (auto track : te::getAllTracks(edit))
    {
        // are these mutually exclusive?
        if (track->isAudioTrack()) std::cout << "Audio Track - ";
        if (track->isAutomationTrack()) std::cout << "Automation Track - ";
        if (track->isChordTrack()) std::cout << "Chord Track - ";
        if (track->isFolderTrack()) std::cout << "Folder Track - ";
        if (track->isMarkerTrack()) std::cout << "Marker Track - ";
        if (track->isTempoTrack()) std::cout << "Tempo Track - ";
        std::cout << track->getName() << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::onRunning()
{
    ArgumentList argumentList = ArgumentList(String{ "UNSPECIFIED" }, getCommandLineParameterArray());

    if (argumentList.containsOption("-s|--scan-plugins")) ScanForPlugins();
    if (argumentList.containsOption("--list-plugins")) ListPlugins();
    if (argumentList.containsOption("--list-projects")) ListProjects();

    // Create input edit.
    // If -i inputfile is specified, use that file
    // Else if "default.tracktionedit" exists in working dir, use that
    // Else create an empty edit
    ValueTree valueTree;
    File inputFile;
    if (argumentList.containsOption("-i")) {
        inputFile = argumentList.getExistingFileForOption("-i");
        valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl;
    }
    else
    {
        inputFile = File::getCurrentWorkingDirectory().getChildFile("default.tracktionedit");;
        if (inputFile.existsAsFile())
        {
            std::cout << "Loading default.tracktionedit" << std::endl;
            valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        }
        else
        {
            // Caution: edit will have no file specified.
            std::cout << "Creating an empty edit" << std::endl;
            valueTree = te::createEmptyEdit();
        }
    }

    // Create the edit object
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::LoadContext loadContext;
    std::unique_ptr<te::Edit> edit = std::make_unique<te::Edit>(engine,
        valueTree,
        te::Edit::forRendering,
        &loadContext,
        0);

    // List any missing plugins
    for (auto plugin : edit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }

    // Handle CLI args that deal with the edit
    if (argumentList.containsOption("--list-clips")) ListClips(*edit);
    if (argumentList.containsOption("--list-tracks")) ListTracks(*edit);

    // Render
    BigInteger tracksToDo;
    int trackIndex = 0;
    for (auto track : te::getAllTracks(*edit)) {
        tracksToDo.setBit(trackIndex++);
    }
    te::Renderer::renderToFile(
                               { "Chaz Render Job" },
                               { juce::File::getCurrentWorkingDirectory().getChildFile("out.wav") },
                               *edit,
                               { 0, 20 },
                               tracksToDo, true, {}, false);

    quit();
}

START_JUCE_APPLICATION(CLIApp)
