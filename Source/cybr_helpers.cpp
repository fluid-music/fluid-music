/*
  ==============================================================================

    cybr_helpers.cpp
    Created: 18 Jun 2019 5:52:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "cybr_helpers.h"
#include "CybrSearchPath.h"

using namespace juce;

// Creates a new edit, and leaves deletion up to you
te::Edit* createEmptyEdit(File inputFile, te::Engine& engine, te::Edit::EditRole role)
{
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = te::createEmptyEdit(engine);
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = role;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    return new te::Edit(editOptions);
}

// Creates a new edit, and leaves deletion up to you
te::Edit* createEdit(File inputFile, te::Engine& engine, te::Edit::EditRole role) {
    // we are assuming the file exists.
    ValueTree valueTree = te::loadEditFromFile(engine, inputFile, te::ProjectItemID::createNewID(0));

    // Create the edit object.
    // Note we cannot save an edit file without and edit file retriever. It is
    // also used resolves audioclips that have source='./any/relative/path.wav'.
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = valueTree;
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = role;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    te::Edit* newEdit = new te::Edit(editOptions);

    // By default (and for simplicity), all clips in an in-memory edit should
    // have a source property with an absolute path value. We want to avoid
    // clip sources with project ids or relative path values.
    setClipAndSamplerSourcesToDirectFileReferences(*newEdit, SamplePathMode::absolute, false);

    // List any missing plugins
    for (auto plugin : newEdit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }
    std::cout << "Loaded edit file: " << inputFile.getFullPathName() << std::endl << std::endl;
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

void setClipAndSamplerSourcesToDirectFileReferences(te::Edit& changeEdit, SamplePathMode mode, bool verbose)
{
    int failures = 0;
    if (verbose) {
        std::cout << "Searching for audio clips and updating their sources ";
        if (mode == SamplePathMode::absolute) std::cout << "to absolute paths" << std::endl;
        if (mode == SamplePathMode::relative) std::cout << "to relative paths" << std::endl;
        if (mode == SamplePathMode::decide) std::cout << "to absolute paths, if sample is not in a subdirectory" << std::endl;
    }

    for (auto track : te::getClipTracks(changeEdit)) { // for each track
        for (auto clip : track->getClips()) { // inspect each clip
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) { // if it is an audio clip
                auto& sourceFileRef = audioClip->getSourceFileReference();
                auto file = sourceFileRef.getFile();
                if (file == File()) {
                    // We failed to get the filepath from the project manager
                    failures++;
                    std::cout
                        << "ERROR: Failed to find and update source clip: " << audioClip->getName()
                        << " source=\"" << sourceFileRef.source << "\"" << std::endl;
                }
                else {
                    bool useRelativePath;
                    if (mode == SamplePathMode::relative) useRelativePath = true;
                    else if (mode == SamplePathMode::absolute) useRelativePath = false;
                    else {
                        File editFileDir = changeEdit.editFileRetriever().getParentDirectory();
                        useRelativePath = file.isAChildOf(editFileDir) ? true : false;
                    }
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

    for (auto plugin : changeEdit.getPluginCache().getPlugins()) {
        if (auto sampler = dynamic_cast<te::SamplerPlugin*>(plugin)) {
            // Annoyingly it does not work to use the sampler interface, because setters like
            // sampler->setSoundMedia(...) update asynchronously. If we just changed the
            // source file recently, its updated values will not yet be returned by the
            // sampler's getter methods.
            for (auto child : sampler->state) {
                if (!child.hasType(te::IDs::SOUND)) continue;
                String oldPath = child.getProperty(te::IDs::source);
                if (oldPath.isEmpty()) continue;
                File soundFile = changeEdit.filePathResolver(oldPath);
                bool useRelativePath;
                if (mode == SamplePathMode::relative) useRelativePath = true;
                else if (mode == SamplePathMode::absolute) useRelativePath = false;
                else {
                    File editFileDir = changeEdit.editFileRetriever().getParentDirectory();
                    useRelativePath = soundFile.isAChildOf(editFileDir) ? true : false;
                }
                String newPath = te::SourceFileReference::findPathFromFile(changeEdit, soundFile, useRelativePath);
                if (oldPath != newPath && newPath.isNotEmpty()) {
                    child.setProperty(te::IDs::source, newPath, nullptr);
                    if (verbose) std::cout
                        << "Updated sampler plugin source \"" << oldPath
                        << "\" to \""  << newPath << "\"" << std::endl;
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
                    engine.getProjectManager().folders = folders;
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
    auto& dm = engine.getDeviceManager();
    dm.rebuildWaveDeviceListIfNeeded();
    auto& jdm = dm.deviceManager;

    // Show current device type and device
    {
        const juce::AudioIODevice* currentDevice = jdm.getCurrentAudioDevice();
        String currentDeviceType = "\"" + jdm.getCurrentAudioDeviceType() + "\"";
        String currentDeviceName = currentDevice ? "\"" + currentDevice->getName() + "\"" : "<none>";
        std::cout
            << "Current audio device type: " << currentDeviceType << std::endl
            << "Current audio device:      " << currentDeviceName <<  std::endl
            << std::endl;

        std::cout << "Devices By Type (juce::AudioIODeviceType):" << std::endl;
        for (auto d : jdm.getAvailableDeviceTypes()) {
            std::cout << d->getTypeName() << std::endl;
            d->scanForDevices();
            for (auto name : d->getDeviceNames()) {
                std::cout << "  - " << name << std::endl;
            }
        }
        std::cout << std::endl;
    }

    std::cout << "Wave Input Devices:" << std::endl;
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
        auto chanSet = d->getChannelSet();

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
#if (JUCE_PLUGINHOST_VST3)
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
#endif
}

void scanVst2(te::Engine& engine) {
#if (JUCE_PLUGINHOST_VST)
    juce::VSTPluginFormat vst2;
    FileSearchPath paths = vst2.getDefaultLocationsToSearch();

#if (JUCE_LINUX)
    paths.addIfNotAlreadyThere(File("/usr/lib/lxvst")); // Helm
#endif

    std::cout << "Scanning for VST2 plugins in: " << paths.toString() << std::endl;

    juce::String deadPlugins;
    juce::PluginDirectoryScanner pluginScanner{
        engine.getPluginManager().knownPluginList,
        vst2,
        paths,
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
    auto& pm = engine.getProjectManager();
    for (auto project : pm.getAllProjects(pm.getLibraryProjectsFolder()))
    {
        std::cout << project->getName() << " - " << project->getProjectFile().getFullPathName() << std::endl;
    }
    std::cout << "Active Projects: " << std::endl;
    for (auto project : pm.getAllProjects(pm.getActiveProjectsFolder()))
    {
        std::cout << project->getName() << " - " << project->getProjectFile().getFullPathName() << std::endl;
    }
    std::cout << std::endl;
}

void listPluginParameters(te::Engine& engine, const String pluginName) {
    std::unique_ptr<te::Edit> edit(createEmptyEdit(File(), engine));
    edit->ensureNumberOfAudioTracks(1);
    te::AudioTrack* track = te::getFirstAudioTrack(*edit);
    te::Plugin* plugin = getOrCreatePluginByName(*track, pluginName);
    if (!plugin) {
        std::cout << "Plugin not found: " << pluginName << std::endl;
        return;
    }
    // internal plugin parameters may not appear in this list. (chorus)
    for (te::AutomatableParameter* param : plugin->getAutomatableParameters()) {
        std::cout << param->paramName << std::endl;
    }
}

//TODO: Internal plugin will always return no midi programs
void listPluginPresets(te::Engine& engine, const String pluginName) {
    std::unique_ptr<te::Edit> edit(createEmptyEdit(File(), engine));
    edit->ensureNumberOfAudioTracks(1);
    te::AudioTrack* track = te::getFirstAudioTrack(*edit);
    te::Plugin* plugin = getOrCreatePluginByName(*track, pluginName);
    if (!plugin) {
        std::cout << "Plugin not found: " << pluginName << std::endl;
        return;
    }
    if (auto extPlugin = dynamic_cast<te::ExternalPlugin*>(plugin)) {
        std::cout << "ExternalPlugin::getProgramName(i) for " << extPlugin->getName() << std::endl;
        int numPrograms = extPlugin->getNumPrograms();
        for (int i = 0; i < numPrograms; i++)
            std::cout << i << " - " << extPlugin->getProgramName(i) << std::endl;
    }
    {
        std::cout << "Plugin::hasNameForMidiProgram for " << plugin->getName() << std::endl;
        for (int i = 0; i <= 127; i++) {
            String programName;
            //Always returns false
            if (plugin->hasNameForMidiProgram(i, 0, programName))
                std::cout << "Program: (" << i << ") " << programName << std::endl;
        }
    }
}

void queryPluginParamPoints(te::Engine& engine, const String pluginName, const String paramName) {
    std::unique_ptr<te::Edit> edit(createEmptyEdit(File(), engine));
    edit->ensureNumberOfAudioTracks(1);
    te::AudioTrack* track = te::getFirstAudioTrack(*edit);
    te::Plugin* plugin = getOrCreatePluginByName(*track, pluginName);
    if (!plugin) {
        std::cout << "Plugin not found: " << pluginName << std::endl;
        return;
    }
    // internal plugin parameters may not appear in this list. (chorus)
    for (te::AutomatableParameter* param : plugin->getAutomatableParameters()) {
        if (param->paramName.equalsIgnoreCase(paramName)) {
            for(double paramValue = 0; paramValue <= 1.01; paramValue += 0.01){
                param->parameterChangeGestureBegin();
                param->setParameter(paramValue, NotificationType::sendNotification);
                param->parameterChangeGestureEnd();

                std::cout << paramValue << ", " <<param->getCurrentValueAsString()<< std::endl;
            }
        }
    }
}

void printPreset(te::Plugin* plugin) {
    if (!plugin) return;
    if (auto extPlugin = dynamic_cast<te::ExternalPlugin*>(plugin)) {
        AudioPluginInstance*  jucePlugin = extPlugin->getAudioPluginInstance();
        MemoryBlock mb;
        jucePlugin->suspendProcessing(true);
        if (extPlugin->isVST()) VSTPluginFormat::saveToFXBFile(jucePlugin, mb, false);
        else jucePlugin->getStateInformation(mb); // works for vst3 and tracktion plugins
        jucePlugin->suspendProcessing(false);
        std::cout << "Plugin state: " << std::endl << mb.toBase64Encoding() << std::endl;
    } else {
        plugin->flushPluginStateToValueTree(); // FluishPlugin State helped me figure out how to access state in a thread-safe way
        std::cout << "Showing xml state, because " << plugin->getName() << " is not an external plugin" << std::endl;
        std::cout << plugin->state.toXmlString() << std::endl;
    }
}

void saveTracktionPreset(te::Plugin* plugin, String name) {
    if (!plugin) {
        jassert(false);
        return;
    }

    Array<File> presetDirs = CybrSearchPath(CYBR_PRESET).paths();
    if (presetDirs.size() < 1) {
        std::cout << "Cannot save preset. No preset paths found" << std::endl;
        return;
    }

    if (!name.endsWithIgnoreCase(".trkpreset")) name.append(".trkpreset", 10);

    File file = presetDirs[0].getChildFile(File::createLegalFileName(name));
    File saveDir = file.getParentDirectory();

    if (!file.hasWriteAccess()) {
        std::cout
            << "Cannot write preset file (do not have write access): "
            << file.getFullPathName() << std::endl;
        return;
    }
    ValueTree state(te::IDs::PRESET);
    plugin->flushPluginStateToValueTree();
    state.appendChild(plugin->state.createCopy(), nullptr);
    state.setProperty(te::IDs::name, name, nullptr);
    state.setProperty(te::IDs::filename, file.getFileName(), nullptr);
    state.setProperty(te::IDs::path, file.getParentDirectory().getFullPathName(), nullptr);
    state.setProperty(te::IDs::tags, "cybr", nullptr);

    state.createXml()->writeTo(file);
    std::cout << "Save tracktion preset: " << file.getFullPathName() << std::endl;
}

te::RackType::Ptr ensureWidthRack(te::AudioTrack& track) {
    for (auto plugin : track.pluginList) {
        if (plugin->state.hasProperty("cybr-width")) {
            return plugin->getOwnerRackType();
        }
    }

    te::RackType::Ptr cybrRackType = track.edit.getRackList().addNewRack();
    {
        cybrRackType->rackName.setValue("width", nullptr);
        auto plugin1 = track.edit.getPluginCache().createNewPlugin("volume", PluginDescription());
        auto plugin2 = track.edit.getPluginCache().createNewPlugin("volume", PluginDescription());
        auto plugin3 = track.edit.getPluginCache().createNewPlugin("volume", PluginDescription());
        auto plugin4 = track.edit.getPluginCache().createNewPlugin("volume", PluginDescription());
        auto volume1 = dynamic_cast<te::VolumeAndPanPlugin*>(plugin1.get());
        auto volume2 = dynamic_cast<te::VolumeAndPanPlugin*>(plugin2.get());
        auto volume3 = dynamic_cast<te::VolumeAndPanPlugin*>(plugin3.get());
        auto volume4 = dynamic_cast<te::VolumeAndPanPlugin*>(plugin4.get());
        volume1->setVolumeDb(-6.020599913279624);
        volume2->setVolumeDb(-6.020599913279624);
        volume3->setVolumeDb(-6.020599913279624);
        volume4->setVolumeDb(-6.020599913279624);

        // Note that we do not actually hard pan the two volume channels. This
        // is accomplished with macros.

        cybrRackType->addPlugin(plugin1, {0.25, 0.35}, false);
        cybrRackType->addPlugin(plugin2, {0.25, 0.60}, false);
        cybrRackType->addPlugin(plugin3, {0.75, 0.35}, false);
        cybrRackType->addPlugin(plugin4, {0.75, 0.60}, false);

        // Left input channel to volume1
        cybrRackType->addConnection({}, 1, volume1->itemID, 1);
        cybrRackType->addConnection({}, 1, volume1->itemID, 2);
        // Right input channel to volume2
        cybrRackType->addConnection({}, 2, volume2->itemID, 1);
        cybrRackType->addConnection({}, 2, volume2->itemID, 2);

        // From 1 to 3, 4
        cybrRackType->addConnection(volume1->itemID, 1, volume3->itemID, 1);
        cybrRackType->addConnection(volume1->itemID, 1, volume3->itemID, 2);
        cybrRackType->addConnection(volume1->itemID, 2, volume4->itemID, 1);
        cybrRackType->addConnection(volume1->itemID, 2, volume4->itemID, 2);
        // From 2 to 3, 4
        cybrRackType->addConnection(volume2->itemID, 1, volume3->itemID, 1);
        cybrRackType->addConnection(volume2->itemID, 1, volume3->itemID, 2);
        cybrRackType->addConnection(volume2->itemID, 2, volume4->itemID, 1);
        cybrRackType->addConnection(volume2->itemID, 2, volume4->itemID, 2);

        // volume3,4 to Left,Right output channel
        cybrRackType->addConnection(volume3->itemID, 1, {}, 1);
        cybrRackType->addConnection(volume3->itemID, 2, {}, 2);
        cybrRackType->addConnection(volume4->itemID, 1, {}, 1);
        cybrRackType->addConnection(volume4->itemID, 2, {}, 2);

        // route midi directly
        cybrRackType->addConnection({}, 0, {}, 0);

        // Create a macro in the rack
        auto widthMacro = track.macroParameterList.createMacroParameter();
        widthMacro->macroName = "width";
        widthMacro->value = 1.0;
        volume1->panParam->addModifier(*widthMacro, -1,  0.5);
        volume2->panParam->addModifier(*widthMacro,  1, -0.5);

        // Create a macro on the track
        auto autoMacro = track.macroParameterList.createMacroParameter();
        autoMacro->macroName = "width automation";
        autoMacro->value = 1.0;
        volume3->panParam->addModifier(*autoMacro, -1,  0.5);
        volume4->panParam->addModifier(*autoMacro,  1, -0.5);
    }

    // find the last volume plugin in the track
    int insertPoint = track.pluginList.size() - 1;
    for (; insertPoint >= 0; insertPoint--) {
        auto checkPlugin = track.pluginList[insertPoint];
        if (auto x = dynamic_cast<te::VolumeAndPanPlugin*>(checkPlugin)) break;
    }

    auto pluginTree = te::RackInstance::create(*cybrRackType.get());  // <PLUGIN type="rack" rackType="1002"/>
    pluginTree.setProperty("cybr-width", "T", nullptr);
    te::Plugin::Ptr plugin = track.edit.getPluginCache().createNewPlugin(pluginTree);
    track.pluginList.insertPlugin(plugin, insertPoint, nullptr);

    return cybrRackType;
}

void loadTracktionPreset(te::AudioTrack& audioTrack, ValueTree v) {
    bool loaded = false;
    for (ValueTree preset : v) {
        if (!preset.hasType(te::IDs::PLUGIN)) continue;
        if (!preset.hasProperty(te::IDs::type)) continue;
        String type = preset[te::IDs::type];
        String name = preset[te::IDs::name];

        // Tracktion plugins have a type property but no name property.
        // getOrCreatePluginByName expect 'name' to be the name of the vst or
        // 'type' of the tracktion plugin (which does not have a name).
        // This sillyness allows us to get a plugin from a preset
        if (!preset.hasProperty(te::IDs::name)) {
            name = type;
            type = String();
        }

        if (name.isEmpty()) {
            std::cout << "Cannot load plugin preset: plugin has invalid type: " << type << std::endl;
            continue;
        }

        std::cout << "Found preset: " << type << "/" << name << std::endl;

        if (te::Plugin* plugin = getOrCreatePluginByName(audioTrack, name, type)) {
            ValueTree currentConfig = plugin->state;
            // These should be correct on the preset, but just in case, get the ones
            // returned by getOrCreatePluginByName, so we will be sure that we are not
            // changing them.
            if (currentConfig.hasProperty(te::IDs::type)) preset.setProperty(te::IDs::type, currentConfig[te::IDs::type], nullptr);
            if (currentConfig.hasProperty(te::IDs::name)) preset.setProperty(te::IDs::name, currentConfig[te::IDs::name], nullptr);
            if (currentConfig.hasProperty(te::IDs::uid)) preset.setProperty(te::IDs::uid, currentConfig[te::IDs::uid], nullptr);
            if (currentConfig.hasProperty(te::IDs::filename)) preset.setProperty(te::IDs::filename, currentConfig[te::IDs::filename], nullptr);
            if (currentConfig.hasProperty(te::IDs::id)) preset.setProperty(te::IDs::id, currentConfig[te::IDs::id], nullptr);
            if (currentConfig.hasProperty(te::IDs::manufacturer)) preset.setProperty(te::IDs::manufacturer, currentConfig[te::IDs::manufacturer], nullptr);
            if (currentConfig.hasProperty(te::IDs::programNum)) preset.setProperty(te::IDs::programNum, currentConfig[te::IDs::programNum], nullptr);

            // Now copy over everything else from the preset. This should include the
            // all-important 'state' property of external plugins. External plugins also
            // have some mundane properties like windowLocked="1", enabled="1"
            plugin->restorePluginStateFromValueTree(preset);

            std::cout << "Loaded preset: " << name << std::endl;
            loaded = true;
        } else {
            std::cout << "Cannot load plugin preset: failed to create plugin with type/name: " << type << "/" << name << std::endl;
            continue;
        };
    }
    if (loaded) std::cout
        << "Loaded " << v[te::IDs::name].toString()
        << " on " << audioTrack.getName() << std::endl;
}

ValueTree loadXmlFile(File file) {
    ValueTree result{};

    if (file.existsAsFile()) {
        if (auto xml = XmlDocument::parse(file)) result = ValueTree::fromXml(*xml.get());
        else std::cout << "Failed to parse xml in: " << file.getFullPathName() << std::endl;
    } else {
        std::cout << "File does not exist!" << std::endl;
    }
    return result;
}

int ensureBus(te::Edit& edit, String busName) {
    int busIndex = -1;
    // If there is already a bus with the name, find its index
    for (int i = 0; i < 32; i++) {
        if (edit.getAuxBusName(i).equalsIgnoreCase(busName)) {
            busIndex = i;
            break;
        }
    }

    // If no bus with this name was found, create it
    if (busIndex == -1) {
        for (int i = 0; i < 32; i++) {
            if (edit.getAuxBusName(i).isEmpty()) {
                busIndex = i;
                edit.setAuxBusName(i, busName);
                break;
            }
        }
    }
    return busIndex;
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
    te::AudioTrack* foundTrack = nullptr;

    for (auto* track : te::getAudioTracks(edit)) {
        if (track->getName() != name) continue;
        foundTrack = track;
        break;
    }

    if (!foundTrack) {
        te::TrackInsertPoint insertPoint(nullptr, te::getTopLevelTracks(edit).getLast());
        foundTrack = edit.insertNewAudioTrack(insertPoint, nullptr).get();
        foundTrack->setName(name);
    }

    if (foundTrack) {
        ensureWidthRack(*foundTrack);
    }

    return foundTrack;


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

te::Plugin* getOrCreatePluginByName(te::AudioTrack& track, const String name, const String type, const int index) {
    // To insert a plugin, we need two things:
    // (1) A PluginDescription. For internal plugins, a description is arbitrary
    PluginDescription foundPluginDesc;
    // (2) A "type" xml string. All external plugins have the same type
    String tracktionPluginType;
    // The "foundIt" flag will be set when we have both (1) and (2)
    bool foundIt = false;

    // Different properties are needed to identify different plugin types
    // Internal plugins like "volume" look like this:
    // checkPlugin->getPluginType();   // "volume" - this is the "type" XML parameter
    // checkPlugin->getName();         // "Volume & Pan Plugin"
    // External plugins like "zebra 2" look like this:
    // checkPlugin->getPluginType();   // "VST" or "VST3" of "AudioUnit"
    // checkPlugin->getName();         // "Zebra2"

    // "width" is a special case, because the plugin is a Rack, and is not
    // actually named "width". Note that indexing "width" is not supported.
    if ((name == "width" || name == "cybr-width") && (type.isEmpty() || type.equalsIgnoreCase("tracktion"))) {
        ensureWidthRack(track);
        for (auto plugin : track.pluginList) {
            if (plugin->state.hasProperty("cybr-width")) {
                return plugin;
            }
        }
    }

    // first, search for a plugin that matches the full name (case insensitive)
    for (PluginDescription desc : track.edit.engine.getPluginManager().knownPluginList.getTypes()) {
        if (desc.name.equalsIgnoreCase(name) && (type.isEmpty() || type.equalsIgnoreCase(desc.pluginFormatName))) {
            tracktionPluginType = te::ExternalPlugin::xmlTypeName;
            foundPluginDesc = desc;
            foundIt = true;
            break;
        }
    }

    // Next, check for "internal" plugins
    if (!foundIt && (type.isEmpty() || type.equalsIgnoreCase("tracktion"))) {
        te::Plugin::Ptr internalPlugin = track.edit.getPluginCache().createNewPlugin(name, PluginDescription());
        if (internalPlugin.get()) {
            tracktionPluginType = name;
            foundPluginDesc = PluginDescription();
            foundIt = true;
        }
    }

    // If we still didn't find it, try looking for an external plugin using "startsWith"
    if (!foundIt) {
        for (PluginDescription desc : track.edit.engine.getPluginManager().knownPluginList.getTypes()) {
            if (desc.name.startsWithIgnoreCase(name) && (type.isEmpty() || type.equalsIgnoreCase(desc.pluginFormatName))) {
                foundPluginDesc = desc;
                tracktionPluginType = te::ExternalPlugin::xmlTypeName;
                foundIt = true;
                break;
            }
        }
    }

    if (!foundIt) {
        String typeName = type.isEmpty() ? "any type" : type;
        std::cout << "Plugin not found: " << name << " (" << typeName << ") " << std::endl;
        return nullptr;
    }

    // We should now have the type AND PluginDescription. At what position in
    // the list should it be inserted?
    //
    // Look for the first volume plugin, and insert before. If no volume plugin
    // is found, insert it at "-1", which is at the end of the list.
    int insertPoint = -1;
    {
        int i = 0;
        for (te::Plugin* checkPlugin : track.pluginList) {
            if (auto x = dynamic_cast<te::VolumeAndPanPlugin*>(checkPlugin)) {
                insertPoint = i;
                break;
            }
            i++;
        }
    }

    bool isExternal = tracktionPluginType == te::ExternalPlugin::xmlTypeName;

    // figure out how many of these we need to create
    int numToInsert = index + 1;
    if (isExternal) {
        for (te::Plugin* checkPlugin : track.pluginList) {
            if (auto x = dynamic_cast<te::ExternalPlugin*>(checkPlugin)) {
                if ((type.isEmpty() || x->desc.pluginFormatName == foundPluginDesc.pluginFormatName)
                && foundPluginDesc.name == x->getName()) {
                    numToInsert--;
                    if (numToInsert == 0) return x; // we already have enough, just return this one
                }
            }
        }
    } else {
        // This is an internal ("tracktion") plugin
        for (te::Plugin* checkPlugin : track.pluginList) {
            if (checkPlugin->getPluginType() == tracktionPluginType) {
                if (--numToInsert == 0) return checkPlugin; // we already have enough, just return this one
            }
        }
    }

    if (!track.pluginList.canInsertPlugin()) {
        std::cout << "Selected track cannot insert plugin: " << name << std::endl;
        return nullptr;
    }

    // We have a description for the plugin. Insert the needed number of copies.
    String printableName = isExternal ? foundPluginDesc.name : tracktionPluginType;
    String printableType = isExternal ? foundPluginDesc.pluginFormatName : "tracktion";
    te::Plugin::Ptr pluginPtr;
    for(int i = 0; i < numToInsert; i++){
        std::cout
            << "Inserting \"" << printableName << "\" (" << printableType << ") "
            << "into track: \"" << track.getName() << "\" at position:" << insertPoint << std::endl;
        pluginPtr = track.edit.getPluginCache().createNewPlugin(tracktionPluginType, foundPluginDesc);
        track.pluginList.insertPlugin(pluginPtr, insertPoint, nullptr);
        insertPoint++;
    }

    if (pluginPtr.get()) return pluginPtr.get();
    jassert(false);
    return nullptr;
}

void renderTrackRegion(File outputFile, te::Track& track, te::EditTimeRange range) {
    if (range.getLength() == 0) {
        std::cout << "Cannot render track region: time range is zero." << std::endl;
        return;
    }

    if (!outputFile.hasWriteAccess()) {
        std::cout << "Cannot render track region: No write access: " << outputFile.getFullPathName() << std::endl;
        return;
    }

    if (outputFile.exists()) {
        if (!outputFile.deleteFile()) {
            std::cout << "Cannot render track region: Failed to delete existing file" << std::endl;
            return;
        } else {
            std::cout << "Overwrite: " << outputFile.getFullPathName() << std::endl;
        }
    }

    String jobTitle = "Render " + track.getName() + " to " + outputFile.getFullPathName();
    std::cout << jobTitle << std::endl;

    BigInteger tracksToDo;
    {
        int i = 0;
        track.edit.visitAllTracks([&i, &track, &tracksToDo] (te::Track& check) {
            if (&track == &check) tracksToDo.setBit(i);
            i++;
            return true;
        }, true);
    }
    jassert(tracksToDo.countNumberOfSetBits() == 1);

    bool success = te::Renderer::renderToFile(jobTitle,
                                              outputFile,
                                              track.edit,
                                              range,
                                              tracksToDo);
    if (success) {
        std::cout << "Rendered: " << outputFile.getFullPathName() << std::endl;
    } else {
        std::cout << "Failed to render: " << outputFile.getFullPathName() << std::endl;
        return;
    }
}


void removeAllClipsFromTrack(te::ClipTrack& track) {
    te::Clip::Array clipsToRemove;
    for (te::Clip* clip : track.getClips()) {
        clipsToRemove.add(clip);
    }

    for (te::Clip* clip : clipsToRemove) {
        clip->removeFromParentTrack();
    }
}

void removeAllPluginAutomationFromTrack(te::ClipTrack& track) {
    for (auto plugin : track.getAllPlugins()) {
        for (te::AutomatableParameter* param : plugin->getAutomatableParameters()) {
            if (param->hasAutomationPoints()) {
                param->getCurve().clear();
            }
        }
    }
}


void setParamAutomationPoint(te::AutomatableParameter::Ptr param, float paramValue, double timeInWholeNotes, float curveValue, bool isNormalized) {
    if (isNormalized) paramValue = param->valueRange.convertFrom0to1(paramValue);
    te::AutomationCurve curve = param->getCurve();
    // If this is the first time changing the value of the parameter,
    // set it to its default at time 0.
    if(!param->hasAutomationPoints()) {
        curve.addPoint(0, param->getCurrentValue(), 0);
    }

    double changeTime = param->getEdit().tempoSequence.beatsToTime(timeInWholeNotes * 4);

    curve.addPoint(changeTime, paramValue, curveValue);
    curve.removeRedundantPoints(te::EditTimeRange(0, curve.getLength()+1));
}
