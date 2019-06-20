/*
  ==============================================================================

    OscRecorder.h
    Created: 8 Jun 2019 12:33:07pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "CybrEdit.h"

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
class AdjustInputDevice : public te::VirtualMidiInputDevice {
public:
    AdjustInputDevice(te::Engine& e, const String& name) :
        // The VirtualMidiInputDevice constructor is specified with a type enum.
        // Below I am using the VirtualMidiInputDevice, which is technically
        // correct, but could also lead to some subtle bugs down the line.
        VirtualMidiInputDevice(e, name, te::InputDevice::virtualMidiDevice) {}

    void masterTimeUpdate (double time) override {
        MidiInputDevice::masterTimeUpdate (time);
        atomicAdjustSecs = adjustSecs;
    }

    void saveProps() override {} // no-op prevents saving
    void loadProps() override {} // doesn't work. Why?

    static const String name;
    std::atomic<double> atomicAdjustSecs { 0 };
};


Result createAdjustInputDevice(te::Engine& engine, const String& name);

/** This class accepts osc messages. For each message received:
- convert to class object
- add a timestamp
- save in a Lock Free Queue
 
Eventually we want to subclass or template this so that we can pass in a type.
Note the two options for the callback type
OSCReceiver::RealtimeCallback // OSCReceiver::MessageLoopCallback
 */
class CybrEdit;
class OscRecorder : public Timer,
                    private OSCReceiver::Listener<OSCReceiver::RealtimeCallback>
{
public:
    OscRecorder(CybrEdit& c);
    virtual ~OscRecorder();
    void timerCallback() override;
    void listen();

private:
    void oscMessageReceived(const OSCMessage& message) override;
    void oscBundleReceived(const OSCBundle& bundle) override;

    OSCReceiver oscReceiver;
    static const int SIZE = 1024;
    AbstractFifo abstractFifo{ SIZE };
    TimestampedTest storage[SIZE];
    CybrEdit& cybr;
};
