/*
  ==============================================================================

    OscInputDevice.h
    Created: 21 Jun 2019 10:47:01am
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "OscInputDeviceInstance.h"

namespace te = tracktion_engine;


// For now, just use a simple test message. Later we can figure out if and how
// to subclass or DRY these.
struct TimestampedTest {
    double arrivedAt = 0;
    double streamTime = 0;
    int value;
    String toString() {
        String t(streamTime, 4);
        String s{ "test: " };
        s << t << " - " << value;
        return s;
    }
};

// This Custom Midi Input Helps us expose adjustSecs, which is used to convert
// a Time::getMillisecondCounterHiRes() time to a streamTime relative value.
class OscInputDeviceInstance;
class OscInputDevice : public te::VirtualMidiInputDevice {
public:
    OscInputDevice(te::Engine& e, const String& name);
    
    void masterTimeUpdate (double time) override;
    te::InputDeviceInstance* createInstance (te::EditPlaybackContext& c) override;
    
    void saveProps() override {} // no-op prevents saving, but
    void loadProps() override {} // doesn't work. Why?
    
    static const String name;
    std::atomic<double> atomicAdjustSecs { 0 };
    
    void addInstance(OscInputDeviceInstance* i);
    void removeInstance(OscInputDeviceInstance* i);
    
protected:
    juce::CriticalSection instanceLock;
    juce::Array<OscInputDeviceInstance*> instances;
};

Result createOscInputDevice(te::Engine& engine, const String& name);

