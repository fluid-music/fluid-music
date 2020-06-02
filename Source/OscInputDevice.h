/*
  ==============================================================================

    OscInputDevice.h
    Created: 21 Jun 2019 10:47:01am
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include <vector>
#include "../JuceLibraryCode/JuceHeader.h"
#include "TimestampedTest.h"
#include "OscInputDeviceInstance.h"


namespace te = tracktion_engine;



// This Custom Midi Input Helps us expose adjustSecs, which is used to convert
// a Time::getMillisecondCounterHiRes() time to a streamTime relative value.
class OscInputDeviceInstance;
class OscInputDevice :
public te::VirtualMidiInputDevice,
private juce::OSCReceiver::Listener<juce::OSCReceiver::RealtimeCallback>
{
public:
    OscInputDevice(te::Engine& e, const juce::String& name, int listenPort);
    
    void masterTimeUpdate (double streamTime) override;
    te::InputDeviceInstance* createInstance (te::EditPlaybackContext& c) override;
    
    void saveProps() override {} // no-op prevents saving, but
    void loadProps() override {} // doesn't work. Why?
    
    static const juce::String name;
    std::atomic<double> atomicAdjustSecs { 0 };
    
    void addInstance(OscInputDeviceInstance* i);
    void removeInstance(OscInputDeviceInstance* i);
    
protected:
    juce::CriticalSection instanceLock;
    juce::Array<OscInputDeviceInstance*> instances;

private:
    void oscMessageReceived(const juce::OSCMessage& message) override;
    void oscBundleReceived(const juce::OSCBundle& bundle) override;
    
    juce::OSCReceiver oscReceiver;
    
    /** Get incoming messages from the network thread
     - write to this from the network thread in the OSCReceiver callback
     - read on the Built-in Output thread in the masterTimeUpdate callback
     */
    LockFreeOscMessageQueue incomingMessages;
};

juce::Result createOscInputDevice(te::Engine& engine, const juce::String& name, int listenPort);

