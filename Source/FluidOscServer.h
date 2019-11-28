/*
  ==============================================================================

    FluidOscServer.h
    Created: 18 Nov 2019 5:50:15pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "cybr_helpers.h"
#include "CybrEdit.h"

typedef void (*OscHandlerFunc)(const OSCMessage&);

class FluidOscServer :
    public OSCReceiver,
    private OSCReceiver::Listener<OSCReceiver::MessageLoopCallback>
{
public:
    FluidOscServer();
    virtual void oscMessageReceived (const OSCMessage& message) override;
    virtual void oscBundleReceived (const OSCBundle& bundle) override;

    // message handlers
    void selectAudioTrack(const OSCMessage& message);
    void selectMidiClip(const OSCMessage& message);
    void clearMidiClip(const OSCMessage& message);
    void insertMidiNote(const OSCMessage& message);
    void saveActiveEdit(const OSCMessage& message);

    std::unique_ptr<CybrEdit> activeCybrEdit = nullptr;
private:
    te::AudioTrack* selectedAudioTrack = nullptr;
    te::MidiClip* selectedMidiClip = nullptr;
};
