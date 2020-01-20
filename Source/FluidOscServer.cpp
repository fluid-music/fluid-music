/*
  ==============================================================================

    FluidOscServer.cpp
    Created: 18 Nov 2019 5:50:15pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "FluidOscServer.h"

FluidOscServer::FluidOscServer() {
    addListener (this);
}

void FluidOscServer::oscBundleReceived(const juce::OSCBundle &bundle) {
    for (const auto& element: bundle) {
        if (element.isMessage()) oscMessageReceived(element.getMessage());
        if (element.isBundle()) oscBundleReceived(element.getBundle());
    }
    selectedMidiClip = nullptr;
    selectedAudioTrack = nullptr;
    selectedPlugin = nullptr;
}

void FluidOscServer::oscMessageReceived (const OSCMessage& message) {
    const OSCAddressPattern msgAddressPattern = message.getAddressPattern();

    if (msgAddressPattern.matches({"/test"}) || msgAddressPattern.matches({"/print"})) {
        printOscMessage(message);
        return;
    }
    if (msgAddressPattern.matches({"/file/activate"})) return activateEditFile(message);

    if (!activeCybrEdit) {
        std::cout << "NOTE: message failed, because there is no active CybrEdit: ";
        printOscMessage(message);
        return;
    }

    if (msgAddressPattern.matches({"/midiclip/insert/note"})) return insertMidiNote(message);
    if (msgAddressPattern.matches({"/midiclip/select"})) return selectMidiClip(message);
    if (msgAddressPattern.matches({"/midiclip/clear"})) return clearMidiClip(message);
    if (msgAddressPattern.matches({"/plugin/select"})) return selectPlugin(message);
    if (msgAddressPattern.matches({"/plugin/param/set"})) return setPluginParam(message);
    if (msgAddressPattern.matches({"/plugin/save"})) return savePluginPreset(message);
    if (msgAddressPattern.matches({"/plugin/load/trkpreset"})) return loadPluginTrkpreset(message);
    if (msgAddressPattern.matches({"/plugin/load"})) return loadPluginPreset(message);
    if (msgAddressPattern.toString().startsWith("/plugin/sampler")) return handleSamplerMessage(message);
    if (msgAddressPattern.matches({"/audiotrack/select"})) return selectAudioTrack(message);
    if (msgAddressPattern.matches({"/audiotrack/insert/wav"})) return insertWaveSample(message);
    if (msgAddressPattern.matches({"/file/save"})) return saveActiveEdit(message);
    if (msgAddressPattern.matches({"/cd"})) return changeWorkingDirectory(message);
    if (msgAddressPattern.toString().startsWith({"/transport"})) return handleTransportMessage(message);

    std::cout << "Unhandled message: ";
    printOscMessage(message);
}

void FluidOscServer::saveActiveEdit(const juce::OSCMessage &message) {
    if (!activeCybrEdit) return;

    String filename = (message.size() && message[0].isString())
        ? message[0].getString()
        : String();

    // If the first argument is string it is a filename
    File file = (filename.isNotEmpty() && filename != "")
        ? File::getCurrentWorkingDirectory().getChildFile(message[0].getString())
        : activeCybrEdit->getEdit().editFileRetriever();

    // By default use relative file paths. If the second arg begins with 'a', use absolute paths
    auto mode = SamplePathMode::decide;

    if (message.size() >= 2 && message[1].isString()) {
        String arg1 = message[1].getString();
        if (arg1.startsWith("a")) mode = SamplePathMode::absolute;
        else if (arg1.startsWith("r")) mode = SamplePathMode::relative;
        else if (arg1.startsWith("d")) mode = SamplePathMode::decide;
        else std::cout << "Save - unknown SamplePathMode: " << arg1 << std::endl;
    }

    activeCybrEdit->saveActiveEdit(file, mode);
}

void FluidOscServer::activateEditFile(File file, bool forceEmptyEdit) {
    if (forceEmptyEdit || !file.existsAsFile()) {
        std::cout << "Creating new edit: " << file.getFullPathName() << std::endl;
        activeCybrEdit = std::make_unique<CybrEdit>(createEmptyEdit(file, te::Engine::getInstance(), te::Edit::forEditing));
        if (!file.existsAsFile()) activeCybrEdit->saveActiveEdit(file);
    } else {
        std::cout << "Loading edit: " << file.getFullPathName() << std::endl;
        activeCybrEdit = std::make_unique<CybrEdit>(createEdit(file, te::Engine::getInstance(), te::Edit::forEditing));
    }
}

void FluidOscServer::activateEditFile(const juce::OSCMessage &message) {
    if (!message.size() || !message[0].isString()) {
        std::cout << "ERROR: /file/activate missing message argument" << std::endl;
        return;
    }
    
    File file = File::getCurrentWorkingDirectory().getChildFile(message[0].getString());
    if (!file.hasFileExtension(".tracktionedit")) {
        std::cout << "WARNING: /file/activate argument does not have .tracktionedit extention: " << file.getFileName() << std::endl;
    }
    
    bool forceEmptyEdit = (message.size() >= 2 && message[1].isInt32()) ? message[1].getInt32() : false;
    return activateEditFile(file, forceEmptyEdit);
}

void FluidOscServer::changeWorkingDirectory(const OSCMessage& message) {
    if (!message.size() || !message[0].isString()) {
        std::cout << "ERROR: request to change directory without a path string" << std::endl;
        return;
    }

    String path = message[0].getString();
    File newWorkingDir = File::getCurrentWorkingDirectory().getChildFile(path);

    if (!newWorkingDir.isDirectory() || !newWorkingDir.setAsCurrentWorkingDirectory()) {
        std::cout << "ERROR: Cannot change directory: " << newWorkingDir.getFullPathName() << std::endl;
    } else {
        std::cout << "Current Working Directory: " << newWorkingDir.getFullPathName() << std::endl;
    }
}

void FluidOscServer::selectAudioTrack(const juce::OSCMessage& message) {
    if (!message.size() || !message[0].isString()) return;

    String trackName = message[0].getString();
    selectedAudioTrack = getOrCreateAudioTrackByName(activeCybrEdit->getEdit(), trackName);
}

void FluidOscServer::selectPlugin(const OSCMessage& message) {
    if (!message.size() || !message[0].isString()) return;
    String pluginName = message[0].getString();
    String pluginFormat = String();

    if (message.size() >= 2 && message[1].isString())
        pluginFormat = message[1].getString();

    if (!selectedAudioTrack) return;
    selectedPlugin = getOrCreatePluginByName(*selectedAudioTrack, pluginName, pluginFormat);
}

void FluidOscServer::setPluginParam(const OSCMessage& message) {
    if (message.size() > 2 ||
        !message[0].isString() ||
        !message[1].isFloat32()) return;

    if (!selectedPlugin) return;

    String paramName = message[0].getString();
    float paramValue = message[1].getFloat32();

    for (te::AutomatableParameter* param : selectedPlugin->getAutomatableParameters()) {
        if (param->paramName.equalsIgnoreCase(paramName)) {
            param->beginParameterChangeGesture();
            param->setNormalisedParameter(paramValue, NotificationType::sendNotification); 
            param->endParameterChangeGesture();
            std::cout << "set " << paramName << " to " << paramValue << " explicitvalue: " << param->getCurrentExplicitValue() << " value: " << param->getCurrentValue() << std::endl;
            break;
        }
    }
}

void FluidOscServer::savePluginPreset(const juce::OSCMessage& message) {
    if (!selectedPlugin) {
        std::cout << "Cannot save plugin preset: No selected plugin" << std::endl;
        return;
    }
    if (message.size() < 1 || !message[0].isString()) {
        std::cout << "Cannot save plugin preset: First argument must be a name string" << std::endl;
        return;
    }
    saveTracktionPreset(selectedPlugin, message[0].getString());
}

void FluidOscServer::loadPluginTrkpreset(const juce::OSCMessage &message) {

    if (!selectedAudioTrack) {
        std::cout << "Cannot load plugin preset: No audio track selected" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isBlob()) {
        std::cout << "Cannot load trkpreset data: Mising blob" << std::endl;
        return;
    }

    MemoryBlock blob = message[0].getBlob();
    String string = String::createStringFromData(blob.getData(), (int)blob.getSize());
    std::unique_ptr<XmlElement> xml = parseXML(string);
    if (!xml) {
        std::cout << "Cannot load trkpreset data: XML parser error" << std::endl;
        return;
    }

    ValueTree v = ValueTree::fromXml(*xml.get());
    if (!v.isValid()) {
        std::cout << "Cannot load trkpreset data: Invalid ValueTree" << std::endl;
        return;
    }

    loadTracktionPreset(*selectedAudioTrack, v);
}

void FluidOscServer::loadPluginPreset(const juce::OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot load plugin preset: No audio track selected" << std::endl;
        return;
    }

    if (message.size() < 1 || !message[0].isString()) {
        std::cout << "Cannot load plugin preset: Message has no preset name" << std::endl;
        return;
    }

    String filename = message[0].getString();
    if (!filename.endsWithIgnoreCase(".trkpreset")) filename.append(".trkpreset", 10);

    File editDirectory = selectedAudioTrack->edit.editFileRetriever().getParentDirectory();
    File file = editDirectory.getChildFile(filename);

    // First check if the file is an absolute file, OR was found relative to
    // the edit file directory.
    if (file.existsAsFile()) {
        filename = file.getFullPathName(); // Found it!
    } else {
        // Look in the sample search path.
        file = CybrSearchPath(CYBR_PRESET).find(filename);
        if (file != File()) filename = file.getFullPathName(); // Found it!
        else std::cout << "Warning: preset file not found: " << filename << std::endl;
    }

    ValueTree v = loadXmlFile(file);

    if (!v.isValid()) {
        std::cout << "Cannot load plugin preset: Failed to load and parse file" << std::endl;
        return;
    }

    loadTracktionPreset(*selectedAudioTrack, v);
}

void FluidOscServer::selectMidiClip(const juce::OSCMessage& message) {
    if (!selectedAudioTrack) return;
    if (!message.size() || !message[0].isString()) return;

    String clipName = message[0].getString();
    selectedMidiClip = getOrCreateMidiClipByName(*selectedAudioTrack, clipName);

    // Clip startBeats
    if (message.size() >= 2 && message[1].isFloat32()) {
        double startBeats = message[1].getFloat32();
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        selectedMidiClip->setStart(startSeconds, false, true);
    }
    // Clip length
    if (message.size() >= 3 && message[2].isFloat32()) {
        double lengthInBeats = message[2].getFloat32();
        double startBeat = selectedMidiClip->getStartBeat();
        double endBeat = startBeat + lengthInBeats;
        double endTime = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeat);
        selectedMidiClip->setEnd(endTime, true);
    }
}

void FluidOscServer::clearMidiClip(const juce::OSCMessage& message) {
    if (!selectedMidiClip) return;
    
    auto exisiting = selectedMidiClip->state.getChildWithName(te::IDs::SEQUENCE);
    if (!exisiting.isValid()) selectedMidiClip->clearTakes();
    selectedMidiClip->getSequence().clear(nullptr); // is this needed?
}

void FluidOscServer::insertMidiNote(const juce::OSCMessage& message) {
    if(!selectedAudioTrack){
        std::cout << "Cannot insert midi note: No Audio Track selected." << std::endl;
        return;
    }
    if(message.size() < 3){
        std::cout << "Cannot insert midi note: Not enough arguments."<< std::endl;
        return;
    }

    for (const auto& arg : message) { if (!arg.isInt32() && !arg.isFloat32()) return; }
    double startBeat = 0;
    double lengthInBeats = 1;
    int noteNumber = 0;
    int velocity = 64;
    int colorIndex = 0;

    if (message[0].isInt32()) noteNumber = message[0].getInt32();
    else if (message[0].isFloat32()) noteNumber = (int)(message[0].getFloat32());

    if (message[1].isFloat32()) startBeat = message[1].getFloat32();
    else if (message[1].isInt32()) startBeat = message[1].getInt32();

    if (message[2].isFloat32()) lengthInBeats = message[2].getFloat32();
    else if (message[2].isInt32()) lengthInBeats = (int)(message[2].getInt32());

    if (message.size() >= 4) {
        if (message[3].isInt32()) velocity = message[3].getInt32();
        else if (message[3].isFloat32()) velocity = message[3].getFloat32();
    }

    if (message.size() >= 5) {
        if (message[4].isInt32()) colorIndex = message[4].getInt32();
        else if (message[4].isFloat32()) colorIndex = (int)(message[4].getFloat32());
    }

    te::MidiList& notes = selectedMidiClip->getSequence();
    notes.addNote(noteNumber, startBeat, lengthInBeats, velocity, colorIndex, nullptr);
}

void FluidOscServer::insertWaveSample(const juce::OSCMessage& message){
    if (!activeCybrEdit) {
        std::cout << "Cannot insert wave sample: no active edit" << std::endl;
        return;
    }

    if(!selectedAudioTrack){
        std::cout << "Cannot insert wave sample: Must select Audio Track before inserting" << std::endl;
        return;
    }

    if(message.size() < 3){
        std::cout << "Cannot insert wave file: only recieved " << message.size() << "arguments." << std::endl;
        return;
    }

    if (!message[0].isString()) {
        std::cout << "Cannot insert wave file: first argument must be a string" << std::endl;
    }
    String clipName = message[0].getString();

    if (!message[1].isString()) {
        std::cout << "Cannot insert wave file: second argument must be a string" << std::endl;
        return;
    }
    String filePath = message[1].getString();

    if (!message[2].isFloat32() && !message[2].isInt32()) {
        std::cout << "Cannot insert wave file: third argument must be int or float" << std::endl;
    }

    double startBeat = 0;
    if (message[2].isFloat32()) startBeat = message[2].getFloat32();
    else if (message[2].isInt32()) startBeat = message[2].getInt32();
    double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeat);

    File editDirectory = activeCybrEdit->getEdit().editFileRetriever().getParentDirectory();
    File file = editDirectory.getChildFile(filePath);

    // First check if the file is an absolute file, OR was found relative to
    // the edit file directory.
    if (file.existsAsFile()) {
        filePath = file.getFullPathName(); // Found it!
    } else {
        // Look in the sample search path.
        file = CybrSearchPath(CYBR_SAMPLE).find(filePath);
        if (file != File()) filePath = file.getFullPathName(); // Found it!
        else std::cout << "Cannot insert wave file: file not found: " << filePath << std::endl;
    }

    te::AudioFile audiofile(file);
    if(!audiofile.isWavFile()){
        std::cout << "Cannot insert wave file: Must be valid WAV file." << std::endl;
        return;
    }

    te::EditTimeRange timeRange = te::EditTimeRange(startSeconds, startSeconds+audiofile.getLength());

    te::ClipPosition pos;
    pos.time = timeRange;
    selectedAudioTrack->insertWaveClip(clipName, file, pos, false);
}

void FluidOscServer::handleSamplerMessage(const OSCMessage &message) {
    if (!selectedPlugin) {
        std::cout << "Cannot update sampler. No plugin selected." << std::endl;
        return;
    }

    te::SamplerPlugin* sampler = dynamic_cast<te::SamplerPlugin*>(selectedPlugin);
    if (!sampler) {
        std::cout << "Cannot update sampler. No sampler selected." << std::endl;
        return;
    }

    const OSCAddressPattern pattern = message.getAddressPattern();
    if (pattern.matches({"/plugin/sampler/add"})) {
        // Required:
        // 0 - (string) name
        // 1 - (string) filepath
        // 2 - (int) note number
        // Optional:
        // 3 - gain (float, default = 0)
        // 4 - pan (float, default = 0)
        // 5 - oneShot (int, default = 0/false)
        //
        // The filepath can be
        // 1) relative relative to the .tracktionedit file
        // 2) relativeto the server's working directory
        // 3) absolute
        // If the file is not found, it will still be added, but it will not play.
        if (message.size() < 3) {
            std::cout << "Cannot add sampler sound: Not enough arguments" << std::endl;
            return;
        }

        if (!message[0].isString() || !message[1].isString() || ! message[2].isInt32()) {
            std::cout << "Cannot add sampler sound: incorrect arguments" << std::endl;
            return;
        }

        int index = sampler->getNumSounds();
        String soundName = message[0].getString();
        String filePath = message[1].getString();
        int noteNumber = message[2].getInt32();
        double gain = (message.size() >= 4 && message[3].isFloat32()) ? message[3].getFloat32() : 0;
        double pan = (message.size() >= 5 && message[4].isFloat32()) ? message[4].getFloat32() : 0;
        double oneShot = (message.size() >= 6 && message[5].isInt32()) ? message[5].getInt32() : 0;

        File editDirectory = selectedPlugin->edit.editFileRetriever().getParentDirectory();
        File file = editDirectory.getChildFile(filePath);

        // First check if the file is an absolute file, OR was found relative to
        // the edit file directory.
        if (file.existsAsFile()) {
            filePath = file.getFullPathName(); // Found it!
        } else {
            // Look in the sample search path.
            file = CybrSearchPath(CYBR_SAMPLE).find(filePath);
            if (file != File()) filePath = file.getFullPathName(); // Found it!
            else std::cout << "Warning: sampler trying to add sampler sound, but file not found: " << filePath << std::endl;
        }

        sampler->addSound(filePath, soundName, 0, 0, gain);
        sampler->setSoundGains(index, gain, pan);
        sampler->setSoundParams(index, noteNumber, noteNumber, noteNumber);
        sampler->setSoundOpenEnded(index, oneShot);
    } else if (pattern.matches({"/plugin/sampler/clear-all"})) {
        sampler->state.removeAllChildren(nullptr);
    }
}

void FluidOscServer::handleTransportMessage(const OSCMessage& message) {
    if (!activeCybrEdit) return;
    te::TransportControl& transport = activeCybrEdit->getEdit().getTransport();

    const OSCAddressPattern pattern = message.getAddressPattern();
    if (pattern.matches({"/transport/play"})) {
        std::cout << "Play!" << std::endl;
        transport.play(false);
    } else if (pattern.matches({"/transport/stop"})) {
        std::cout << "Stop!" << std::endl;
        transport.stop(false, false);
    } else if (pattern.matches({"/transport/to/seconds"})) {
        if (message.size() < 1 || !message[0].isFloat32()) return;
        transport.setCurrentPosition(message[0].getFloat32());
    } else if (pattern.matches({"/transport/to"})) {
        if (message.size() < 1 || !message[0].isFloat32()) return;
        double beats = message[0].getFloat32();
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(beats);
        transport.setCurrentPosition(startSeconds);
    } else if (pattern.matches({"/transport/loop"})) {
        if (message.size() < 2 || !message[0].isFloat32() || !message[1].isFloat32()) {
            std::cout << "/transport/loop failed - requires loop start and duration" << std::endl;
            return;
        }

        double startBeats = message[0].getFloat32();
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        double durationBeats = message[1].getFloat32();
        double endBeats = startBeats + durationBeats;
        double endSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeats);

        if (durationBeats == 0) {
            // To disable looping specify duration of 0
            std::cout << "Looping disabled!" << std::endl;
            transport.looping.setValue(false, nullptr);
            return;
        }

        te::EditTimeRange range = transport.getLoopRange();
        if (range != te::EditTimeRange(startSeconds, endSeconds)) {
            if (range.getStart() != startSeconds) transport.setLoopIn(startSeconds);
            if (range.getEnd() != endSeconds) transport.setLoopOut(endSeconds);
            std::cout << "Looping start|length: " << startBeats << "|" << endBeats << std::endl;
        }
        // If looping was previously disabled, setting looping to true seems to move the playhead
        // to the start of the loop. This surprised me, but is okay for now. It is probably not the
        // ideal behavior. Setting the loop point should probably never change playback (currently
        // it probably only changes the playback iff we are not already looping, but if we are looping
        // a different region, playback will be unaffected).
        transport.looping.setValue(true, nullptr);
    }
};
