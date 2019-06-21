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
#include "OscInputDevice.h"
#include "CybrEdit.h"

namespace te = tracktion_engine;

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
