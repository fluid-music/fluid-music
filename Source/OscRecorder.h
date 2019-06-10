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
    double arrivedAt;
    int value;
    String toString() {
        String s{ "test: " };
        s << arrivedAt << " - " << value;
        return s;
    };
};

// Eventually we want to subclass or template this so that we can pass in a type
// Note the two options for the callback type
// OSCReceiver::RealtimeCallback // OSCReceiver::MessageLoopCallback
class OscRecorder : public Timer,
                    private OSCReceiver::Listener<OSCReceiver::RealtimeCallback>
{
public:
    OscRecorder() {
        std::cout << "Creating OSC Recorder" << std::endl;
        oscReceiver.addListener(this);
        if (oscReceiver.connect(9999)) {
            std::cout << "Listening for OSC" << std::endl;
        } else {
            std::cout << "Failed to Listen for OSC" << std::endl;
        }
        startTimer(3000);
        std::cout << std::endl;
    }
    void timerCallback() {
        int start1, size1, start2, size2;
        abstractFifo.prepareToRead(abstractFifo.getNumReady(), start1, size1, start2, size2);
        for (int i = start1; i < start1 + size1; i++) {
            std::cout << storage[i].toString() << std::endl;
        }
        for (int i = start2; i < start2 + size2; i++) {
            std::cout << storage[i].toString() << std::endl;
        }
        abstractFifo.finishedRead(size1 + size2);
        if (size1 || size2)
            std::cout
                << "Read " << size1 << " + " << size2 << " elements"
                << std::endl << std::endl;
    }
private:
    void oscMessageReceived(const OSCMessage& message) override {
        if (message.size() < 1) return;
        if (!message[0].isInt32()) return;
        TimestampedTest obj{ Time::getMillisecondCounterHiRes(), message[0].getInt32() };

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
};
