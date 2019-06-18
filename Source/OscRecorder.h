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

// Eventually we want to subclass or template this so that we can pass in a type
// Note the two options for the callback type
// OSCReceiver::RealtimeCallback // OSCReceiver::MessageLoopCallback
class OscRecorder : public Timer,
                    private OSCReceiver::Listener<OSCReceiver::RealtimeCallback>
{
public:
    OscRecorder(te::Engine& e) : engine(e) {
        std::cout << "Creating OSC Recorder" << std::endl;
        oscReceiver.addListener(this);
        if (oscReceiver.connect(9999)) {
            std::cout << "Listening for OSC" << std::endl;
        } else {
            std::cout << "Failed to Listen for OSC" << std::endl;
        }
        auto result = createAdjustInputDevice(engine, AdjustInputDevice::name);
        if (result.wasOk()){
            std::cout << "Created virtual midi device" << std::endl;
        } else {
            std::cout << "Failed to create virtual midi device: " << result.getErrorMessage() << std::endl;
        };
        startTimer(250);
        std::cout << std::endl;
    }
    void timerCallback() override {
        // get the first active MidiInputDevice
        auto& dm = engine.getDeviceManager();
        double adjustSecs = 0;
        for (int i = 0; i < dm.getNumMidiInDevices(); i++) {
            te::MidiInputDevice* mi = dm.getMidiInDevice(i);
            if (mi->getName() == AdjustInputDevice::name) {
                if (auto adjustInput = dynamic_cast<AdjustInputDevice*>(mi)) {
                    adjustSecs = adjustInput->atomicAdjustSecs;
                    break;
                }
            }
        }

        // Handle lock free queue
        int start1, size1, start2, size2;
        abstractFifo.prepareToRead(abstractFifo.getNumReady(), start1, size1, start2, size2);

        if (adjustSecs == 0) {
            std::cout << "Failed to get adjust secs" << std::endl;
        } else {
            for (int i = start1; i < start1 + size1; i++) {
                storage[i].streamTime = storage[i].arrivedAt + adjustSecs;
                std::cout << storage[i].toString() << std::endl;
            }
            for (int i = start2; i < start2 + size2; i++) {
                storage[i].streamTime = storage[i].arrivedAt + adjustSecs;
                std::cout << storage[i].toString() << std::endl;
            }
        }
        abstractFifo.finishedRead(size1 + size2);
        if (size1 || size2)
            std::cout
                << "Handled " << size1 << " + " << size2 << " elements"
                << std::endl << std::endl;
    }
private:
    void oscMessageReceived(const OSCMessage& message) override {
        if (message.size() < 1) return;
        if (!message[0].isInt32()) return;
        TimestampedTest obj{ Time::getMillisecondCounterHiRes() * 0.001, 0.0, message[0].getInt32() };

        int start1, size1, start2, size2;
        abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
        if (size1 > 0) storage[start1] = obj;
        else if (size2 > 0) storage[start2] = obj;
        abstractFifo.finishedWrite(size1 + size2);
    }

    void oscBundleReceived(const OSCBundle& bundle) override {
        std::cout << "OSC bundle received" << std::endl;
    }

    OSCReceiver oscReceiver;
    static const int SIZE = 1024;
    AbstractFifo abstractFifo{ SIZE };
    TimestampedTest storage[SIZE];
    te::Engine& engine;
};
