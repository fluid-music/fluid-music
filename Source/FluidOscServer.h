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
#include "CybrSearchPath.h"

typedef void (*OscHandlerFunc)(const OSCMessage&);

struct SelectedObjects {
    te::AudioTrack* audioTrack = nullptr;
    te::Clip* clip = nullptr;
    te::Plugin* plugin = nullptr;
};

class FluidOscServer :
    public OSCReceiver,
    private OSCReceiver::Listener<OSCReceiver::MessageLoopCallback>
{
public:
    FluidOscServer();
    
    virtual void oscMessageReceived (const OSCMessage& message) override;
    virtual void oscBundleReceived (const OSCBundle& bundle) override;
    
    OSCBundle handleOscBundle(const OSCBundle& bundle, SelectedObjects parentSelection);
    OSCMessage handleOscMessage(const OSCMessage& message);

    // message handlers
    OSCMessage selectAudioTrack(const OSCMessage& message);
    OSCMessage removeAudioTrackClips(const OSCMessage& message);
    OSCMessage selectReturnTrack(const OSCMessage& message);
    OSCMessage selectMidiClip(const OSCMessage& message);
    OSCMessage selectPlugin(const OSCMessage& message);
    OSCMessage setPluginParam(const OSCMessage& message);
    OSCMessage setPluginParamAt(const OSCMessage& message);
    OSCMessage setPluginSideChainInput(const OSCMessage& message);
    OSCMessage savePluginPreset(const OSCMessage& message);
    OSCMessage loadPluginPreset(const OSCMessage& message);
    OSCMessage loadPluginTrkpreset(const OSCMessage& message);
    OSCMessage ensureSend(const OSCMessage& message);
    OSCMessage clearMidiClip(const OSCMessage& message);
    OSCMessage insertMidiNote(const OSCMessage& message);
    OSCMessage insertWaveSample(const OSCMessage& message);
    OSCMessage saveActiveEdit(const OSCMessage& message);
    OSCMessage activateEditFile(const OSCMessage& message);
    OSCMessage changeWorkingDirectory(const OSCMessage& message);
    OSCMessage handleSamplerMessage(const OSCMessage& message);
    OSCMessage handleTransportMessage(const OSCMessage& message);
    OSCMessage setTrackGain(const OSCMessage& message);
    OSCMessage renderRegion(const OSCMessage& message);
    OSCMessage renderClip(const OSCMessage& message);
    OSCMessage setClipLength(const OSCMessage& message);
    OSCMessage trimClipBySeconds(const OSCMessage& message);
    OSCMessage selectClip(const OSCMessage& message);
    OSCMessage offsetClipSourceInSeconds(const OSCMessage& message);
    OSCMessage audioClipFadeInOutSeconds(const OSCMessage& message);
    OSCMessage setClipDb(const OSCMessage& message);
    OSCMessage setTempo(const OSCMessage& message);

    // everything else
    OSCMessage muteTrack(bool mute);
    OSCMessage reverseAudioClip(bool reverse);
    OSCMessage activateEditFile(File file, bool forceEmptyEdit = false);
    std::unique_ptr<CybrEdit> activeCybrEdit = nullptr;

    SelectedObjects getSelectedObjects();

private:

    /** Recursively handle all messages and nested bundles, reseting the
     selection state to parentSelection after each bundle. This should ensure
     that nested bundles do not leave behind a selection after they have been
     handled. */

    void constructReply(OSCMessage &reply, int success, String message);
    void constructReply(OSCMessage &reply, String message);
    
    te::AudioTrack* selectedAudioTrack = nullptr;
    te::Clip* selectedClip = nullptr;
    te::Plugin* selectedPlugin = nullptr;
};

