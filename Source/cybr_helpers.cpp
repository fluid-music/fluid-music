/*
  ==============================================================================

    cybr_helpers.cpp
    Created: 18 Jun 2019 5:52:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "cybr_helpers.h"

// Creates a new edit, and leaves deletion up to you
te::Edit* createEmptyEdit(File inputFile, te::Engine& engine)
{
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = te::createEmptyEdit();
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    return new te::Edit(editOptions);
}

// Creates a new edit, and leaves deletion up to you
te::Edit* createEdit(File inputFile, te::Engine& engine) {
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
    te::Edit* newEdit = new te::Edit(editOptions);
    
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
    std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl << std::endl;
    return newEdit;
}

CybrEdit* copyCybrEditForPlayback(CybrEdit& cybrEdit) {
    te::Edit& edit = cybrEdit.getEdit();
    te::Edit::Options options{ edit.engine };
    options.editState = edit.state.createCopy();
    options.role = te::Edit::EditRole::forEditing;
    options.editProjectItemID = te::ProjectItemID::createNewID(0);
    options.numUndoLevelsToStore = 0;
    options.editFileRetriever = [] {
        return File::getCurrentWorkingDirectory().getChildFile("temp.tracktionedit");
    };
    // CybrEdit takes responsibility for deleting the Edit (via unique_ptr)
    te::Edit* newEdit = new te::Edit(options);
    newEdit->initialiseAllPlugins();
    newEdit->getTransport().position = 0;
    CybrEdit* newCybrEdit = new CybrEdit(newEdit);
    return newCybrEdit;
}

void setClipSourcesToDirectFileReferences(te::Edit& changeEdit, bool useRelativePath, bool verbose = true)
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
                    sourceFileRef.setToDirectFileReference(file, useRelativePath); // assertion breakpoint if edit file DNE
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

void autodetectPmSettings(te::Engine& engine)
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

void listWaveDevices(te::Engine& engine) {
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

void listMidiDevices(te::Engine& engine) {
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

void scanVst3(te::Engine& engine)
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

void scanVst2(te::Engine& engine) {
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

void listPlugins(te::Engine& engine)
{
    std::cout << "Internal Plugins:" << std::endl
        << te::VolumeAndPanPlugin::xmlTypeName << std::endl
        << te::LevelMeterPlugin::xmlTypeName << std::endl
        << te::VCAPlugin::xmlTypeName << std::endl
        << te::TextPlugin::xmlTypeName << std::endl
        << te::RackInstance::xmlTypeName << std::endl
        << te::InsertPlugin::xmlTypeName << std::endl
        << te::FreezePointPlugin::xmlTypeName << std::endl
        << te::AuxSendPlugin::xmlTypeName << std::endl
        << te::AuxReturnPlugin::xmlTypeName << std::endl
        << std::endl;

    std::cout << "Effects:" << std::endl
        << te::ChorusPlugin::xmlTypeName << std::endl
        << te::CompressorPlugin::xmlTypeName << std::endl
        << te::DelayPlugin::xmlTypeName << std::endl
        << te::EqualiserPlugin::xmlTypeName << std::endl
        << te::FourOscPlugin::xmlTypeName << std::endl
        << te::LowPassPlugin::xmlTypeName << std::endl
        << te::MidiModifierPlugin::xmlTypeName << std::endl
        << te::MidiPatchBayPlugin::xmlTypeName << std::endl
        << te::PatchBayPlugin::xmlTypeName << std::endl
        << te::PhaserPlugin::xmlTypeName << std::endl
        << te::PitchShiftPlugin::xmlTypeName << std::endl
        << te::ReverbPlugin::xmlTypeName << std::endl
        << te::SamplerPlugin::xmlTypeName << std::endl
        << std::endl;

    std::cout << "Known Plugins:" << std::endl;
    for (auto type : engine.getPluginManager().knownPluginList.getTypes()) {
        std::cout << type.pluginFormatName << ": " << type.name << std::endl;
    }
    std::cout << std::endl;
}

void listProjects(te::Engine& engine) {
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

void listPluginParameters(te::Engine& engine, const String pluginName) {
    std::unique_ptr<te::Edit> edit(createEmptyEdit(File(), engine));
    for (PluginDescription desc : engine.getPluginManager().knownPluginList.getTypes()) {
        if (pluginName.compareIgnoreCase(desc.descriptiveName) == 0 || pluginName.compareIgnoreCase(desc.name) == 0) {
            std::cout
                << "Listing automatable parameters for "
                << desc.pluginFormatName << ": "
                << desc.descriptiveName << " - "
                << desc.name << std::endl;
            edit->ensureNumberOfAudioTracks(1);
            te::AudioTrack* track = te::getFirstAudioTrack(*edit);
            te::Plugin::Ptr plugin = edit->getPluginCache().createNewPlugin(te::ExternalPlugin::xmlTypeName, desc);
            track->pluginList.insertPlugin(plugin, 0, nullptr);
            for (te::AutomatableParameter* param : plugin->getAutomatableParameters()) {
                std::cout << param->paramName << std::endl;
            }
        }
    }
}

void printOscMessage(const OSCMessage& message) {
    std::cout << message.getAddressPattern().toString();
    for (const auto& arg : message) {
        std::cout << " - ";
        auto type = arg.getType();
        if (type == OSCTypes::int32) std::cout << arg.getInt32();
        else if (type == OSCTypes::string) std::cout << arg.getString();
        else if (type == OSCTypes::float32) std::cout << arg.getFloat32();
        else if (type == OSCTypes::blob) std::cout << arg.getBlob().toBase64Encoding();
        else if (type == OSCTypes::colour) {
            OSCColour c = arg.getColour();
            std::cout << "RGBA("<< c.red << "," << c.green << "," << c.blue << "," << c.alpha << ")";
        }
    }
    std::cout << std::endl;
};

te::AudioTrack* getOrCreateAudioTrackByName(te::Edit& edit, const String name) {
    for (auto* track : te::getAudioTracks(edit)) {
        if (track->getName() == name) return track;
    }
    te::TrackInsertPoint insertPoint(nullptr, te::getTopLevelTracks(edit).getLast()); // Does this work if there are no tracks?
    te::AudioTrack* track = edit.insertNewAudioTrack(insertPoint, nullptr).get();
    track->setName(name);
    return track;
}

te::MidiClip* getOrCreateMidiClipByName(te::AudioTrack& track, const String name) {
    for (auto* clip : track.getClips()) {
        if (auto midiClip = dynamic_cast<te::MidiClip*>(clip)) {
            if (midiClip->getName() == name) return midiClip;
        }
    }
    te::MidiClip* clip = track.insertMIDIClip(name, {0, 4}, nullptr).get();
    return clip;
}

te::Plugin* getOrCreatePluginByName(te::AudioTrack& track, const String name) {
    for (te::Plugin* checkPlugin : track.pluginList) {
        if (name.compareIgnoreCase(checkPlugin->getName()) == 0) {
            return checkPlugin;
        }
    }

    if (!track.pluginList.canInsertPlugin()) {
        std::cout << "Selected track cannot insert plugin: " << name << std::endl;
        return nullptr;
    }

    for (PluginDescription desc : track.edit.engine.getPluginManager().knownPluginList.getTypes()) {
        if (desc.name.compareIgnoreCase(name) == 0) {
            std::cout << "inserting " << desc.name << " into track: " << track.getName() << std::endl;
            te::Plugin::Ptr pluginPtr = track.edit.getPluginCache().createNewPlugin(te::ExternalPlugin::xmlTypeName, desc);

            // insert it just before the volume. If no volume plugin is found, insert at the end
            int insertPoint = 0;
            bool found = false;
            for (te::Plugin* checkPlugin : track.pluginList) {
                std::cout << "checking plugin: " << checkPlugin->getName() << std::endl;
                if (auto x = dynamic_cast<te::VolumeAndPanPlugin*>(checkPlugin)) {
                    found = true;
                    break;
                }
                insertPoint++;
            }
            if (!found) insertPoint = track.pluginList.size() - 1;
            std::cout << "Plugin insert index: " << insertPoint << std::endl;
            track.pluginList.insertPlugin(pluginPtr, insertPoint, nullptr);
            return pluginPtr.get();
        }
    }

    std::cout << "Plugin not found: " << name << std::endl;
    return nullptr;
}

