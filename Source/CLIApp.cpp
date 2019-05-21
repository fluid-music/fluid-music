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
    // I'm calling dispatchPendingMessages on the application settings too, in
    // hopes that this will guarantee that changes to the project manager
    // manager info will be saved (for example, when using 
    // --autodetect-pm-settings). Aver Cursory test suggests that this is not
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
                // to make the clip use a filename for the source, use
                //audioClip->getSourceFileReference().setToDirectFileReference(...);
                // to make the clip use a project reference, use
                 //audioClip->getSourceFileReference().setToProjectFileReference(...);
                std::cout << "Source: " << audioClip->getSourceFileReference().source;
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
    } else
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
    std::cout << "Failed to load Waveform settings from: " << file.getFullPathName() << std::endl << std::endl;
    return;
}

void CLIApp::setClipSourcesToDirectFileReferences(te::Edit& edit, bool useRelativePath)
{
    int failures = 0;
    std::cout << "Searching for clips with project sources, and setting them to direct file references" << std::endl;
    for (auto track : te::getClipTracks(edit)) { // for each track
        for (auto clip : track->getClips()) { // for each clip
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) { // if it is an audio clip
                auto& sourceFileRef = audioClip->getSourceFileReference();
                if (sourceFileRef.isUsingProjectReference()) { // and it uses a project reference
                    auto file = sourceFileRef.getFile(); // check if we can find the associated file
                    if (file == File()) {
                        // We failed to find the file for a for the project reference clip
                        jassert(false);
                        failures++;
                        std::cerr
                            << "ERROR: Failed to update source clip: " << audioClip->getName()
                            << " source=\"" << sourceFileRef.source << "\"" << std::endl;
                    }
                    else {
                        std::cout
                            << "Updating \"" << sourceFileRef.source
                            << "\" to \"" << file.getFullPathName() << "\"" << std::endl;
                        sourceFileRef.setToDirectFileReference(file, useRelativePath);
                        audioClip->sourceMediaChanged();
                    }
                }
            }
        }
    }
    if (failures > 0) {
        std::cerr
            << "ERROR: not all source clips were found!" << std::endl
            << "In my testing on windows, this happens when any of the following are true:" << std::endl
            << "- App is not aware of the project manager (try --autodetect-pm-settings)" << std::endl
            << "- The uid is not found by the project manager" << std::endl
            << "- The project manager was setup, but the file was not found" << std::endl;
    }
    std::cout << std::endl;
}

void CLIApp::onRunning()
{
    ArgumentList argumentList = ArgumentList(String{ "UNSPECIFIED" }, getCommandLineParameterArray());

    if (argumentList.containsOption("-s|--scan-plugins")) ScanForPlugins();
    if (argumentList.containsOption("--autodetect-pm-settings")) autodetectPmSettings();
    if (argumentList.containsOption("--list-plugins")) ListPlugins();
    if (argumentList.containsOption("--list-projects")) ListProjects();

    // Create a te::Edit object.
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
            // Caution: edit will not have a file specified.
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

    // Note we cannot save an edit file if TE cannot resolve the original file.
    edit->editFileRetriever = [inputFile] { return inputFile; };

    // List any missing plugins
    for (auto plugin : edit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }
    std::cout << std::endl; // Newline after empty space

    // Handle CLI args that deal with the edit
    if (argumentList.containsOption("--use-direct-refs")) setClipSourcesToDirectFileReferences(*edit, false);
    if (argumentList.containsOption("--list-clips")) ListClips(*edit);
    if (argumentList.containsOption("--list-tracks")) ListTracks(*edit);

    // If -o is specified save an output file
    if (argumentList.containsOption("-o")) {
        auto outputFilename = argumentList.getValueForOption("-o");
        // if no output filename is specified, use this default filename
        if (outputFilename == "") outputFilename = "default-output.tracktionedit"; 
        auto outputFile = File::getCurrentWorkingDirectory().getChildFile(outputFilename);
        auto outputExt = outputFile.getFileExtension().toLowerCase();

        if (outputExt == ".tracktionedit") // save an edit file
        {
            std::cout << "Saving: " << outputFile.getFullPathName() << std::endl;
            te::EditFileOperations(*edit).saveAs(outputFile, true);
        }
        else if (outputExt == ".wav") // save a .wav file
        {
            std::cout << "Save: " << outputFile.getFullPathName() << std::endl;
            // Render
            BigInteger tracksToDo;
            int trackIndex = 0;
            for (auto track : te::getAllTracks(*edit)) {
                tracksToDo.setBit(trackIndex++);
            }
            // This will not overwrite the existing file
            te::Renderer::renderToFile(
                { "Chaz Render Job" },
                outputFile,
                *edit,
                { 0, 20 },
                tracksToDo, true, {}, false);
        }
        else {
            std::cout
                << "Could not output file due to unknown extension: "
                << outputFile.getFullPathName()
                << std::endl;
        }
    }
    quit();
}

START_JUCE_APPLICATION(CLIApp)
