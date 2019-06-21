/*
  ==============================================================================

    OscInputDeviceInstance.h
    Created: 21 Jun 2019 4:41:01pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"
#include "OscInputDevice.h"

namespace te = tracktion_engine;

class OscInputDevice;
class OscInputDeviceInstance : public te::InputDeviceInstance {
public:
    OscInputDeviceInstance(OscInputDevice& d, te::EditPlaybackContext& c);
    virtual ~OscInputDeviceInstance();
    OscInputDevice& getOscInput();
    void masterTimeUpdate(double streamTime);
    
    juce::String prepareToRecord (double start, double punchIn,
                                  double sampleRate, int blockSizeSamples,
                                  bool isLivePunch) override;

    bool startRecording() override;
    bool isRecording() override;
    void stop() override;
    
    // called if not all devices started correctly when recording started.
    void recordWasCancelled() override;

    // getPunchInTime is identical to MidiInputDeviceInstance
    double getPunchInTime() override;

    // see MidiInputDeviceInstance::stopRecording for what this is really supposed to do
    te::Clip::Array stopRecording() override;
    
    te::Clip::Array applyLastRecordingToEdit (te::EditTimeRange recordedRange,
                                              bool isLooping, te::EditTimeRange loopRange,
                                              bool discardRecordings,
                                              te::SelectionManager*) override;

    // see MidiInputDeviceInstance for what this is really supposed to do.
    te::Clip* applyRetrospectiveRecord (te::SelectionManager*) override;
    
    te::AudioNode* createLiveInputNode() override;
    
    double startTime = 0;
    bool recording = false;
};

