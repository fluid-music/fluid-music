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
    selectedMidiClip->clearTakes(); // I do not understand what clearTakes does
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
