/*
  ==============================================================================

    OscSender.h
    Created: 15 Jun 2019 4:24:02pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

class OscSource : private HighResolutionTimer {
public:
    OscSource(String hostname, int targetPort, int periodInMilliseconds) : periodMs(periodInMilliseconds) {
        if (sender.connect(hostname, targetPort)) {
            std::cout << "Sending '/test' every " << periodMs << " milliseconds" << std::endl;
            start();
        } else {
            std::cout << "Failed to create OSC Source" << std::endl;
        }
        std::cout << std::endl;
    }

    void start() { startTimer(periodMs); }
    void stop() { stopTimer(); }
    
    void hiResTimerCallback() {
        sender.send({"/test"}, OSCArgument(counter++));
    }
private:
    juce::OSCSender sender;
    int counter = 0;
    int periodMs;
};
