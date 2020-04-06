/*
  ==============================================================================

    FluidOscServer.cpp
    Created: 18 Nov 2019 5:50:15pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "FluidOscServer.h"


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

SelectedObjects FluidOscServer::getSelectedObjects() {
    return { selectedAudioTrack, selectedClip, selectedPlugin };
}

void FluidOscServer::handleOscBundle(const OSCBundle &bundle, SelectedObjects parentSelection) {
    SelectedObjects currBundle = parentSelection;
    for (const auto& element: bundle) {
        if (element.isMessage()) {
            // allow messages to update the current selection ("currBundle")
            handleOscMessage(element.getMessage());
            currBundle.audioTrack = selectedAudioTrack;
            currBundle.clip = selectedClip;
            currBundle.plugin = selectedPlugin;
        } else if (element.isBundle()) {
            // After processing a bundle, selection will reset to "currBundle"
            handleOscBundle(element.getBundle(), currBundle);
        }
    }
    
    selectedAudioTrack = parentSelection.audioTrack;
    selectedClip = parentSelection.clip;
    selectedPlugin = parentSelection.plugin;
}

void FluidOscServer::handleOscMessage (const OSCMessage& message) {
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
    if (msgAddressPattern.matches({"/plugin/param/set/at"})) return setPluginParamAt(message);
    if (msgAddressPattern.matches({"/plugin/sidechain/input/set" })) return setPluginSideChainInput(message);
    if (msgAddressPattern.matches({"/plugin/save"})) return savePluginPreset(message);
    if (msgAddressPattern.matches({"/plugin/load/trkpreset"})) return loadPluginTrkpreset(message);
    if (msgAddressPattern.matches({"/plugin/load"})) return loadPluginPreset(message);
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
    if (msgAddressPattern.matches({"/file/save"})) return saveActiveEdit(message);
    if (msgAddressPattern.matches({"/cd"})) return changeWorkingDirectory(message);
    if (msgAddressPattern.toString().startsWith({"/transport"})) return handleTransportMessage(message);
    if (msgAddressPattern.matches({"/audiotrack/region/render"})) return renderRegion(message);
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

    std::cout << "Unhandled message: ";
    printOscMessage(message);
}

void FluidOscServer::removeAudioTrackClips(const OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot remove audio track clips: no track selected" << std::endl;
        return;
    }

    te::Clip::Array clipsToRemove;
    for (te::Clip* clip : selectedAudioTrack->getClips()) {
        clipsToRemove.add(clip);
    }

    for (te::Clip* clip : clipsToRemove) {
        clip->removeFromParentTrack();
    }
}

void FluidOscServer::removeAudioTrackAutomation(const OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot remove audio track automation: no track selected" << std::endl;
        return;
    }

    for (auto plugin : selectedAudioTrack->getAllPlugins()) {
        for (te::AutomatableParameter* param : plugin->getAutomatableParameters()) {
            if (param->hasAutomationPoints()) {
                param->getCurve().clear();
            }
        }
    }
}

void FluidOscServer::setClipDb(const OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot set audio clip gain: no clip selected" << std::endl;
        return;
    }

    auto* audioClip = dynamic_cast<te::AudioClipBase*>(selectedClip);
    if (!audioClip) {
        std::cout << "Cannot set audio clip gain: selected clip is not an audio clip" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isFloat32()) {
        std::cout << "Cannot set audio clip gain: missing db float argument" << std::endl;
        return;
    }

    double dBFS = message[0].getFloat32();
    if (dBFS > 40) {
        std::cout << "Cannot set audio clip gain: " << dBFS << "db is dangerously loud" << std::endl;
        return;
    }

    audioClip->setGainDB(dBFS);
}

void FluidOscServer::audioClipFadeInOutSeconds(const OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot setup audio clip fade in/out: no clip selected" << std::endl;
        return;
    }

    auto* audioClip = dynamic_cast<te::WaveAudioClip*>(selectedClip);
    if (!audioClip) {
        std::cout << "Cannot setup audio clip fade in/out: selected clip is not an audio clip" << std::endl;
        return;
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
}

void FluidOscServer::reverseAudioClip(bool reverse) {
    if (!selectedClip) {
        std::cout << "Cannot update clip reverse status: no clip selected" << std::endl;
        return;
    }

    auto* audioClip = dynamic_cast<te::WaveAudioClip*>(selectedClip);
    if (!audioClip) {
        std::cout << "Cannot update clip reverse status: selected clip is not an audio clip" << std::endl;
        return;
    }
    if (reverse == audioClip->getIsReversed()) return;

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
}

void FluidOscServer::offsetClipSourceInSeconds(const juce::OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot set clip source offset: no clip selected" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isFloat32()) {
        std::cout << "Cannot set clip source offset: missing offset value" << std::endl;
        return;
    }
    double newOffset = message[0].getFloat32();
    selectedClip->setOffset(newOffset);
}

void FluidOscServer::trimClipBySeconds(const juce::OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot trim clip: No clip selected" << std::endl;
        return;
    }

    double startTrim = (message.size() >= 1 && message[0].isFloat32()) ? message[0].getFloat32() : 0;
    double endTrim =   (message.size() >= 2 && message[1].isFloat32()) ? message[1].getFloat32() : 0;
    te::EditTimeRange currentRange = selectedClip->getEditTimeRange();
    te::EditTimeRange newRange {currentRange.start + startTrim, currentRange.end - endTrim};

    if (newRange.getLength() <= 0) {
        std::cout << "Cannot trim clip: duration of trimmed clip would be sub-zero" << std::endl;
        return;
    }
    // verify: does this work when the new start is after the old end, but before the new end????
    selectedClip->setStart(newRange.start, true, false);
    selectedClip->setEnd(newRange.end, true);
}

void FluidOscServer::setClipLength(const juce::OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot set clip length: No clip selected" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isFloat32()) {
        std::cout << "Cannot set clip length: First argument must be a float duration" << std::endl;
        return;
    }

    bool trimStart = false;
    if (message.size() >= 2 && message[1].isString()) {
        if (message[1].getString().toLowerCase().startsWithChar('s')) {
            trimStart = true;
        }
    }
    double durationInQuarterNotes = message[0].getFloat32();

    if (durationInQuarterNotes <= 0) {
        std::cout << "Cannot set clip length: duration argument must be greater than 0" << std::endl;
        return;
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
}

void FluidOscServer::selectClip(const juce::OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot select clip: No audio track selected" << std::endl;
        return;
    }
    if (!message.size() || !message[0].isString()) {
        std::cout << "Cannot select clip: First argument must be clip name string" << std::endl;
        return;
    }

    String clipName = message[0].getString();
    for (auto clip : selectedAudioTrack->getClips()) {
        if (clip->getName().equalsIgnoreCase(clipName)) {
            selectedClip = clip;
            std::cout
                << "Selected " << clip->getName()
                << " (" << clip->state.getType().toString() << ") on "
                << selectedAudioTrack->getName() << std::endl;
            return;
        }
    }

    std::cout
        << "Cannot select clip: \"" << clipName
        << "\" not found on track " << selectedAudioTrack->getName() << std::endl;
}

void FluidOscServer::renderRegion(const OSCMessage& message) {
    // Args
    // 0 - (string, required) output filename
    // 1 - (float, optional) start quarterNotes
    // 2 - (float, optional) duration in quarterNotes
    // If both 1 and 2 are floats, render this time range in beats. Otherwise,
    // render the edit loop region.

    if (!selectedAudioTrack) {
        std::cout << "Cannot render track region: No selected track" << std::endl;
        return;
    }

    if (message.size() < 1 || !message[0].isString()) {
        std::cout << "Cannot render track region: Missing filename" << std::endl;
        return;
    }

    String filename = message[0].getString();
    File outputFile = selectedAudioTrack->edit.filePathResolver(filename);

    te::TransportControl& transport = selectedAudioTrack->edit.getTransport();
    te::EditTimeRange range = transport.getLoopRange();

    if (message.size() >= 3 && message[1].isFloat32() && message[2].isFloat32()) {
        double startBeats = message[1].getFloat32();
        double durationBeats = message[2].getFloat32();
        double endBeats = startBeats + durationBeats;
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        double endSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeats);
        range.start = startSeconds;
        range.end = endSeconds;
    }
    renderTrackRegion(outputFile, *selectedAudioTrack, range);
}

void FluidOscServer::renderClip(const juce::OSCMessage &message) {
    // Args
    // 0 - (string, required) output filename
    // 1 - (float, optional) tail in seconds

    if (message.size() < 1 || !message[0].isString()) {
        std::cout << "Cannot render track region: Missing filename" << std::endl;
        return;
    }

    String filename = message[0].getString();
    File outputFile = selectedAudioTrack->edit.filePathResolver(filename);

    if (!selectedClip) {
        std::cout << "Cannot render selected clip: No clip selected" << std::endl;
        return;
    }

    te::Track* track = selectedClip->getTrack();
    if (!track) {
        jassert(false);
        std::cout << "Cannot render clip region: Failed to get clip's track" << std::endl;
        return;
    }

    double tail = (message.size() >= 2 && message[1].isFloat32()) ? message[1].getFloat32() : 0;
    te::EditTimeRange range = selectedClip->getEditTimeRange();
    range.end += tail;

    renderTrackRegion(outputFile, *track, range);
}

void FluidOscServer::saveActiveEdit(const juce::OSCMessage &message) {
    if (!activeCybrEdit) {
        std::cout << "Cannot save active edit: No active edit" << std::endl;
        return;
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
    if (!message.size() || !message[0].isString()){
        std::cout << "Cannot select audio track: no track name provided" << std::endl;
        return;
    }

    String trackName = message[0].getString();
    selectedAudioTrack = getOrCreateAudioTrackByName(activeCybrEdit->getEdit(), trackName);
}

void FluidOscServer::selectReturnTrack(const juce::OSCMessage &message) {
    if (!activeCybrEdit) {
        std::cout << "Cannot select return track: no active edit"  << std::endl;
        return;
    }

    if (!message.size() || !message[0].isString()) {
        std::cout << "Cannot select return track: no name provided" << std::endl;
        return;
    }

    te::Edit& edit = activeCybrEdit->getEdit();
    String busName = message[0].getString();
    int busIndex = ensureBus(edit, busName);

    if (busIndex == -1) {
        std::cout << "Cannot select return track: no available busses" << std::endl;
        return;
    }

    selectedAudioTrack = getOrCreateAudioTrackByName(activeCybrEdit->getEdit(), busName);
    jassert(selectedAudioTrack); // I believe this will always return a track

    // Look through plugins on the track, see if it already has an AuxReturnPlugin
    te::AuxReturnPlugin* returnPlugin = nullptr;
    for (te::Plugin* checkPlugin : selectedAudioTrack->pluginList) {
        if (auto foundPlugin = dynamic_cast<te::AuxReturnPlugin*>(checkPlugin)) {
            if (foundPlugin->busNumber == busIndex) {
                std::cout << "Skip insert aux return plugin. Edit already has " << busName << " return" << std::endl;
                returnPlugin = foundPlugin;
                break;
            } else {
                std::cout << "Note: An unexpected auxreturn plugin was found while selecting return track (an additional one may be created)" << std::endl;
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
            std::cout << "Insert auxreturn plugin with busNumber: " << busIndex << std::endl;
        }
    }
}

void FluidOscServer::ensureSend(const OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot ensure send: no audio track selected" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isString()) {
        std::cout << "Cannot ensure send: message needs name" << std::endl;
        return;
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
        std::cout << "Cannot create send: no available busses" << std::endl;
        return;
    }

    if (!position.equalsIgnoreCase("post-gain")) {
        std::cout << "Cannot ensure send: currently only post-gain sends are supported" << std::endl;
        return;
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
                std::cout << "Skip insert aux send plugin. Edit already has " << busName << " send" << std::endl;
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
            std::cout << "Insert auxsend plugin with busNumber: " << busIndex << std::endl;
        }
    }

    if (sendPlugin) {
        sendPlugin->setGainDb(gainLevel);
    }
}

void FluidOscServer::selectPlugin(const OSCMessage& message) {
    if (message.size() > 3 ||
        !message[0].isString() ||
        !message[1].isInt32() ){
        std::cout<<"selectPlugin failed. Incorrect arguments."<<std::endl;
        return;
    }
    String pluginName = message[0].getString();
    int index = message[1].getInt32();
    String pluginFormat = String();

    if (message.size() > 2 && message[2].isString())
        pluginFormat = message[2].getString();
    if (!selectedAudioTrack) return;
    selectedPlugin = getOrCreatePluginByName(*selectedAudioTrack, pluginName, pluginFormat, index);
}

void FluidOscServer::setPluginParam(const OSCMessage& message) {
    if (message.size() > 3 ||
        !message[0].isString() ||
        !message[1].isFloat32() ||
        !message[2].isString()) {
        std::cout << "Setting parameter failed. Incorrect arguments." << std::endl;
        return;
    }

    if (!selectedPlugin) {
        std::cout << "Setting plugin parameter failed: No selected plugin" << std::endl;
        return;
    }

    String paramName = message[0].getString();
    float paramValue = message[1].getFloat32();
    bool isNormalized = message[2].getString() == "normalized";
    if(isNormalized){
        if (paramValue > 1 || paramValue < 0){
            std::cout
                << "Setting parameter " << paramName
                << " failed. Normalized value has to be between 0 and 1."
                << std::endl;
            return;
        }
    }
    
    for (te::AutomatableParameter* param : selectedPlugin->getAutomatableParameters()) {
        if (param->paramName.equalsIgnoreCase(paramName)) {
            param->beginParameterChangeGesture();
            if(isNormalized) param->setNormalisedParameter(paramValue, NotificationType::sendNotification);
            else param->setParameter(paramValue, NotificationType::sendNotification);
            param->endParameterChangeGesture();
            std::cout << "set " << paramName
            << " to " << message[1].getFloat32()
            << " explicitvalue: " << param->valueToString(param->getCurrentExplicitValue())
            <<std::endl;
            break;
        }
    }
}

void FluidOscServer::setPluginParamAt(const OSCMessage& message) {
    if (message.size() > 5 ||
        !message[0].isString() ||
        !message[1].isFloat32() ||
        !message[2].isFloat32() ||
        !message[3].isFloat32() ||
        !message[4].isString() ) {
        std::cout << "Setting parameter failed. Incorrect arguments." << std::endl;
        return;
    }

    if (!selectedPlugin) {
        std::cout << "Setting plugin parameter failed: No selected plugin" << std::endl;
        return;
    }
    
    String paramName = message[0].getString();
    float paramValue = message[1].getFloat32();
    bool isNormalized = message[4].getString() == "normalized";
    if (isNormalized){
        if (paramValue > 1 || paramValue < 0){
            std::cout
                << "Setting parameter " << paramName
                << " failed. Normalized value has to be between 0 and 1."
                << std::endl;
            return;
        }
    }
    
    double changeQuarterNote = (double)message[2].getFloat32();
    if (changeQuarterNote < 0) {
        std::cout
            << "Setting parameter " << paramName
            << " failed. Time has to be a positive number."
            << std::endl;
        return;
    }
    double changeTime = activeCybrEdit->getEdit().tempoSequence.beatsToTime(changeQuarterNote);
    
    float curveValue = message[3].getFloat32();
    if (curveValue > 1 || curveValue < -1) {
        std::cout
            << "Setting parameter " << paramName
            << " failed. Curve has to be between -1 and 1."
            << std::endl;
        return;
    }

    for (te::AutomatableParameter* param : selectedPlugin->getAutomatableParameters()) {
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
            
            std::cout
                << "set " << paramName
                << " to " << message[1].getFloat32() << " explicit value: " << param->valueToString(paramValue)
                << " at " << changeQuarterNote << " Quarter Note(s)."
                << std::endl;

            break;
        }
    }
}


void FluidOscServer::setPluginSideChainInput(const OSCMessage& message) {
    if (!selectedPlugin) {
        std::cout << "Cannot set plugin side chain input: No selected plugin" << std::endl;
        return;
    }

    if (!selectedPlugin->canSidechain()) {
        std::cout << "Cannot set plugin side chain input: Selected plugin cannot side chain" << std::endl;
        return;
    }

    if (!message.size() || !message[0].isString()) {
        std::cout << "Cannot set plugin side chain input: Missing input-track-name arg" << std::endl;
        return;
    }

    String inputTrackname = message[0].getString();
    te::AudioTrack* inputTrack = getOrCreateAudioTrackByName(selectedPlugin->edit, inputTrackname);
    selectedPlugin->setSidechainSourceID(inputTrack->itemID);
    std::cout << "Side chain input: " << inputTrack->getName() << std::endl;

    if (auto compressor = dynamic_cast<te::CompressorPlugin*>(selectedPlugin)) {
        std::cout << "NOTE: when enabling a side chain in put on the internal compressor plugin, the side chain will be enabled by default. " << std::endl;
        compressor->useSidechainTrigger = true;
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
    selectedClip = getOrCreateMidiClipByName(*selectedAudioTrack, clipName);

    // Clip startBeats
    if (message.size() >= 2 && message[1].isFloat32()) {
        double startBeats = message[1].getFloat32();
        double startSeconds = activeCybrEdit->getEdit().tempoSequence.beatsToTime(startBeats);
        selectedClip->setStart(startSeconds, false, true);
    }
    // Clip length
    if (message.size() >= 3 && message[2].isFloat32()) {
        double lengthInBeats = message[2].getFloat32();
        double startBeat = selectedClip->getStartBeat();
        double endBeat = startBeat + lengthInBeats;
        double endTime = activeCybrEdit->getEdit().tempoSequence.beatsToTime(endBeat);
        selectedClip->setEnd(endTime, true);
    }
}

void FluidOscServer::clearMidiClip(const juce::OSCMessage& message) {
    if (!selectedClip) {
        std::cout << "Cannot clear midi clip: No clip selected" << std::endl;
        return;
    }

    auto selectedMidiClip = dynamic_cast<te::MidiClip*>(selectedClip);
    if (!selectedMidiClip) {
        std::cout << "Cannot clear midi clip: selected clip is not a midi clip" << std::endl;
        return;
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

}

void FluidOscServer::insertMidiNote(const juce::OSCMessage& message) {
    if(!selectedClip){
        std::cout << "Cannot insert midi note: No clip selected." << std::endl;
        return;
    }
    if(message.size() < 3){
        std::cout << "Cannot insert midi note: Not enough arguments."<< std::endl;
        return;
    }

    auto selectedMidiClip = dynamic_cast<te::MidiClip*>(selectedClip);
    if (!selectedMidiClip) {
        std::cout << "Cannot insertMidiNoe: selected clip is not a midi clip" << std::endl;
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
    if(!selectedAudioTrack){
        std::cout << "Cannot insert wave sample: Must select Audio Track before inserting" << std::endl;
        return;
    }

    if(message.size() < 3){
        std::cout << "Cannot insert wave file: only recieved " << message.size() << "arguments." << std::endl;
        return;
    }

    if (!message[0].isString()) {
        std::cout << "Cannot insert wave file: first argument must be a clipName string" << std::endl;
        return;
    }
    String clipName = message[0].getString();

    if (!message[1].isString()) {
        std::cout << "Cannot insert wave file: second argument must be a filepath string" << std::endl;
        return;
    }
    String filePath = message[1].getString();

    if (!message[2].isFloat32() && !message[2].isInt32()) {
        std::cout << "Cannot insert wave file: third argument must be a quarterNote start time int or float" << std::endl;
        return;
    }

    double startBeat = 0;
    if (message[2].isFloat32()) startBeat = message[2].getFloat32();
    else if (message[2].isInt32()) startBeat = message[2].getInt32();
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

    te::AudioFile audiofile(file);
    if(!audiofile.isWavFile()){
        std::cout << "Cannot insert wave file: Must be valid WAV file." << std::endl;
        return;
    }

    te::EditTimeRange timeRange = te::EditTimeRange(startSeconds, startSeconds+audiofile.getLength());

    te::ClipPosition pos;
    pos.time = timeRange;
    te::WaveAudioClip::Ptr c = selectedAudioTrack->insertWaveClip(clipName, file, pos, false);
    selectedClip = c.get();
}

void FluidOscServer::setTrackGain(const OSCMessage& message) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot set track gain: No track selected." << std::endl;
        return;
    }

    if (!message.size() || !message[0].isFloat32()) {
        std::cout << "Cannot set track gain: Missing arguments." << std::endl;
        return;
    }

    if (auto volumePlugin = selectedAudioTrack->getVolumePlugin()) {
        volumePlugin->setVolumeDb(message[0].getFloat32());
    } else {
        std::cout << "Cannot set track gain: Track is missing volume plugin." << std::endl;
    }

}

void FluidOscServer::muteTrack(bool mute) {
    if (!selectedAudioTrack) {
        std::cout << "Cannot " << (mute ? "mute" : "unmute") << ": No track selected." << std::endl;
        return;
    }

    selectedAudioTrack->setMute(mute);
}

void FluidOscServer::setTempo(const OSCMessage &message) {
    if (!message.size() || !message[0].isFloat32()) {
        std::cout << "Cannot set tempo: missing tempo argument" << std::endl;
    }

    float bpm = message[0].getFloat32();
    te::TempoSetting* tempo = activeCybrEdit->getEdit().tempoSequence.getTempo(0);
    tempo->setBpm(bpm);
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
    if (!activeCybrEdit) {
        std::cout << "Cannot update transport: No active edit" << std::endl;
        return;
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
        // If looping was previously disabled, setting looping to true seems to
        // move the playhead to the start of the loop. This surprised me, but is
        // okay for now. It is probably not the ideal behavior. Setting the loop
        // point should probably never change playback (currently it probably
        // only changes the playback iff we are not already looping, but if we
        // are looping a different region, playback will be unaffected).
        transport.looping.setValue(true, nullptr);
    }
};
