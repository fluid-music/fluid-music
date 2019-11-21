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

void FluidOscServer::oscMessageReceived (const OSCMessage& message) {
    const OSCAddressPattern msgAddressPattern = message.getAddressPattern();

    if (msgAddressPattern.matches({"/test"})) {
        printOscMessage(message);
    }

    if (!activeCybrEdit) return; // Subsequent patterns require an activeCybrEdit

    if (msgAddressPattern.matches({"/insert"})) {
        String name = (message.size() && message[0].isString())
            ? message[0].getString()
            : String{ "Fluid Clip" };
        te::MidiClip::Ptr clip = activeCybrEdit->getOrCreateMidiClipWithName(name);
        te::MidiList& notes = clip.get()->getSequence();
        notes.addNote(36, 1, 1, 127, 0, nullptr);
    }

    if (msgAddressPattern.matches({"/save"})) {
        File file = (message.size() && message[0].isString())
            ? File{message[0].getString()}
            : activeCybrEdit->getEdit().editFileRetriever();
        activeCybrEdit->saveActiveEdit(file);
    }
}
