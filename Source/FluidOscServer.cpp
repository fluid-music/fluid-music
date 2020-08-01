/*
  ==============================================================================

    FluidOscServer.cpp
    Created: 18 Nov 2019 5:50:15pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "FluidOscServer.h"

#if (JUCE_PLUGINHOST_VST3)
#include <pluginterfaces/vst/ivstcomponent.h>
#include <public.sdk/source/common/memorystream.h>
#endif

using namespace juce;

//==============================================================================
FluidOscServer::FluidOscServer() {
    addListener (this);
}

void FluidOscServer::oscBundleReceived(const OSCBundle &bundle){
    SelectedObjects obj;
    handleOscBundle(bundle, obj);
}

void FluidOscServer::oscMessageReceived(const OSCMessage &message){
    handleOscMessage(message);
}

void FluidOscServer::constructReply(OSCMessage &reply, int success, String message){
    reply.addInt32(success);
    reply.addString(message);
    std::cout<<message<<std::endl;
}

void FluidOscServer::constructReply(OSCMessage &reply, String message){
    reply.addString(message);
    std::cout<<message<<std::endl;
}

SelectedObjects FluidOscServer::getSelectedObjects() {
    return { selectedAudioTrack, selectedClip, selectedPlugin };
}

OSCBundle FluidOscServer::handleOscBundle(const OSCBundle &bundle, SelectedObjects parentSelection) {
    SelectedObjects currBundle = parentSelection;
    OSCBundle reply;
    for (const auto& element: bundle) {
        if (element.isMessage()) {
            // allow messages to update the current selection ("currBundle")
            OSCMessage replyMessage = handleOscMessage(element.getMessage());
            currBundle.audioTrack = selectedAudioTrack;
            currBundle.clip = selectedClip;
            currBundle.plugin = selectedPlugin;
            reply.addElement(replyMessage);
        } else if (element.isBundle()) {
            // After processing a bundle, selection will reset to "currBundle"
            OSCBundle replyBundle = handleOscBundle(element.getBundle(), currBundle);
            reply.addElement(replyBundle);
        }
    }

    selectedAudioTrack = parentSelection.audioTrack;
    selectedClip = parentSelection.clip;
    selectedPlugin = parentSelection.plugin;
    return reply;
}

OSCMessage FluidOscServer::handleOscMessage (const OSCMessage& message) {
    const OSCAddressPattern msgAddressPattern = message.getAddressPattern();

    if (msgAddressPattern.matches({"/test"}) || msgAddressPattern.matches({"/print"})) {
        printOscMessage(message);
        return message;
    }
    if (msgAddressPattern.matches({"/file/activate"})) return activateEditFile(message);

    if (!activeCybrEdit) {
        std::cout << "NOTE: message failed, because there is no active CybrEdit: ";
        printOscMessage(message);
        OSCMessage error("/error");
        constructReply(error, 1, "Cannot select audio track: no track name provided");
        return error;
    }

    if (msgAddressPattern.matches({"/midiclip/insert/note"})) return insertMidiNote(message);
    if (msgAddressPattern.matches({"/midiclip/select"})) return selectMidiClip(message);
    if (msgAddressPattern.matches({"/midiclip/clear"})) return clearMidiClip(message);
    if (msgAddressPattern.matches({"/plugin/select"})) return selectPlugin(message);
    if (msgAddressPattern.matches({"/plugin/param/set"})) return setPluginParam(message);
    if (msgAddressPattern.matches({"/plugin/param/set/at"})) return setPluginParamAt(message);
    if (msgAddressPattern.matches({"/plugin/sidechain/input/set" })) return setPluginSideChainInput(message);
    if (msgAddressPattern.matches({"/plugin/save"})) return savePluginPreset(message);
    if (msgAddressPattern.matches({"/plugin/load/trkpreset"})) return loadPluginTrkpreset(message);
    if (msgAddressPattern.matches({"/plugin/load"})) return loadPluginPreset(message);
    if (msgAddressPattern.matches({"/plugin/report"})) return getPluginReport(message);
    if (msgAddressPattern.matches({"/plugin/param/report"})) return getPluginParamReport(message);
    if (msgAddressPattern.toString().startsWith("/plugin/sampler")) return handleSamplerMessage(message);
    if (msgAddressPattern.matches({"/audiotrack/select"})) return selectAudioTrack(message);
    if (msgAddressPattern.matches({"/audiotrack/select/return"})) return selectReturnTrack(message);
    if (msgAddressPattern.matches({"/audiotrack/set/db"})) return setTrackGain(message);
    if (msgAddressPattern.matches({"/audiotrack/send/set/db"})) return ensureSend(message);
    if (msgAddressPattern.matches({"/audiotrack/remove/clips"})) return removeAudioTrackClips(message);
    if (msgAddressPattern.matches({"/audiotrack/remove/automation"})) return removeAudioTrackAutomation(message);
    if (msgAddressPattern.matches({"/audiotrack/insert/wav"})) return insertWaveSample(message);
    if (msgAddressPattern.matches({"/audiotrack/mute"})) return muteTrack(true);
    if (msgAddressPattern.matches({"/audiotrack/unmute"})) return muteTrack(false);
    if (msgAddressPattern.matches({"/audiotrack/region/render"})) return renderRegion(message);
    if (msgAddressPattern.matches({"/file/save"})) return saveActiveEdit(message);
    if (msgAddressPattern.matches({"/cd"})) return changeWorkingDirectory(message);
    if (msgAddressPattern.toString().startsWith({"/transport"})) return handleTransportMessage(message);
    if (msgAddressPattern.matches({"/clip/render"})) return renderClip(message);
    if (msgAddressPattern.matches({"/clip/set/length"})) return setClipLength(message);
    if (msgAddressPattern.matches({"/clip/select"})) return selectClip(message);
    if (msgAddressPattern.matches({"/clip/trim/seconds"})) return trimClipBySeconds(message);
    if (msgAddressPattern.matches({"/clip/source/offset/seconds"})) return offsetClipSourceInSeconds(message);
    if (msgAddressPattern.matches({"/audioclip/set/db"})) return setClipDb(message);
    if (msgAddressPattern.matches({"/audioclip/reverse"})) return reverseAudioClip(true);
    if (msgAddressPattern.matches({"/audioclip/unreverse"})) return reverseAudioClip(false);
    if (msgAddressPattern.matches({"/audioclip/fade/seconds"})) return audioClipFadeInOutSeconds(message);
    if (msgAddressPattern.matches({"/tempo/set/"})) return setTempo(message);
    if (msgAddressPattern.matches({"/content/clear"})) return clearContent(message);

    printOscMessage(message);
    OSCMessage error("/error");
    constructReply(error, 1, "Unhandled Message");
    return error;
}

OSCMessage FluidOscServer::clearContent(const OSCMessage& message) {
    OSCMessage reply("/content/clear/reply");
    if (!activeCybrEdit) {
        constructReply(reply, 1, "Cannot clear content: No active edit");
        return reply;
    }

    for (auto track : te::getClipTracks(activeCybrEdit->getEdit())) {
        removeAllClipsFromTrack(*track);
        removeAllPluginAutomationFromTrack(*track);
    }

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::removeAudioTrackClips(const OSCMessage& message) {
    OSCMessage reply("/audiotrack/remove/clips/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot remove audio track clips: no track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }
    removeAllClipsFromTrack(*selectedAudioTrack);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::removeAudioTrackAutomation(const OSCMessage& message) {
    OSCMessage reply("/audiotrack/remove/automation/reply");

    if (!selectedAudioTrack) {
        String errorString = "Cannot remove audio track automation: no track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }
    removeAllPluginAutomationFromTrack(*selectedAudioTrack);

    reply.addInt32(0);
    return reply;
}


OSCMessage FluidOscServer::setClipDb(const OSCMessage& message) {
    OSCMessage reply("/audioclip/set/db/reply");

    if (!selectedClip) {
        String errorString = "Cannot set audio clip gain: no clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto* audioClip = dynamic_cast<te::AudioClipBase*>(selectedClip);
    if (!audioClip) {
        String errorString = "Cannot set audio clip gain: selected clip is not an audio clip";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isFloat32()) {
        String errorString = "Cannot set audio clip gain: missing db float argument";
        constructReply(reply, 1, errorString);
        return reply;
    }

    double dBFS = message[0].getFloat32();
    if (dBFS > 40) {
        String errorString = "Cannot set audio clip gain: " + String(dBFS) + "db is dangerously loud";
        constructReply(reply, 1, errorString);
        return reply;
    }

    audioClip->setGainDB(dBFS);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::audioClipFadeInOutSeconds(const OSCMessage& message) {
    OSCMessage reply("/audioclip/fade/seconds/reply");
    if (!selectedClip) {
        String errorString = "Cannot setup audio clip fade in/out: no clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto* audioClip = dynamic_cast<te::WaveAudioClip*>(selectedClip);
    if (!audioClip) {
        String errorString = "Cannot setup audio clip fade in/out: selected clip is not an audio clip";
        constructReply(reply, 1, errorString);
        return reply;
    }

    // All args optional
    // 0 - fade In  TIME
    // 1 - fade Out TIME

    if (message.size() >= 1 && message[0].isFloat32()) {
        double fadeInTime = message[0].getFloat32();
        audioClip->setFadeIn(fadeInTime);
        if (message.size() >= 3 && message[2].isFloat32()) {
            // TODO: Set type?
        }
    }

    if (message.size() >= 2 && message[1].isFloat32()) {
        double fadeOutTime = message[1].getFloat32();
        audioClip->setFadeOut(fadeOutTime);
        if (message.size() >= 4 && message[3].isFloat32()) {
            // TODO Set fade type?
        }
    }
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::reverseAudioClip(bool reverse) {
    OSCMessage reply("/audioclip/reverse/reply");
    if (!selectedClip) {
        String errorString = "Cannot update clip reverse status: no clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto* audioClip = dynamic_cast<te::WaveAudioClip*>(selectedClip);
    if (!audioClip) {
        String errorString = "Cannot update clip reverse status: selected clip is not an audio clip";
        constructReply(reply, 1, errorString);
        return reply;
    }
    if (reverse == audioClip->getIsReversed()){
        reply.addInt32(0);
        return reply;
    }

    // All the durations below are measured in seconds (after the speedRatio has
    // been applied).
    //
    // The algorithm for reversing is the same, weather we are reversing, or
    // "unreversing." Annoyingly, the clip->getSourceLength method returns 0
    // if the clip is already reversed, so the if(reverse) block is used to
    // ensure that getSourceLength is only called when the clip is in an
    // unreversed state.
    //
    // The algorithm works when the clip's speedRatio is adjusted. However, I
    // have not tested it with more complicated time streching, such as when
    // clip effects are used to automate playback speed. Preliminary tests
    // suggest that in Tracktion Waveform, clip effects are deactivated when the
    // clip is reversed.

    te::ClipPosition pos = audioClip->getPosition();
    double speedRatio = audioClip->getSpeedRatio();
    double length = pos.getLength();
    double startInSource = pos.getOffset(); // after stretch

    if (reverse) {
        double sourceLength = audioClip->getSourceLength() / speedRatio;
        double tailSize = sourceLength - (startInSource + length);
        audioClip->setIsReversed(reverse);
        audioClip->setOffset(tailSize);
    } else {
        audioClip->setIsReversed(reverse);
        double sourceLength = audioClip->getSourceLength() / speedRatio;
        double tailSize = sourceLength - (startInSource + length);
        audioClip->setOffset(tailSize);
    }

    // Also switch fade in/out
    double fadeInTime = audioClip->getFadeIn();
    auto fadeInType = audioClip->getFadeInType();
    audioClip->setFadeIn(audioClip->getFadeOut());
    audioClip->setFadeInType(audioClip->getFadeOutType());
    audioClip->setFadeOut(fadeInTime);
    audioClip->setFadeOutType(fadeInType);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::offsetClipSourceInSeconds(const juce::OSCMessage& message) {
    OSCMessage reply("/clip/source/offset/seconds/reply");
    if (!selectedClip) {
        String errorString = "Cannot set clip source offset: no clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isFloat32()) {
        String errorString = "Cannot set clip source offset: missing offset value";
        constructReply(reply, 1, errorString);
        return reply;
    }
    double newOffset = message[0].getFloat32();
    selectedClip->setOffset(newOffset);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::trimClipBySeconds(const juce::OSCMessage& message) {
    OSCMessage reply("/clip/trim/seconds/reply");
    if (!selectedClip) {
        String errorString = "Cannot trim clip: No clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    double startTrim = (message.size() >= 1 && message[0].isFloat32()) ? message[0].getFloat32() : 0;
    double endTrim =   (message.size() >= 2 && message[1].isFloat32()) ? message[1].getFloat32() : 0;
    te::EditTimeRange currentRange = selectedClip->getEditTimeRange();
    te::EditTimeRange newRange {currentRange.start + startTrim, currentRange.end - endTrim};

    if (newRange.getLength() <= 0) {
        String errorString = "Cannot trim clip: duration of trimmed clip would be sub-zero";
        constructReply(reply, 1, errorString);
        return reply;
    }
    // verify: does this work when the new start is after the old end, but before the new end????
    selectedClip->setStart(newRange.start, true, false);
    selectedClip->setEnd(newRange.end, true);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::setClipLength(const juce::OSCMessage& message) {
    OSCMessage reply("/clip/set/length/reply");
    if (!selectedClip) {
        String errorString = "Cannot set clip length: No clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isFloat32()) {
        String errorString = "Cannot set clip length: First argument must be a float duration";
        constructReply(reply, 1, errorString);
        return reply;
    }

    bool trimStart = false;
    if (message.size() >= 2 && message[1].isString()) {
        if (message[1].getString().toLowerCase().startsWithChar('s')) {
            trimStart = true;
        }
    }
    double durationInQuarterNotes = message[0].getFloat32() * 4.0;

    if (durationInQuarterNotes <= 0) {
        String errorString = "Cannot set clip length: duration argument must be greater than 0";
        constructReply(reply, 1, errorString);
        return reply;
    }

    te::EditTimeRange currentRange = selectedClip->getEditTimeRange();
    double startBeat = selectedClip->getStartBeat();
    double endBeat = selectedClip->getEndBeat();

    if (trimStart) {
        double newStartBeat = endBeat - durationInQuarterNotes;
        double newStartSeconds = selectedClip->edit.tempoSequence.beatsToTime(newStartBeat);
        selectedClip->setStart(newStartSeconds, true, false);
    } else {
        double newEndBeat = startBeat + durationInQuarterNotes;
        double newEndSeconds = selectedClip->edit.tempoSequence.beatsToTime(newEndBeat);
        double newDuration = newEndSeconds - currentRange.start;

         if (newDuration > selectedClip->getMaximumLength()) {
            newEndSeconds = currentRange.start + selectedClip->getMaximumLength();
            newEndBeat = selectedClip->edit.tempoSequence.timeToBeats(newEndSeconds);
        }
        selectedClip->setEnd(newEndSeconds, true);
    }

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::selectClip(const juce::OSCMessage& message) {
    OSCMessage reply("/clip/select/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot select clip: No audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }
    if (!message.size() || !message[0].isString()) {
        String errorString = "Cannot select clip: First argument must be clip name string";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String clipName = message[0].getString();
    for (auto clip : selectedAudioTrack->getClips()) {
        if (clip->getName().equalsIgnoreCase(clipName)) {
            selectedClip = clip;
            String replyString = "Selected " + clip->getName()
             + " (" + clip->state.getType().toString() + ") on "
            + selectedAudioTrack->getName();
            constructReply(reply, 0, replyString);
            return reply;
        }
    }

    String errorString = "Cannot select clip: \"" + clipName
    + "\" not found on track " + selectedAudioTrack->getName();
    constructReply(reply, 1, errorString);
    return reply;
}

OSCMessage FluidOscServer::renderRegion(const OSCMessage& message) {
    // Args
    // 0 - (string, required) output filename
    // 1 - (float, optional) start wholeNotes
    // 2 - (float, optional) duration in wholeNotes
    // If both 1 and 2 are floats, render this time range. Otherwise,
    // render the edit loop region.
    OSCMessage reply("/audiotrack/region/render/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot render track region: No selected track";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (message.size() < 1 || !message[0].isString()) {
        String errorString = "Cannot render track region: Missing filename";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String filename = message[0].getString();
    File outputFile = selectedAudioTrack->edit.filePathResolver(filename);

    te::TransportControl& transport = selectedAudioTrack->edit.getTransport();
    te::EditTimeRange range = transport.getLoopRange();

    if (message.size() >= 3 && message[1].isFloat32() && message[2].isFloat32()) {
        double startBeats = message[1].getFloat32() * 4.0;
        double durationBeats = message[2].getFloat32() * 4.0;
        double endBeats = startBeats + durationBeats;
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        double endSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeats);
        range.start = startSeconds;
        range.end = endSeconds;
    }
    renderTrackRegion(outputFile, *selectedAudioTrack, range);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::renderClip(const juce::OSCMessage &message) {
    // Args
    // 0 - (string, required) output filename
    // 1 - (float, optional) tail in seconds
    OSCMessage reply("/clip/render/reply");
    if (message.size() < 1 || !message[0].isString()) {
        String errorString = "Cannot render track region: Missing filename";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String filename = message[0].getString();
    File outputFile = selectedAudioTrack->edit.filePathResolver(filename);

    if (!selectedClip) {
        String errorString = "Cannot render selected clip: No clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    te::Track* track = selectedClip->getTrack();
    if (!track) {
        jassert(false);
        String errorString = "Cannot render clip region: Failed to get clip's track";
        constructReply(reply, 1, errorString);
        return reply;
    }

    double tail = (message.size() >= 2 && message[1].isFloat32()) ? message[1].getFloat32() : 0;
    te::EditTimeRange range = selectedClip->getEditTimeRange();
    range.end += tail;

    renderTrackRegion(outputFile, *track, range);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::saveActiveEdit(const juce::OSCMessage &message) {
    OSCMessage reply("/file/save/reply");
    if (!activeCybrEdit) {
        String errorString = "Cannot save active edit: No active edit";
        constructReply(reply, 1, errorString);
        return reply;
    }

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
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::activateEditFile(File file, bool forceEmptyEdit) {
    OSCMessage reply("/file/activate/reply");
    if (forceEmptyEdit || !file.existsAsFile()) {
        std::cout << "Creating new edit: " << file.getFullPathName() << std::endl;
        activeCybrEdit = std::make_unique<CybrEdit>(createEmptyEdit(file, te::Engine::getInstance(), te::Edit::forEditing));
        // This is a little hacky, but I want the engine to stop putting
        // "Track 1" in everything. Note that there may be other places that
        // cybr calls createEmptyEdit, and it is not guaranteed that all of them
        // remove "Track 1" (even if they probably should)
        activeCybrEdit->removeTracksNamed("Track 1");
        if (!file.existsAsFile()) activeCybrEdit->saveActiveEdit(file);
    } else {
        std::cout << "Loading edit: " << file.getFullPathName() << std::endl;
        activeCybrEdit = std::make_unique<CybrEdit>(createEdit(file, te::Engine::getInstance(), te::Edit::forEditing));
    }
    return reply;
}

OSCMessage FluidOscServer::activateEditFile(const juce::OSCMessage &message) {
    OSCMessage reply("/file/activate/reply");
    if (!message.size() || !message[0].isString()) {
        String errorString = "ERROR: /file/activate missing message argument";
        constructReply(reply, 1, errorString);
        return reply;
    }

    File file = File::getCurrentWorkingDirectory().getChildFile(message[0].getString());
    if (!file.hasFileExtension(".tracktionedit")) {
        std::cout << "WARNING: /file/activate argument does not have .tracktionedit extention: " << file.getFileName() << std::endl;
    }

    bool forceEmptyEdit = (message.size() >= 2 && message[1].isInt32()) ? message[1].getInt32() : false;
    return activateEditFile(file, forceEmptyEdit);
}

OSCMessage FluidOscServer::changeWorkingDirectory(const OSCMessage& message) {
    OSCMessage reply("/cd/reply");
    if (!message.size() || !message[0].isString()) {
        String errorString = "ERROR: request to change directory without a path string";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String path = message[0].getString();
    File newWorkingDir = File::getCurrentWorkingDirectory().getChildFile(path);

    if (!newWorkingDir.isDirectory() || !newWorkingDir.setAsCurrentWorkingDirectory()) {
        String errorString = "ERROR: Cannot change directory: " + newWorkingDir.getFullPathName();
        constructReply(reply, 1, errorString);
        return reply;
    } else {
        String replyString = "Current Working Directory: " + newWorkingDir.getFullPathName();
        constructReply(reply, 0, replyString);
        return reply;
    }
}

OSCMessage FluidOscServer::selectAudioTrack(const juce::OSCMessage& message) {
    OSCMessage reply("/audiotrack/select/reply");

    if (!activeCybrEdit) {
        String errorString = "Cannot select track: no active edit";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isString()){
        String errorString = "Cannot select audio track: no track name provided";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String trackName = message[0].getString();
    selectedAudioTrack = getOrCreateAudioTrackByName(activeCybrEdit->getEdit(), trackName);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::selectReturnTrack(const juce::OSCMessage &message) {
    OSCMessage reply("/audiotrack/select/return/reply");
    if (!activeCybrEdit) {
        String errorString = "Cannot select return track: no active edit";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isString()) {
        String errorString = "Cannot select return track: no name provided";
        constructReply(reply, 1, errorString);
        return reply;
    }

    te::Edit& edit = activeCybrEdit->getEdit();
    String busName = message[0].getString();
    int busIndex = ensureBus(edit, busName);

    if (busIndex == -1) {
        String errorString = "Cannot select return track: no available busses";
        constructReply(reply, 1, errorString);
        return reply;
    }

    selectedAudioTrack = getOrCreateAudioTrackByName(activeCybrEdit->getEdit(), busName);
    jassert(selectedAudioTrack); // I believe this will always return a track

    // Look through plugins on the track, see if it already has an AuxReturnPlugin
    te::AuxReturnPlugin* returnPlugin = nullptr;
    for (te::Plugin* checkPlugin : selectedAudioTrack->pluginList) {
        if (auto foundPlugin = dynamic_cast<te::AuxReturnPlugin*>(checkPlugin)) {
            if (foundPlugin->busNumber == busIndex) {
                String replyString = "Skip insert aux return plugin. Edit already has " + busName + " return";
                constructReply(reply, 0, replyString);
                returnPlugin = foundPlugin;
                break;
            } else {
                String replyString = "Note: An unexpected auxreturn plugin was found while selecting return track (an additional one may be created)";
                constructReply(reply, 0, replyString);
                returnPlugin = foundPlugin;
            }
        }
    }

    // No return plugin was found on the track. Insert a new one.
    if (!returnPlugin) {
        te::Plugin::Ptr plugin = selectedAudioTrack->edit.getPluginCache().createNewPlugin("auxreturn", PluginDescription());
        if (auto foundPlugin = dynamic_cast<te::AuxReturnPlugin*>(plugin.get())) {
            returnPlugin = foundPlugin;
            returnPlugin->busNumber = busIndex;
            selectedAudioTrack->pluginList.insertPlugin(foundPlugin, 0, nullptr);

            String replyString = "Insert auxreturn plugin with busNumber: " + String(busIndex);
            constructReply(reply, 0, replyString);
        }
    }
    return reply;
}

OSCMessage FluidOscServer::ensureSend(const OSCMessage& message) {
    OSCMessage reply("/audiotrack/send/set/db/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot ensure send: no audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isString()) {
        String errorString = "Cannot ensure send: message needs name";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String busName = message[0].getString();
    float gainLevel = 0;
    String position = "post-gain";

    if (message.size() >= 2 && message[1].isFloat32()) {
        gainLevel = message[1].getFloat32();
    }

    if (message.size() >= 3 && message[2].isString()) {
        position = message[2].getString();
    }

    int busIndex = ensureBus(selectedAudioTrack->edit, busName);

    if (busIndex == -1) {
        String errorString = "Cannot create send: no available busses";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!position.equalsIgnoreCase("post-gain")) {
        String errorString = "Cannot ensure send: currently only post-gain sends are supported";
        constructReply(reply, 1, errorString);
        return reply;
    }

    // Look through plugins on the track, see if it already has an AuxSendPlugin
    te::AuxSendPlugin* sendPlugin = nullptr;
    bool foundVolume = false;
    for (te::Plugin* checkPlugin : selectedAudioTrack->pluginList) {
        if (!foundVolume) {
            if (auto foundPlugin = dynamic_cast<te::VolumeAndPanPlugin*>(checkPlugin))
                foundVolume = true;
        }
        if (auto foundPlugin = dynamic_cast<te::AuxSendPlugin*>(checkPlugin)) {
            if (foundPlugin->busNumber == busIndex) {
                String replyString = "Skip insert aux send plugin. Edit already has " + busName + " send";
                constructReply(reply, 0, replyString);
                sendPlugin = foundPlugin;
                break;
            }
        }
    }

    if (!sendPlugin) {
        te::Plugin::Ptr plugin = selectedAudioTrack->edit.getPluginCache().createNewPlugin("auxsend", PluginDescription());
        if (auto foundPlugin = dynamic_cast<te::AuxSendPlugin*>(plugin.get())) {
            sendPlugin = foundPlugin;
            sendPlugin->busNumber = busIndex;
            selectedAudioTrack->pluginList.insertPlugin(foundPlugin, -1, nullptr);
            String replyString = "Insert auxsend plugin with busNumber: " + String(busIndex);
            constructReply(reply, 0, replyString);
        }
    }

    if (sendPlugin) {
        sendPlugin->setGainDb(gainLevel);
    }
    return reply;
}

OSCMessage FluidOscServer::selectPlugin(const OSCMessage& message) {
    OSCMessage reply("/plugin/select/reply");
    if (message.size() > 3 ||
        !message[0].isString() ||
        !message[1].isInt32() ){
        String errorString = "selectPlugin failed. Incorrect arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }
    String pluginName = message[0].getString();
    int index = message[1].getInt32();
    String pluginFormat = String();

    if (message.size() > 2 && message[2].isString())
        pluginFormat = message[2].getString();
    if (!selectedAudioTrack){
        String errorString = "Cannot select plugin: No audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }
    selectedPlugin = getOrCreatePluginByName(*selectedAudioTrack, pluginName, pluginFormat, index);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::setPluginParam(const OSCMessage& message) {
    OSCMessage reply("/plugin/param/set");
    if (message.size() > 3 ||
        !message[0].isString() ||
        !message[1].isFloat32() ||
        !message[2].isString()) {
        String errorString = "Setting parameter failed. Incorrect arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!selectedPlugin) {
        String errorString = "Setting plugin parameter failed: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String paramName = message[0].getString();
    float paramValue = message[1].getFloat32();
    bool isNormalized = message[2].getString() == "normalized";
    if(isNormalized){
        if (paramValue > 1 || paramValue < 0){
            String errorString = "Setting parameter " + paramName
            + " failed. Normalized value has to be between 0 and 1.";
            constructReply(reply, 1, errorString);
            return reply;
        }
    }

    // Iterate over the parameter list in reverse. This is a slightly hacky way
    // to dodge the "Dry Level" and "Wet Level" parameters that tracktion adds
    // to all plugins. Some external plugins may have their own Dry/Wet level
    // params. Because the tracktion versions always come first, we only find
    // them if the plugin does not provide its own version.
    for (int i = selectedPlugin->getNumAutomatableParameters() - 1; i >= 0; i--) {
        te::AutomatableParameter::Ptr param = selectedPlugin->getAutomatableParameter(i);
        if (param->paramName.equalsIgnoreCase(paramName)) {

            param->parameterChangeGestureBegin();
            if (isNormalized) param->setNormalisedParameter(paramValue, NotificationType::sendNotification);
            else param->setParameter(paramValue, NotificationType::sendNotification);
            param->parameterChangeGestureEnd();

            String replyString = "set " + paramName
            + " to " + String(message[1].getFloat32())
            + " explicitvalue: "
            + param->valueToString(param->getCurrentExplicitValue());

            constructReply(reply, 0, replyString);
            break;
        }
    }
    return reply;
}

OSCMessage FluidOscServer::setPluginParamAt(const OSCMessage& message) {
    OSCMessage reply("/plugin/param/set/at/reply");
    if (message.size() > 5 ||
        !message[0].isString() ||
        !message[1].isFloat32() ||
        !message[2].isFloat32() ||
        !message[3].isFloat32() ||
        !message[4].isString() ) {
        String errorString = "Setting parameter failed. Incorrect arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!selectedPlugin) {
        String errorString = "Setting plugin parameter failed: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String paramName = message[0].getString();
    float paramValue = message[1].getFloat32();
    bool isNormalized = message[4].getString() == "normalized";
    if (isNormalized){
        if (paramValue > 1 || paramValue < 0){
            String errorString = "Setting parameter " + paramName
            + " failed. Normalized value has to be between 0 and 1.";
            constructReply(reply, 1, errorString);
            return reply;
        }
    }

    double changeQuarterNote = (double)message[2].getFloat32() * 4.0;
    if (changeQuarterNote < 0) {
        String errorString = "Setting parameter " + paramName
        + " failed. Time has to be a positive number.";
        constructReply(reply, 1, errorString);
        return reply;
    }
    double changeTime = activeCybrEdit->getEdit().tempoSequence.beatsToTime(changeQuarterNote);

    float curveValue = message[3].getFloat32();
    if (curveValue > 1 || curveValue < -1) {
         String errorString = "Setting parameter " + paramName
               + " failed. Curve has to be between -1 and 1.";
         constructReply(reply, 1, errorString);
         return reply;
    }

    // Iterate over the parameter list in reverse. This is a slightly hacky way
    // to dodge the "Dry Level" and "Wet Level" parameters that tracktion adds
    // to all plugins. Some external plugins may have their own Dry/Wet level
    // params. Because the tracktion versions always come first, we only find
    // them if the plugin does not provide its own version.
    for (int i = selectedPlugin->getNumAutomatableParameters() - 1; i >= 0; i--) {
        te::AutomatableParameter::Ptr param = selectedPlugin->getAutomatableParameter(i);
        if (param->paramName.equalsIgnoreCase(paramName)) {
            if (isNormalized) paramValue = param->valueRange.convertFrom0to1(paramValue);
            te::AutomationCurve curve = param->getCurve();
            // If this is the first time changing the value of the parameter,
            // set it to its default at time 0.
            if(!param->hasAutomationPoints()) {
                curve.addPoint(0, param->getCurrentValue(), 0);
            }

            curve.addPoint(changeTime, paramValue, curveValue);
            curve.removeRedundantPoints(te::EditTimeRange(0, curve.getLength()+1));


            String replyString = "set " + paramName
            + " to " + String(message[1].getFloat32()) + " explicit value: " + param->valueToString(paramValue)
            + " at " + String(changeQuarterNote) + " Quarter Note(s).";
            constructReply(reply, 0, replyString);
            break;
        }
    }
    return reply;
}


OSCMessage FluidOscServer::setPluginSideChainInput(const OSCMessage& message) {
    OSCMessage reply("/plugin/sidechain/input/set/reply");
    if (!selectedPlugin) {
        String errorString = "Cannot set plugin side chain input: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!selectedPlugin->canSidechain()) {
        String errorString = "Cannot set plugin side chain input: Selected plugin cannot side chain";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isString()) {
        String errorString = "Cannot set plugin side chain input: Missing input-track-name arg";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String inputTrackname = message[0].getString();
    te::AudioTrack* inputTrack = getOrCreateAudioTrackByName(selectedPlugin->edit, inputTrackname);
    selectedPlugin->setSidechainSourceID(inputTrack->itemID);
    std::cout << "Side chain input: " << inputTrack->getName() << std::endl;

    if (auto compressor = dynamic_cast<te::CompressorPlugin*>(selectedPlugin)) {
        std::cout << "NOTE: when enabling a side chain in put on the internal compressor plugin, the side chain will be enabled by default. " << std::endl;
        compressor->useSidechainTrigger = true;
    }

    selectedPlugin->guessSidechainRouting();

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::getPluginReport(const juce::OSCMessage& message) {
    OSCMessage reply("/plugin/report/reply");

    if (!selectedPlugin) {
        String errorString = "Cannot get plugin report: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }

    // This is a recommended way of storing dynamic objects safely described here:
    // https://forum.juce.com/t/style-question-with-dynamicobject/9413
    DynamicObject::Ptr object = new DynamicObject();
    object->setProperty("shortName10", selectedPlugin->getShortName(10));
    object->setProperty("name",selectedPlugin->getName());
    object->setProperty("idString", selectedPlugin->getIdentifierString());
    object->setProperty("automatableParamsCount", selectedPlugin->getNumAutomatableParameters());
    object->setProperty("pluginType", selectedPlugin->getPluginType());


    if (auto x = dynamic_cast<te::ExternalPlugin*>(selectedPlugin)) {
        // Annoyingly:
        // - PluginDescription.pluginFormatName is "VST"  or "VST3" (upper case)
        // - Plugin::getPluginType()       returns "vst"            (lower case)
        object->setProperty("externalPluginFormat", x->desc.pluginFormatName);
        object->setProperty("uid", x->getPluginUID());
        // update the plugin's .state value Tree
        x->flushPluginStateToValueTree();
        var state = x->state.getProperty(te::IDs::state);
        MemoryBlock chunk;
        if (chunk.fromBase64Encoding(state.toString())) {
            String properBase64 = Base64::toBase64(chunk.getData(), chunk.getSize());
            object->setProperty("tracktionXmlStateBase64", properBase64);
        }
        {
            x->getPluginStateFromTree(chunk);
            String pluginState = Base64::toBase64(chunk.getData(), chunk.getSize());
            object->setProperty("pluginState", pluginState);
        }

        object->setProperty("tracktionXml", x->elementState.toXmlString());
        // Try a different method of getting the state

        juce::AudioPluginInstance* jucePlugin = x->getAudioPluginInstance();

        MemoryBlock stateInfoBlock;
        MemoryBlock programStateInfoBlock;

        TRACKTION_ASSERT_MESSAGE_THREAD
        jucePlugin->suspendProcessing (true);
        jucePlugin->getCurrentProgramStateInformation(programStateInfoBlock); // Verify: If this is a VST2, get fxp (patch)
        jucePlugin->getStateInformation(stateInfoBlock);                      // Verify: If this is a VST2, get fxb (bank)
        jucePlugin->suspendProcessing(false);

        String programStateInfo = Base64::toBase64(programStateInfoBlock.getData(), programStateInfoBlock.getSize());
        String stateInfo  = Base64::toBase64(stateInfoBlock.getData(), stateInfoBlock.getSize());

        object->setProperty("currentProgramStateInfo", programStateInfo);
        object->setProperty("currentStateInfo", stateInfo);

        object->setProperty("numPrograms", jucePlugin->getNumPrograms());     // number of programs in the bank
        object->setProperty("currentProgramIndex", jucePlugin->getCurrentProgram()); // program number within (bank)
        object->setProperty("currentProgramName", jucePlugin->getProgramName(jucePlugin->getCurrentProgram()));

        // Dynamic cast doesn't work, but I don't know why: if (auto* vst = dynamic_cast<VSTPluginInstance*> (plugin)) {
        if (x->isVST()) {
            // if for some reason, we wanted to get the AEffect, we could do it like this:
            // #if (JUCE_PLUGINHOST_VST)
            // #include "pluginterfaces/vst2.x/aeffect.h" // required
            // AEffect* vst2 = static_cast<AEffect*>(jucePlugin->getPlatformSpecificData());
            // #endif

            // My understanding is that stateInfo and programStateInfo map to
            // fxb and fxp formats for VST2 plugins. This assumption needs to be
            // verified.
#if (JUCE_PLUGINHOST_VST)
            object->setProperty("fxb", stateInfo);        // same as: currentStateInfo
            object->setProperty("fxp", programStateInfo); // same as: currentProgramStateInfo

            MemoryBlock presetChunk;
            if (VSTPluginFormat::getChunkData(jucePlugin, presetChunk, true)) {
                object->setProperty("vst2State", Base64::toBase64(presetChunk.getData(), presetChunk.getSize()));
            } else {
                object->setProperty("vst2StateError", 1);
            }
#endif
        } else if (x->isVST3()) {
#if (JUCE_PLUGINHOST_VST3)
            // This code is modeled after a suggestion on the forum
            // https://forum.juce.com/t/fr-vst3pluginformat-loadfromvstpresetfile/24881/7
            // However, the code on the forum is for writing to plugin's state, while I want to
            // read the plugin state.
            auto funknown = static_cast<Steinberg::FUnknown*> (jucePlugin->getPlatformSpecificData());
            Steinberg::Vst::IComponent* vstcomponent = nullptr;

            if (funknown->queryInterface (Steinberg::Vst::IComponent_iid, (void**) &vstcomponent) == 0
                && vstcomponent != nullptr)
            {
                auto* memoryStream = new Steinberg::MemoryStream();
                auto result = vstcomponent->getState(memoryStream);
                if (result) {
                    object->setProperty("vst3StateError", result);
                } else {
                    // The output of this looks very similar to the way that REAPER stores VSTs
                    // Reaper's Base64 binary has an extra 8 bytes at the beginning of the stream,
                    // and an extra 8 bytes at the end.
                    memoryStream->truncateToCursor();
                    String state = Base64::toBase64(memoryStream->getData(), memoryStream->getSize());
                    object->setProperty("vst3State", state);
                }

                memoryStream->release();
                vstcomponent->release();
           }
#endif
        }
    } // end isExternalPlugin block

    reply.addInt32(0);
    reply.addString("Retrieved JSON report about plugin");
    reply.addString(JSON::toString(object.get(), true));

    return reply;
}

OSCMessage FluidOscServer::getPluginParamReport(const juce::OSCMessage& message) {
    OSCMessage reply("/plugin/param/report/reply");

    if (!selectedPlugin) {
        String errorString = "Cannot get plugin parameter report: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }

    // We have to allocate vars dynamically. Store them in this array so the vars will be
    // cleaned with it goes out of scope. The standard Array is needed for creating JSON.
    OwnedArray<var> toDelete;
    Array<var> array;

    for (auto param : selectedPlugin->getAutomatableParameters()) {
        // var works like a Smart Pointer. It deletes reference counted objects in its
        // destructor. Jules describes this behavior here:
        // https://forum.juce.com/t/way-to-init-a-var-with-a-dynamicobject/12037
        DynamicObject* object = new DynamicObject();

        // All our var objects created with 'new' should be added to (and deleted by)
        // the toDelete OwnedArray.
        var* v = new var(object); toDelete.add(v);
        array.add(*v);

        object->setProperty("name", param->paramName);
        object->setProperty("currentExplicitValue", param->getCurrentExplicitValue());
        object->setProperty("currentNormalizedValue", param->getCurrentNormalisedValue());
        object->setProperty("currentValue", param->getCurrentValue());
        object->setProperty("currentValueAsStringWithLabel", param->getCurrentValueAsStringWithLabel());
        object->setProperty("currentValueAsString", param->getCurrentValueAsString());
        object->setProperty("currentBaseValue", param->getCurrentBaseValue());
        object->setProperty("isDiscrete", param->isDiscrete());
        object->setProperty("isAutomationActive", param->isAutomationActive());
        object->setProperty("isActive", param->isParameterActive()); // external plugin params seem to always be active
        object->setProperty("hasAutomationPoints", param->hasAutomationPoints());
        object->setProperty("hasLabels", param->hasLabels());
        object->setProperty("currentLabel", param->getLabel());

        // I believe that anything we put in a var will get cleaned up correctly as
        // if the var is cleaned up correctly itself. It might be worth veryifying.
        var* valueRange = new var(); toDelete.add(valueRange);
        valueRange->append(param->getValueRange().getStart());
        valueRange->append(param->getValueRange().getEnd());
        // setProperty passes by reference, but I think that the underlying Var object
        // still get copied. If that var object is an Array<var> then the contents of
        // that array get copied as well. We have to .setProperty AFTER adding values.
        object->setProperty("valueRange", *valueRange);
    }

    // Create JSON of the results
    String jsonString = JSON::toString(array, true);

    reply.addInt32(0);
    reply.addString("Retrieved JSON report about plugin parameters");
    reply.addString(jsonString);

    return reply;
}

OSCMessage FluidOscServer::savePluginPreset(const juce::OSCMessage& message) {
    OSCMessage reply("/plugin/save/reply");
    if (!selectedPlugin) {
        String errorString = "Cannot save plugin preset: No selected plugin";
        constructReply(reply, 1, errorString);
        return reply;
    }
    if (message.size() < 1 || !message[0].isString()) {
        String errorString = "Cannot save plugin preset: First argument must be a name string";
        constructReply(reply, 1, errorString);
        return reply;
    }
    saveTracktionPreset(selectedPlugin, message[0].getString());
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::loadPluginTrkpreset(const juce::OSCMessage &message) {
    OSCMessage reply("/plugin/load/trkpreset/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot load plugin preset: No audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isBlob()) {
        String errorString = "Cannot load trkpreset data: Mising blob";
        constructReply(reply, 1, errorString);
        return reply;
    }

    MemoryBlock blob = message[0].getBlob();
    String string = String::createStringFromData(blob.getData(), (int)blob.getSize());
    std::unique_ptr<XmlElement> xml = parseXML(string);
    if (!xml) {
        String errorString = "Cannot load trkpreset data: XML parser error";
        constructReply(reply, 1, errorString);
        return reply;
    }

    ValueTree v = ValueTree::fromXml(*xml.get());
    if (!v.isValid()) {
        String errorString = "Cannot load trkpreset data: Invalid ValueTree";
        constructReply(reply, 1, errorString);
        return reply;
    }

    loadTracktionPreset(*selectedAudioTrack, v);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::loadPluginPreset(const juce::OSCMessage& message) {
    OSCMessage reply("/plugin/load/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot load plugin preset: No audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (message.size() < 1 || !message[0].isString()) {
        String errorString = "Cannot load plugin preset: Message has no preset name";
        constructReply(reply, 1, errorString);
        return reply;
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
        String errorString = "Cannot load plugin preset: Failed to load and parse file";
        constructReply(reply, 1, errorString);
        return reply;
    }

    loadTracktionPreset(*selectedAudioTrack, v);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::selectMidiClip(const juce::OSCMessage& message) {
    OSCMessage reply("/midiclip/select/reply");
    if (!selectedAudioTrack){
        String errorString = "Cannot load plugin preset: No audio track selected";
        constructReply(reply, 1, errorString);
        return reply;
    }
    if (!message.size() || !message[0].isString()){
        String errorString = "Cannot select Midi Clip: Missing arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    String clipName = message[0].getString();
    selectedClip = getOrCreateMidiClipByName(*selectedAudioTrack, clipName);

    // Clip startBeats
    if (message.size() >= 2 && message[1].isFloat32()) {
        double startBeats = message[1].getFloat32() * 4.0;
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        selectedClip->setStart(startSeconds, false, true);
    }
    // Clip length
    if (message.size() >= 3 && message[2].isFloat32()) {
        double lengthInBeats = message[2].getFloat32() * 4.0;
        double startBeat = selectedClip->getStartBeat();
        double endBeat = startBeat + lengthInBeats;
        double endTime = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeat);
        selectedClip->setEnd(endTime, true);
    }
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::clearMidiClip(const juce::OSCMessage& message) {
    OSCMessage reply("/midiclip/clear");
    if (!selectedClip) {
        String errorString = "Cannot clear midi clip: No clip selected";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto selectedMidiClip = dynamic_cast<te::MidiClip*>(selectedClip);
    if (!selectedMidiClip) {
        String errorString = "Cannot clear midi clip: selected clip is not a midi clip";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto exisiting = selectedMidiClip->state.getChildWithName(te::IDs::SEQUENCE);
    if (!exisiting.isValid()) selectedMidiClip->clearTakes();
    selectedMidiClip->getSequence().clear(nullptr); // is this needed?

    // If the clip is currently playing, we probably want to send an all notes
    // off message, which looks roughly like this
    if (auto track = dynamic_cast<te::AudioTrack*>(selectedMidiClip->getTrack()))
        for (int i = 1; i <= 16; ++i)
            track->injectLiveMidiMessage(MidiMessage::allNotesOff(i),
                                         te::MidiMessageArray::notMPE);

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::insertMidiNote(const juce::OSCMessage& message) {
    OSCMessage reply("/midiclip/insert/note/reply");
    if(!selectedClip){
        String errorString = "Cannot insert midi note: No clip selected.";
        constructReply(reply, 1, errorString);
        return reply;
    }
    if(message.size() < 3){
        String errorString = "Cannot insert midi note: Not enough arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    auto selectedMidiClip = dynamic_cast<te::MidiClip*>(selectedClip);
    if (!selectedMidiClip) {
        String errorString = "Cannot insertMidiNote: selected clip is not a midi clip";
        constructReply(reply, 1, errorString);
        return reply;
    }

    for (const auto& arg : message) {
        if (!arg.isInt32() && !arg.isFloat32()){
            String errorString = "Cannot insertMidiNote: arguments have incorrect type";
            constructReply(reply, 1, errorString);
            return reply;
        }
    }
    double startBeat = 0;
    double lengthInBeats = 1;
    int noteNumber = 0;
    int velocity = 64;
    int colorIndex = 0;

    if (message[0].isInt32()) noteNumber = message[0].getInt32();
    else if (message[0].isFloat32()) noteNumber = (int)(message[0].getFloat32());

    if (message[1].isFloat32()) startBeat = message[1].getFloat32() * 4.0;
    else if (message[1].isInt32()) startBeat = message[1].getInt32() * 4;

    if (message[2].isFloat32()) lengthInBeats = message[2].getFloat32() * 4.0;
    else if (message[2].isInt32()) lengthInBeats = (int)(message[2].getInt32()) * 4;

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

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::insertWaveSample(const juce::OSCMessage& message){
    OSCMessage reply("/audiotrack/insert/wav/reply");
    if(!selectedAudioTrack){
        String errorString = "Cannot insert wave sample: Must select Audio Track before inserting";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if(message.size() < 3){
        String errorString = "Cannot insert wave file: only recieved " + String(message.size()) + "arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message[0].isString()) {
        String errorString = "Cannot insert wave file: first argument must be a clipName string";
        constructReply(reply, 1, errorString);
        return reply;
    }
    String clipName = message[0].getString();

    if (!message[1].isString()) {
        String errorString = "Cannot insert wave file: second argument must be a filepath string";
        constructReply(reply, 1, errorString);
        return reply;
    }
    String filePath = message[1].getString();

    if (!message[2].isFloat32() && !message[2].isInt32()) {
        String errorString = "Cannot insert wave file: third argument must be a start time in whole notes (int or float)";
        constructReply(reply, 1, errorString);
        return reply;
    }

    double startBeat = 0;
    if (message[2].isFloat32()) startBeat = message[2].getFloat32() * 4.0;
    else if (message[2].isInt32()) startBeat = message[2].getInt32() * 4;
    double startSeconds = selectedAudioTrack->edit.tempoSequence.beatsToTime(startBeat);

    // The default filePathResolver checks for an absolute file, then looks
    // in the relative to the edit file directory (using edit.editFileRetriever)
    File file = selectedAudioTrack->edit.filePathResolver(filePath);
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

    te::AudioFile audiofile(selectedAudioTrack->edit.engine, file);
    if(!audiofile.isWavFile()){
        String errorString = "Cannot insert wave file: Must be valid WAV file.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    te::EditTimeRange timeRange = te::EditTimeRange(startSeconds, startSeconds+audiofile.getLength());

    te::ClipPosition pos;
    pos.time = timeRange;
    te::WaveAudioClip::Ptr c = selectedAudioTrack->insertWaveClip(clipName, file, pos, false);
    selectedClip = c.get();

    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::setTrackGain(const OSCMessage& message) {
    OSCMessage reply("/audiotrack/set/db/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot set track gain: No track selected.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (!message.size() || !message[0].isFloat32()) {
        String errorString = "Cannot set track gain: Missing arguments.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    if (auto volumePlugin = selectedAudioTrack->getVolumePlugin()) {
        volumePlugin->setVolumeDb(message[0].getFloat32());
        reply.addInt32(0);
    } else {
        String errorString = "Cannot set track gain: Track is missing volume plugin.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    return reply;
}

OSCMessage FluidOscServer::muteTrack(bool mute) {
    OSCMessage reply("/audiotrack/mute/reply");
    if (!selectedAudioTrack) {
        String errorString = "Cannot " + String((mute ? "mute" : "unmute")) + ": No track selected.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    selectedAudioTrack->setMute(mute);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::setTempo(const OSCMessage &message) {
    OSCMessage reply("/tempo/set/reply");
    if (!message.size() || !message[0].isFloat32()) {
        String errorString = "Cannot set tempo: missing tempo argument";
        constructReply(reply, 1, errorString);
        return reply;
    }

    float bpm = message[0].getFloat32();
    te::TempoSetting* tempo = activeCybrEdit->getEdit().tempoSequence.getTempo(0);
    tempo->setBpm(bpm);
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::handleSamplerMessage(const OSCMessage &message) {
    OSCMessage reply("/plugin/sampler/reply");
    if (!selectedPlugin) {
        String errorString = "Cannot update sampler. No plugin selected.";
        constructReply(reply, 1, errorString);
        return reply;
    }

    te::SamplerPlugin* sampler = dynamic_cast<te::SamplerPlugin*>(selectedPlugin);
    if (!sampler) {
        String errorString = "Cannot update sampler. No sampler selected.";
        constructReply(reply, 1, errorString);
        return reply;
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
            String errorString = "Cannot add sampler sound: Not enough arguments";
            constructReply(reply, 1, errorString);
            return reply;
        }

        if (!message[0].isString() || !message[1].isString() || ! message[2].isInt32()) {
            String errorString = "Cannot add sampler sound: incorrect arguments";
            constructReply(reply, 1, errorString);
            return reply;
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
    reply.addInt32(0);
    return reply;
}

OSCMessage FluidOscServer::handleTransportMessage(const OSCMessage& message) {
    OSCMessage reply("/transport/reply");
    if (!activeCybrEdit) {
        String errorString = "Cannot update transport: No active edit";
        constructReply(reply, 1, errorString);
        return reply;
    }
    te::TransportControl& transport = activeCybrEdit->getEdit().getTransport();

    const OSCAddressPattern pattern = message.getAddressPattern();
    if (pattern.matches({"/transport/play"})) {
        std::cout << "Play!" << std::endl;
        transport.play(false);
    } else if (pattern.matches({"/transport/stop"})) {
        std::cout << "Stop!" << std::endl;
        transport.stop(false, false);
    } else if (pattern.matches({"/transport/to/seconds"})) {
        if (message.size() < 1 || !message[0].isFloat32()){
            String errorString = "Cannot update transport: Incorrect arguments";
            constructReply(reply, 1, errorString);
            return reply;
        }
        transport.setCurrentPosition(message[0].getFloat32());
    } else if (pattern.matches({"/transport/to"})) {
        if (message.size() < 1 || !message[0].isFloat32()){
            String errorString = "Cannot update transport: Incorrect arguments";
            constructReply(reply, 1, errorString);
            return reply;
        }
        double beats = message[0].getFloat32() * 4.0;
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(beats);
        transport.setCurrentPosition(startSeconds);
    } else if (pattern.matches({"/transport/loop"})) {
        if (message.size() < 2 || !message[0].isFloat32() || !message[1].isFloat32()) {
            String errorString = "/transport/loop failed - requires loop start and duration";
            constructReply(reply, 1, errorString);
            return reply;
        }

        double startBeats = message[0].getFloat32() * 4.0;
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        double durationBeats = message[1].getFloat32() * 4.0;
        double endBeats = startBeats + durationBeats;
        double endSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeats);

        if (durationBeats == 0) {
            // To disable looping specify duration of 0
            std::cout << "Looping disabled!" << std::endl;
            transport.looping.setValue(false, nullptr);
            reply.addInt32(0);
            return reply;
        }

        te::EditTimeRange range = transport.getLoopRange();
        if (range != te::EditTimeRange(startSeconds, endSeconds)) {
            if (range.getStart() != startSeconds) transport.setLoopIn(startSeconds);
            if (range.getEnd() != endSeconds) transport.setLoopOut(endSeconds);
            std::cout << "Looping start|length: " << startBeats << "|" << endBeats << std::endl;
        }
        // If looping was previously disabled, setting looping to true seems to
        // move the playhead to the start of the loop. This surprised me, but is
        // okay for now. It is probably not the ideal behavior. Setting the loop
        // point should probably never change playback (currently it probably
        // only changes the playback iff we are not already looping, but if we
        // are looping a different region, playback will be unaffected).
        transport.looping.setValue(true, nullptr);
    }
    reply.addInt32(0);
    return reply;
};
