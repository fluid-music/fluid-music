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

    if (!activeCybrEdit) {
        std::cout << "NOTE: message failed, because there is no active CybrEdit: ";
        printOscMessage(message);
        return;
    }

    if (msgAddressPattern.matches({"/midiclip/n"})) return insertMidiNote(message);
    if (msgAddressPattern.matches({"/midiclip/select"})) return selectMidiClip(message);
    if (msgAddressPattern.matches({"/midiclip/clear"})) return clearMidiClip(message);
    if (msgAddressPattern.matches({"/plugin/select"})) return selectPlugin(message);
    if (msgAddressPattern.matches({"/plugin/param/set"})) return setPluginParam(message);
    if (msgAddressPattern.matches({"/plugin/save"})) return savePluginPreset(message);
    if (msgAddressPattern.matches({"/plugin/load"})) return loadPluginPreset(message);
    if (msgAddressPattern.toString().startsWith("/plugin/sampler")) return handleSamplerMessage(message);
    if (msgAddressPattern.matches({"/audiotrack/select"})) return selectAudioTrack(message);
    if (msgAddressPattern.matches({"/save"})) return saveActiveEdit(message);
    if (msgAddressPattern.matches({"/cd"})) return changeWorkingDirectory(message);
    if (msgAddressPattern.toString().startsWith({"/transport"})) return handleTransportMessage(message);
}

void FluidOscServer::saveActiveEdit(const juce::OSCMessage &message) {
    if (!activeCybrEdit) return;

    // If the first argument is string it is a filename
    File file = (message.size() && message[0].isString())
    ? File::getCurrentWorkingDirectory().getChildFile(message[0].getString())
    : activeCybrEdit->getEdit().editFileRetriever();

    // By default use relative file paths. If the second arg begins with 'a', use absolute paths
    bool useRelativePaths = true;
    if (message.size() >= 2
        && message[1].isString()
        && message[1].getString().startsWithIgnoreCase({"a"}))
        useRelativePaths = false;

    activeCybrEdit->saveActiveEdit(file, useRelativePaths);
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
    if (!selectedPlugin) return;
    if (message.size() < 1 || !message[0].isString()) return;
    saveTracktionPreset(selectedPlugin, message[0].getString());
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
    File file = File::getCurrentWorkingDirectory().getChildFile(filename);
    ValueTree v = loadXmlFile(file);

    if (!v.isValid()) {
        std::cout << "Cannot load plugin preset: Failed to load and parse file" << std::endl;
        return;
    }

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

        if (te::Plugin* plugin = getOrCreatePluginByName(*selectedAudioTrack, name, type)) {
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

            // Now copy over everything else from the preset. This should inlude the
            // all-important 'state' property of external plugins. External plugins also
            // have some mundane properties like windowLocked="1", enabled="1"
            plugin->restorePluginStateFromValueTree(preset);

            std::cout
                << "Track: " << selectedAudioTrack->getName()
                << " loaded preset: " << file.getFullPathName() << std::endl;
        } else {
            std::cout << "Cannot load plugin preset: failed to create plugin with type/name: " << type << "/" << name << std::endl;
            continue;
        };
    }
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
    selectedMidiClip->clearTakes();
    selectedMidiClip->getSequence().clear(nullptr);
}

void FluidOscServer::insertMidiNote(const juce::OSCMessage& message) {
    if (!selectedMidiClip) return;
    if (message.size() < 3) return;

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

        if (!selectedPlugin->edit.filePathResolver(filePath).existsAsFile()) {
            std::cout << "Warning: sampler trying to add sound, but file not found" << std::endl;
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

        std::cout << "Looping start|length: " << startBeats << "|" << endBeats << std::endl;
        transport.setLoopIn(startSeconds);
        transport.setLoopOut(endSeconds);
        // If looping was previously disabled, setting looping to true seems to move the playhead
        // to the start of the loop. This surprised me, but is okay for now. It is probably not the
        // ideal behavior. Setting the loop point should probably never change playback (currently
        // it probably only changes the playback iff we are not already looping, but if we are looping
        // a different region, playback will be unaffected).
        transport.looping.setValue(true, nullptr);
    }
};
