/*
  ==============================================================================

    OscInputDeviceInstance.cpp
    Created: 21 Jun 2019 4:41:01pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "OscInputDeviceInstance.h"

OscInputDeviceInstance::OscInputDeviceInstance(OscInputDevice& d, te::EditPlaybackContext& c)
    : te::InputDeviceInstance(d, c)
{
    //getOscInput().addInstance(this);
}

OscInputDeviceInstance::~OscInputDeviceInstance()
{
    //getOscInput().removeInstance(this);
}

void OscInputDeviceInstance::masterTimeUpdate(double time)
{
    // copied directly from MidiDeviceInstance::masterTimeUpdate
    if (context.playhead.isPlaying())
    {
        //pausedTime = 0;
        //lastEditTime = context.playhead.streamTimeToSourceTime (time);
    }
    else
    {
        //pausedTime += edit.engine.getDeviceManager().getBlockSizeMs() / 1000.0;
    }
}

juce::String OscInputDeviceInstance::prepareToRecord (
    double start,
    double punchIn,
    double sampleRate,
    int blockSizeSamples,
    bool isLivePunch)
{
    startTime = start;
    return {};
}

OscInputDevice& OscInputDeviceInstance::getOscInput()
{
    return static_cast<OscInputDevice&>(owner);
}

bool OscInputDeviceInstance::startRecording() { recording = true; return recording; }
bool OscInputDeviceInstance::isRecording() { return recording; }
void OscInputDeviceInstance::stop() { recording = false; }
void OscInputDeviceInstance::recordWasCancelled() { recording = false; }
double OscInputDeviceInstance::getPunchInTime() { return startTime; }
te::Clip* OscInputDeviceInstance::applyRetrospectiveRecord (te::SelectionManager*) { return nullptr; }
te::Clip::Array OscInputDeviceInstance::stopRecording() { recording = false; return {}; }
te::AudioNode* OscInputDeviceInstance::createLiveInputNode() { return new te::MixerAudioNode(false, false); }

te::Clip::Array OscInputDeviceInstance::applyLastRecordingToEdit (
    te::EditTimeRange recordedRange,
    bool isLooping,
    te::EditTimeRange loopRange,
    bool discardRecordings,
    te::SelectionManager*)
{
    std::cerr << "OscInputDeviceInstance::applyLastRecordingToEdit is currently a no-op!"<< std::endl;
    return {};
}


