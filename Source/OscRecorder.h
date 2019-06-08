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

// OSCReceiver::RealtimeCallback
class OscRecorder : private OSCReceiver::Listener<OSCReceiver::MessageLoopCallback> {
public:
    OscRecorder() {
        std::cout << "Creating OSC Recorder" << std::endl;
        oscReceiver.addListener(this);
        if (oscReceiver.connect(9999)) {
            std::cout << "Listening for OSC" << std::endl;
        } else {
            std::cout << "Failed to Listen for OSC" << std::endl;
        }
        std::cout << std::endl;
    }
private:
    void oscMessageReceived(const OSCMessage& message) override {
        std::cout << "OSC Received: " << message.getAddressPattern().toString();
        for (auto arg : message) {
            if (arg.isInt32()) std::cout << " " << arg.getInt32();
        }
        std::cout << std::endl;
    }
    void oscBundleReceived(const OSCBundle& bundle) override {
        std::cout << "OSC bundle received" << std::endl;
    }
    OSCReceiver oscReceiver;
};
