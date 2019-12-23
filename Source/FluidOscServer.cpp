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
        std::cout << "NOTE:  message failed , because there is no active CybrEdit: ";
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
    if (msgAddressPattern.matches({"/audiotrack/select"})) return selectAudioTrack(message);
    if (msgAddressPattern.matches({"/save"})) return saveActiveEdit(message);
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

void FluidOscServer::selectAudioTrack(const juce::OSCMessage &message) {
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
            param->setNormalisedParameter(paramValue, NotificationType::dontSendNotification);
            param->endParameterChangeGesture();
            std::cout << "set " << paramName << " to " << paramValue << std::endl;
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

    for (auto child : v) {
        if (!child.hasType(te::IDs::PLUGIN)) continue;
        if (!child.hasProperty(te::IDs::name) || !child.hasProperty(te::IDs::type)) continue;
        const String type = child[te::IDs::type];
        const String name = child[te::IDs::name];
        const var state = child[te::IDs::state];

        if (!child[te::IDs::type].isString() || !child[te::IDs::name].isString()) {
            std::cout << "Cannot load plugin preset: plugin has invalid type/name: " << name <<  "/" << type << std::endl;
            continue;
        }
        if (state.isVoid() || !state.isString()) {
            std::cout << "Cannot load plugin preset: plugin preset has invalid state property" << std::endl;
            continue;
        }

        std::cout << "Found preset: " << name << " - " << type << std::endl;

        if (te::Plugin* plugin = getOrCreatePluginByName(*selectedAudioTrack, name, type)) {
            // Here I copy the state over, but note that there are other properties
            // that might be worth copying as well. However, we probably do not want
            // to copy everything, for example the "name" and "type" should already
            // be valid, because they were retrieved with getOrCreatePluginByName.
            // We definitely do not want to copy the "uid", because if we use the one
            // that was created for us it will definitely be unique.
            // The "filename" we definitely do not want to copy, becasue it may be
            // different on this machine than on others.
            //
            // Things that we should maybe consider copying:
            // windowLocked="1" enabled="1" programNum="0"
            plugin->state.setProperty(te::IDs::state, state, nullptr);
            std::cout
                << "Track: " << selectedAudioTrack->getName()
                << " loaded preset: " << file.getFullPathName() << std::endl;
        } else {
            std::cout << "Cannot load plugin preset: failed to create plugin with type/name" << name <<  "/" << type << std::endl;
            continue;
        };
    }
}

void FluidOscServer::selectMidiClip(const juce::OSCMessage &message) {
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

void FluidOscServer::clearMidiClip(const juce::OSCMessage &message) {
    if (!selectedMidiClip) return;
    selectedMidiClip->clearTakes();
    selectedMidiClip->getSequence().clear(nullptr);
}

void FluidOscServer::insertMidiNote(const juce::OSCMessage &message) {
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

