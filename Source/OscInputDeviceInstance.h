/*
  ==============================================================================

    OscInputDeviceInstance.h
    Created: 21 Jun 2019 4:41:01pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <vector>
#include "../JuceLibraryCode/JuceHeader.h"
#include "TimestampedTest.h"
#include "OscInputDevice.h"


namespace te = tracktion_engine;

class OscInputDevice;
class OscInputDeviceInstance : public te::InputDeviceInstance {
public:
    OscInputDeviceInstance(OscInputDevice& d, te::EditPlaybackContext& c);
    virtual ~OscInputDeviceInstance();
    OscInputDevice& getOscInput();

    // Called by the OscInputDevice on the "Build-in Output" thread
    void masterTimeUpdate(double streamTime);
    
    /** I believe this gets called automatically by transport.performRecord.
     However, this will not be called if:
     - MidiInputDevice::recordingEnabled != true
     - InputDeviceInstance::recordEnabled != true
     - InputDeviceInstance::getTargetTrack does not return a track
     These are requirements even if we call transport.record with the second
     argument, `allowRecordingIfNoInputsArmed = true`. */
    juce::String prepareToRecord (double start, double punchIn,
                                  double sampleRate, int blockSizeSamples,
                                  bool isLivePunch) override;

    bool startRecording() override;
    bool isRecording() override;
    void stop() override; // called on the master thread
    
    // called if not all devices started correctly when recording started.
    void recordWasCancelled() override;

    // getPunchInTime is identical to MidiInputDeviceInstance
    double getPunchInTime() override;

    // see MidiInputDeviceInstance::stopRecording for what this is really supposed to do
    te::Clip::Array stopRecording() override;

    /** Process all the incoming OSC messages. Like `masterTimeUpdate` this is called by
     OscInputDevice on the "Built-in Output" thread. */
    void handleOscMessages(std::vector<TimestampedTest> ttMsgs);
    
    te::Clip::Array applyLastRecordingToEdit (te::EditTimeRange recordedRange,
                                              bool isLooping, te::EditTimeRange loopRange,
                                              bool discardRecordings,
                                              te::SelectionManager*) override;

    // see MidiInputDeviceInstance for what this is really supposed to do.
    te::Clip* applyRetrospectiveRecord (te::SelectionManager*) override;
    
    te::AudioNode* createLiveInputNode() override;
    
    /** As far as I can tell, startTime refers to when the recording began.
     startTime does not (In MidiInputDeviceInstance) get updated when we
     just begin playback. */
    double startTime = 0;
    /** How long have we been paused for? */
    double pausedTime = 0;
    /** Most recent streamTime */
    double lastEditTime = -1;
    /** Are we currently recording? */
    bool recording = false;
    
    /** Pass messages from edit to the message thread.
     It's a little bit risky to make this public, because we don't want anyone
     replacing it. It will be refactored when we template it, so for now just
     using a public member is a reasonable compromize. */
    LockFreeOscMessageQueue toMessageThread;
};

