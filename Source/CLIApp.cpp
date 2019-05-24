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
    // --autodetect-pm). Aver Cursory test suggests that this is not
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

void CLIApp::ListClips() {
    std::cout << "List Clips..." << std::endl;
    // I believe "Clip" tracks may be Marker, Chord, or Audio tracks (and
    // possibly others). Audio Tracks may have midi clips
    for (auto track : te::getClipTracks(*edit)) {
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

void CLIApp::ListTracks() {
    std::cout << "List Tracks..." << std::endl;
    for (auto track : te::getAllTracks(*edit))
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

void CLIApp::activateEmptyEdit(File inputFile)
{
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = te::createEmptyEdit();
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    edit = std::move(std::make_unique<te::Edit>(editOptions));
}

void CLIApp::loadEditFile(File inputFile) {
    // we are assuming the file exists. 
    ValueTree valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));

    // Create the edit object.
    // Note we cannot save an edit file without and ediit file retriever. It is
    // also used resolves audioclips that have source='./any/relative/path.wav'.
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = valueTree;
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    std::unique_ptr<te::Edit> newEdit = std::make_unique<te::Edit>(editOptions);

    // By default (and for simplicity), all clips in an in-memory edit should
    // have a source property with an absolute path value. We want to avoid
    // clip sources with project ids or relative path values.
    setClipSourcesToDirectFileReferences(*newEdit, false, true);

    // List any missing plugins
    for (auto plugin : newEdit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }
    edit = std::move(newEdit);
    std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl;
    std::cout << std::endl;
}

void CLIApp::saveActiveEdit(File outputFile) {
    if (!edit) {
        std::cerr
            << "ERROR: Output failed. No edit file loaded."
            << std::endl << std::endl;
        return;
    }
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

void CLIApp::setClipSourcesToDirectFileReferences(te::Edit& changeEdit, bool useRelativePath, bool verbose = true)
{
    int failures = 0;
    if (verbose) std::cout << "Searching for audio clips and updating their sources to "
        << (useRelativePath ? "relative" : "absolute")
        << " file paths" << std::endl;

    for (auto track : te::getClipTracks(changeEdit)) { // for each track
        for (auto clip : track->getClips()) { // inspect each clip
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
                        audioClip->sourceMediaChanged(); // what does this really do, and is it needed?
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
            << "- App is not aware of the project manager (try --autodetect-pm)" << std::endl
            << "- The uid is not found by the project manager" << std::endl;
    }
    if (verbose) std::cout << std::endl;
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
        [this](auto&) { ScanForPlugins(); } });

    cApp.addCommand({
        "-a|--autodetect-pm",
        "-a|--autodetect-pm",
        "Add Tracktion Waveform project manager to the settings file",
        "This is useful if you want to load .tracktionedit files that were\n\
        saved in Waveform. These edits refer to audio clips with an id, not a\n\
        filepath. To load them you need to import project manager settings.\n\
        You should only need to run this once. It will only work on a machine\n\
        that also has Tracktion Waveform installed.",
        [this](auto&) { autodetectPmSettings(); }
        });

    cApp.addCommand({
        "--list-plugins",
        "--list-plugins",
        "List all the plugins that are registered in the settings file",
        "Lists all detected plugins. Run this after --scan-plugins.",
        [this](auto&) { ListPlugins(); }
        });

    cApp.addCommand({
        "--list-projects",
        "--list-projects",
        "List all the projects from the project manager.",
        "Edit files saved in Waveform may include references to projects from\n\
        the Waveform project manager. Print a list of all the projects found.\n\
        If the list is empty, Waveform may not be installed, or you may need run\n\
        with the --autodetect-pm option.",
        [this](auto&) { ListProjects(); }
        });

    cApp.addCommand({
        "-i",
        "-i file.tracktionedit",
        "Load the specified .tracktionedit file",
        "Command line options that follow will operate on the specified input\n\
        file. Note that the order of arguments matters.",
        [this](const ArgumentList& args) {
            auto inputFile = args.getExistingFileForOption("-i");
            loadEditFile(inputFile);
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
            saveActiveEdit(outputFile);
        }});

    cApp.addCommand({
        "--list-clips",
        "--list-clips",
        "Print a list of the clips in the active edit",
        "The output includes the name of the parent track, and source property",
        [this](auto&) {
            ListClips();
        } });

    cApp.addCommand({
        "--list-tracks",
        "--list-tracks",
        "Print a list of tracks in the active Edit",
        "Output includes type of track",
        [this](auto&) {
            ListTracks();
        } });

    cApp.addCommand({
        "-e",
        "-e|--empty [editfile]",
        "Activate an empty edit with optional .tracktionedit file",
        "Edits need a tracktionedit file or they cannot save. This file does\n\
        need to exist, but it does need to be specified. I'm not sure that the\n\
        location of the file affects anything, because when saving an edit,\n\
        source paths are updated based on the new file location.",
        [this](const ArgumentList& args) {
            auto filename = args.getValueForOption("-e");
            if (filename == "") filename = "default.tracktionedit";
            activateEmptyEdit(File::getCurrentWorkingDirectory().getChildFile(filename));
        } });

    // Because of the while loop below, we must not create a default command.
    // Instead of using the default command, add -h if the arg list is empty.
    cApp.addHelpCommand("-h|--help", "Usage:", false);
    if (argumentList.size() == 0) argumentList.arguments.add({ "-h" });

    // Search the provided argumentList for commands registered. When a command is found, 
    while (auto command = cApp.findCommand(argumentList, true)) {
        command->command(argumentList);
        argumentList.removeValueForOption(command->commandOption);
    }

    // Inform user of malformed arguments
    for (auto arg : argumentList.arguments) {
        std::cerr << "ERROR: invalid argument: " << arg.text << std::endl;
    }

    MessageManager::getInstance()->callAsync(quit);
}

START_JUCE_APPLICATION(CLIApp)
