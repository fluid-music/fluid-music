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
    std::cout << "Failed to load Tracktion Waveform settings from: " << file.getFullPathName() << std::endl << std::endl;
    return;
}

void CLIApp::setClipSourcesToDirectFileReferences(te::Edit& edit, bool useRelativePath, bool verbose = true)
{
    int failures = 0;
    if (verbose) std::cout << "Searching for audio clips and updating their sources to "
        << (useRelativePath ? "relative" : "absolute")
        << " file paths" << std::endl;

    for (auto track : te::getClipTracks(edit)) { // for each track
        for (auto clip : track->getClips()) { // for each clip
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) { // if it is an audio clip
                auto& sourceFileRef = audioClip->getSourceFileReference();
                auto file = sourceFileRef.getFile();
                if (file == File()) {
                    // We failed to get the filepath from the project manager
                    failures++;
                    std::cerr
                        << "ERROR: Failed to find and update source clip: " << audioClip->getName()
                        << " source=\"" << sourceFileRef.source << "\"" << std::endl;
                }
                else {
                    // We have a filepath. We are not certain the file exists.
                    // Even if the file does not exists, we may be able to
                    // update the source property.
                    //
                    // TODO: What hapens if files have no common ancestor, and
                    // we are changing to relative paths???
                    //
                    // Note: setToDirectFileReference triggers a breakpoint if 
                    // the edit file is not found, and we are using a realtive
                    // path, but it will still set the relative path correctly.
                    String original = sourceFileRef.source;
                    sourceFileRef.setToDirectFileReference(file, useRelativePath);
                    if (original != sourceFileRef.source) {
                        audioClip->sourceMediaChanged();
                        if (verbose) std::cout
                            << "Updated \"" << original
                            << "\" to \"" << sourceFileRef.source << "\"" << std::endl;
                    }
                    else {
                        if (verbose) std::cout
                            << "Unchanged path: " << sourceFileRef.source << std::endl;
                    }
                }
            }
        }
    }
    if (failures > 0) {
        std::cerr
            << "ERROR: not all source clips could be identified!" << std::endl
            << "In my testing on windows, this happens when any of the following are true:" << std::endl
            << "- App is not aware of the project manager (try --autodetect-pm-settings)" << std::endl
            << "- The uid is not found by the project manager" << std::endl;
    }
    if (verbose) std::cout << std::endl;
}

void CLIApp::onRunning()
{
    ArgumentList argumentList = ArgumentList(String{ "UNSPECIFIED" }, getCommandLineParameterArray());

    if (argumentList.containsOption("-s|--scan-plugins")) ScanForPlugins();
    if (argumentList.containsOption("-a|--autodetect-pm-settings")) autodetectPmSettings();
    if (argumentList.containsOption("--list-plugins")) ListPlugins();
    if (argumentList.containsOption("--list-projects")) ListProjects();

    // Create an inputFile and a te::Edit object.
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
    else {
        inputFile = File::getCurrentWorkingDirectory().getChildFile("default.tracktionedit");;
        if (inputFile.existsAsFile()) {
            std::cout << "Loading default.tracktionedit" << std::endl;
            valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        }
        else {
            std::cout << "Creating an empty edit" << std::endl;
            valueTree = te::createEmptyEdit();
        }
    }

    // Create the edit object.
    // Note we cannot save an edit file without and ediit file retriever. It is
    // also used resolves audioclips that have source='./any/relative/path.wav'.
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = valueTree;
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    
    std::cout << "Creating Edit Object" << std::endl;
    std::unique_ptr<te::Edit> edit = std::make_unique<te::Edit>(editOptions);
    setClipSourcesToDirectFileReferences(*edit, false, true); // absolute

    // List any missing plugins
    for (auto plugin : edit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }
    std::cout << std::endl;

    // Handle CLI args that deal with the edit
    if (argumentList.containsOption("--make-sources-absolute")) setClipSourcesToDirectFileReferences(*edit, false);
    if (argumentList.containsOption("--make-sources-relative")) setClipSourcesToDirectFileReferences(*edit, true);
    if (argumentList.containsOption("--list-clips")) ListClips(*edit);
    if (argumentList.containsOption("--list-tracks")) ListTracks(*edit);

    // If -o is specified save an output file
    if (argumentList.containsOption("-o")) {
        // Create an output file
        // if no output filename is specified, use this default filename
        auto outputFilename = argumentList.getValueForOption("-o");
        if (outputFilename == "") outputFilename = "default-output.tracktionedit";
        auto outputFile = File::getCurrentWorkingDirectory().getChildFile(outputFilename);
        auto outputExt = outputFile.getFileExtension().toLowerCase(); // resolve relative if needed

        if (outputExt == ".tracktionedit") {
            // Save a .tracktionedit file.
            std::cout << "Saving: " << outputFile.getFullPathName() << std::endl;
            // When edit files are saved, prefer relative paths. 
            edit->editFileRetriever = [outputFile] { return outputFile; };
            setClipSourcesToDirectFileReferences(*edit, true, true);
            // .save and .saveAs may be silent no-ops unless we markAsChanged()
            edit->markAsChanged();
            te::EditFileOperations(*edit).saveAs(outputFile, true);
        }
        else if (outputExt == ".wav") {
            // Render a .wav file
            std::cout << "Save: " << outputFile.getFullPathName() << std::endl;
            BigInteger tracksToDo;
            int trackIndex = 0;
            for (auto track : te::getAllTracks(*edit)) {
                tracksToDo.setBit(trackIndex++);
            }
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
