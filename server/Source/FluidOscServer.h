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

typedef void (*OscHandlerFunc)(const cybr::OSCMessage&);

struct SelectedObjects {
    te::Track* audioTrack = nullptr;
    te::Clip* clip = nullptr;
    te::Plugin* plugin = nullptr;
};

class FluidOscServer :
public cybr::OSCReceiver,
private cybr::OSCReceiver::Listener<cybr::OSCReceiver::MessageLoopCallback>
{
public:
    FluidOscServer();
    
    virtual void oscMessageReceived (const cybr::OSCMessage& message) override;
    virtual void oscBundleReceived (const cybr::OSCBundle& bundle) override;

    /** Recursively handle all messages and nested bundles, reseting the
     selection state to parentSelection after each bundle. This should ensure
     that nested bundles do not leave behind a selection after they have been
     handled. */
    cybr::OSCBundle handleOscBundle(const cybr::OSCBundle& bundle, SelectedObjects parentSelection);
    cybr::OSCMessage handleOscMessage(const cybr::OSCMessage& message);

    // message handlers
    cybr::OSCMessage selectAudioTrack(const cybr::OSCMessage& message);
    cybr::OSCMessage selectSubmixTrack(const cybr::OSCMessage& message);
    cybr::OSCMessage removeAudioTrackClips(const cybr::OSCMessage& message);
    cybr::OSCMessage removeAudioTrackAutomation(const cybr::OSCMessage& message);
    cybr::OSCMessage selectReturnTrack(const cybr::OSCMessage& message);
    cybr::OSCMessage selectMidiClip(const cybr::OSCMessage& message);
    cybr::OSCMessage selectPlugin(const cybr::OSCMessage& message);
    cybr::OSCMessage selectVst2PluginById(const cybr::OSCMessage& message);
    cybr::OSCMessage loadVst2PresetInSelectedPlugin(const cybr::OSCMessage& message);
    cybr::OSCMessage setPluginParam(const cybr::OSCMessage& message);
    cybr::OSCMessage setPluginParamAt(const cybr::OSCMessage& message);
    cybr::OSCMessage setTrackWidth(const cybr::OSCMessage& message);
    cybr::OSCMessage setPluginSideChainInput(const cybr::OSCMessage& message);
    cybr::OSCMessage getPluginReport(const cybr::OSCMessage& message);
    cybr::OSCMessage getPluginParameterReport(const cybr::OSCMessage& message);
    cybr::OSCMessage getPluginParametersReport(const cybr::OSCMessage& message);
    cybr::OSCMessage savePluginPreset(const cybr::OSCMessage& message);
    cybr::OSCMessage loadPluginPreset(const cybr::OSCMessage& message);
    cybr::OSCMessage loadPluginTrkpreset(const cybr::OSCMessage& message);
    cybr::OSCMessage ensureSend(const cybr::OSCMessage& message);
    cybr::OSCMessage clearMidiClip(const cybr::OSCMessage& message);
    cybr::OSCMessage insertMidiNoteBeats(const cybr::OSCMessage& message);
    cybr::OSCMessage insertMidiNote(const cybr::OSCMessage& message);
    cybr::OSCMessage insertWaveSample(const cybr::OSCMessage& message);
    cybr::OSCMessage saveActiveEdit(const cybr::OSCMessage& message);
    cybr::OSCMessage activateEditFile(const cybr::OSCMessage& message);
    cybr::OSCMessage changeWorkingDirectory(const cybr::OSCMessage& message);
    cybr::OSCMessage handleSamplerMessage(const cybr::OSCMessage& message);
    cybr::OSCMessage handleTransportMessage(const cybr::OSCMessage& message);
    cybr::OSCMessage setTrackGain(const cybr::OSCMessage& message);
    cybr::OSCMessage setTrackPan(const cybr::OSCMessage& message);
    cybr::OSCMessage renderRegion(const cybr::OSCMessage& message);
    cybr::OSCMessage renderClip(const cybr::OSCMessage& message);
    cybr::OSCMessage setClipLengthBeats(const cybr::OSCMessage& message);
    cybr::OSCMessage setClipLengthSeconds(const cybr::OSCMessage& message);
    cybr::OSCMessage trimClipBySeconds(const cybr::OSCMessage& message);
    cybr::OSCMessage selectClip(const cybr::OSCMessage& message);
    cybr::OSCMessage offsetClipSourceInSeconds(const cybr::OSCMessage& message);
    cybr::OSCMessage audioClipFadeInOutSeconds(const cybr::OSCMessage& message);
    cybr::OSCMessage setClipDb(const cybr::OSCMessage& message);
    cybr::OSCMessage setClipPitch(const cybr::OSCMessage& message);
    cybr::OSCMessage setClipStretchMode(const juce::OSCMessage& message);
    cybr::OSCMessage setClipSpeedRatio(const juce::OSCMessage& message);
    cybr::OSCMessage setTempo(const cybr::OSCMessage& message);
    cybr::OSCMessage clearContent(const cybr::OSCMessage& message);
    cybr::OSCMessage getAudioFileReport(const cybr::OSCMessage& message);
    cybr::OSCMessage setTimeSignatureAt(const cybr::OSCMessage& message);

    // everything else
    cybr::OSCMessage muteTrack(bool mute);
    cybr::OSCMessage reverseAudioClip(bool reverse);
    cybr::OSCMessage activateEditFile(juce::File file, bool forceEmptyEdit = false);
    std::unique_ptr<CybrEdit> activeCybrEdit = nullptr;

    SelectedObjects getSelectedObjects();

private:

    void constructReply(cybr::OSCMessage &reply, int error, juce::String message);
    void constructReply(cybr::OSCMessage &reply, juce::String message);
    
    te::Track* selectedTrack = nullptr;
    te::Clip* selectedClip = nullptr;
    te::Plugin* selectedPlugin = nullptr;
};

