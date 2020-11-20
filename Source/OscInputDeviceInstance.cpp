/*
  ==============================================================================

    OscInputDeviceInstance.cpp
    Created: 21 Jun 2019 4:41:01pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "OscInputDeviceInstance.h"

OscInputDeviceInstance::OscInputDeviceInstance(OscInputDevice& d, te::EditPlaybackContext& c) :
    te::InputDeviceInstance(d, c),
    recordingStartTime(0),
    recording(false)
{
    getOscInput().addInstance(this);
}

OscInputDeviceInstance::~OscInputDeviceInstance()
{
    getOscInput().removeInstance(this);
}

void OscInputDeviceInstance::masterTimeUpdate(double streamTime)
{
    // This behavior is copied directly from MidiDeviceInstance::masterTimeUpdate
    if (context.playhead.isPlaying())
    {
        pausedTime = 0;
        lastEditTime = context.playhead.streamTimeToSourceTime (streamTime);
    }
    else
    {
        pausedTime += edit.engine.getDeviceManager().getBlockSizeMs() / 1000.0;
    }
}

juce::String OscInputDeviceInstance::prepareToRecord (
    double start,
    double punchIn,
    double sampleRate,
    int blockSizeSamples,
    bool isLivePunch)
{
    // The MidiInputDeviceInstanceBase::prepareToRecord method assigns
    // `start` to `startTime`, which is a little strange, bucause the
    // MidiInputDeviceInstancBase::getPunchInTime returns `startTime`, so I
    // would expect this method to use `punchIn`.
    recordingStartTime = punchIn;
    return {};
}

OscInputDevice& OscInputDeviceInstance::getOscInput()
{
    return static_cast<OscInputDevice&>(owner);
}

bool OscInputDeviceInstance::startRecording() { recording = true; return recording; }
bool OscInputDeviceInstance::isRecording() { return recording; }
void OscInputDeviceInstance::stop() { recording = false; } // called on the message thread
void OscInputDeviceInstance::recordWasCancelled() { recording = false; }
double OscInputDeviceInstance::getPunchInTime() { return recordingStartTime; }
juce::Array<te::Clip*> OscInputDeviceInstance::applyRetrospectiveRecord (te::SelectionManager*) { return {}; }
te::Clip::Array OscInputDeviceInstance::stopRecording() { recording = false; return {}; }
te::AudioNode* OscInputDeviceInstance::createLiveInputNode() { return new te::MixerAudioNode(false, false); }

te::Clip::Array OscInputDeviceInstance::applyLastRecordingToEdit (
    te::EditTimeRange recordedRange,
    bool isLooping,
    te::EditTimeRange loopRange,
    bool discardRecordings,
    te::SelectionManager*)
{
    //std::cerr << "OscInputDeviceInstance::applyLastRecordingToEdit is currently a no-op!"<< std::endl;
    return {};
}

// Should be called from the OscInputDevice
void OscInputDeviceInstance::handleOscMessages(std::vector<TimestampedTest> ttMsgs)
{
    for (auto tt : ttMsgs)
    {
        tt.editTime = context.playhead.streamTimeToSourceTime(tt.streamTime);
        if (recording && tt.editTime >= recordingStartTime) toMessageThread.writeMessage(tt);
    }
}

void OscInputDeviceInstance::addConsumer (te::InputDeviceInstance::Consumer* node) { juce::ScopedLock sl (nodeLock); nodes.addIfNotAlreadyThere (node); }
void OscInputDeviceInstance::removeConsumer (te::InputDeviceInstance::Consumer* node) { juce::ScopedLock sl (nodeLock); nodes.removeAllInstancesOf (node); }
