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

typedef void (*OscHandlerFunc)(const juce::OSCMessage&);

struct SelectedObjects {
    te::AudioTrack* audioTrack = nullptr;
    te::Clip* clip = nullptr;
    te::Plugin* plugin = nullptr;
};

class FluidOscServer :
public juce::OSCReceiver,
private juce::OSCReceiver::Listener<juce::OSCReceiver::MessageLoopCallback>
{
public:
    FluidOscServer();
    
    virtual void oscMessageReceived (const juce::OSCMessage& message) override;
    virtual void oscBundleReceived (const juce::OSCBundle& bundle) override;
    
    juce::OSCBundle handleOscBundle(const juce::OSCBundle& bundle, SelectedObjects parentSelection);
    juce::OSCMessage handleOscMessage(const juce::OSCMessage& message);

    // message handlers
    juce::OSCMessage selectAudioTrack(const juce::OSCMessage& message);
    juce::OSCMessage removeAudioTrackClips(const juce::OSCMessage& message);
    juce::OSCMessage removeAudioTrackAutomation(const juce::OSCMessage& message);
    juce::OSCMessage selectReturnTrack(const juce::OSCMessage& message);
    juce::OSCMessage selectMidiClip(const juce::OSCMessage& message);
    juce::OSCMessage selectPlugin(const juce::OSCMessage& message);
    juce::OSCMessage setPluginParam(const juce::OSCMessage& message);
    juce::OSCMessage setPluginParamAt(const juce::OSCMessage& message);
    juce::OSCMessage setTrackWidth(const juce::OSCMessage& message);
//    juce::OSCMessage setTrackWidthAt(const juce::OSCMessage& message); Charles: Decide if this is really needed or not
    juce::OSCMessage setPluginSideChainInput(const juce::OSCMessage& message);
    juce::OSCMessage getPluginReport(const juce::OSCMessage& message);
    juce::OSCMessage getPluginParameterReport(const juce::OSCMessage& message);
    juce::OSCMessage getPluginParametersReport(const juce::OSCMessage& message);
    juce::OSCMessage savePluginPreset(const juce::OSCMessage& message);
    juce::OSCMessage loadPluginPreset(const juce::OSCMessage& message);
    juce::OSCMessage loadPluginTrkpreset(const juce::OSCMessage& message);
    juce::OSCMessage ensureSend(const juce::OSCMessage& message);
    juce::OSCMessage clearMidiClip(const juce::OSCMessage& message);
    juce::OSCMessage insertMidiNote(const juce::OSCMessage& message);
    juce::OSCMessage insertWaveSample(const juce::OSCMessage& message);
    juce::OSCMessage saveActiveEdit(const juce::OSCMessage& message);
    juce::OSCMessage activateEditFile(const juce::OSCMessage& message);
    juce::OSCMessage changeWorkingDirectory(const juce::OSCMessage& message);
    juce::OSCMessage handleSamplerMessage(const juce::OSCMessage& message);
    juce::OSCMessage handleTransportMessage(const juce::OSCMessage& message);
    juce::OSCMessage setTrackGain(const juce::OSCMessage& message);
    juce::OSCMessage setTrackPan(const juce::OSCMessage& message);
    juce::OSCMessage renderRegion(const juce::OSCMessage& message);
    juce::OSCMessage renderClip(const juce::OSCMessage& message);
    juce::OSCMessage setClipLength(const juce::OSCMessage& message);
    juce::OSCMessage trimClipBySeconds(const juce::OSCMessage& message);
    juce::OSCMessage selectClip(const juce::OSCMessage& message);
    juce::OSCMessage offsetClipSourceInSeconds(const juce::OSCMessage& message);
    juce::OSCMessage audioClipFadeInOutSeconds(const juce::OSCMessage& message);
    juce::OSCMessage setClipDb(const juce::OSCMessage& message);
    juce::OSCMessage setTempo(const juce::OSCMessage& message);
    juce::OSCMessage clearContent(const juce::OSCMessage& message);
    juce::OSCMessage getAudioFileReport(const juce::OSCMessage& message);

    // everything else
    juce::OSCMessage muteTrack(bool mute);
    juce::OSCMessage reverseAudioClip(bool reverse);
    juce::OSCMessage activateEditFile(juce::File file, bool forceEmptyEdit = false);
    std::unique_ptr<CybrEdit> activeCybrEdit = nullptr;

    SelectedObjects getSelectedObjects();

private:

    /** Recursively handle all messages and nested bundles, reseting the
     selection state to parentSelection after each bundle. This should ensure
     that nested bundles do not leave behind a selection after they have been
     handled. */

    void constructReply(juce::OSCMessage &reply, int error, juce::String message);
    void constructReply(juce::OSCMessage &reply, juce::String message);
    
    te::AudioTrack* selectedAudioTrack = nullptr;
    te::Clip* selectedClip = nullptr;
    te::Plugin* selectedPlugin = nullptr;
};

