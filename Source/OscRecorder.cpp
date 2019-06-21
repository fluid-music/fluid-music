/*
  ==============================================================================

    OSCRecorder.cpp
    Created: 18 Jun 2019 2:57:59pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "OscRecorder.h"


OscRecorder::OscRecorder(CybrEdit& c) : cybr(c)
{
    auto result = createOscInputDevice(cybr.edit.engine, OscInputDevice::name);
    if (result.wasOk()){
        std::cout << "Created virtual midi device" << std::endl;
    } else {
        std::cout << "Failed to create virtual midi device: " << result.getErrorMessage() << std::endl;
    };

    std::cout << std::endl;
}

OscRecorder::~OscRecorder() {
//    timerCallback(); // segfault!
}

void OscRecorder::listen() {
    std::cout << "Creating OSC Recorder" << std::endl;
    oscReceiver.addListener(this);
    if (oscReceiver.connect(9999)) {
        std::cout << "Listening for OSC" << std::endl;
        startTimer(250);
    } else {
        std::cout << "Failed to Listen for OSC" << std::endl;
    }
}

void OscRecorder::timerCallback() {
    // get the first active MidiInputDevice
    auto& dm = cybr.edit.engine.getDeviceManager();
    double adjustSecs = 0;
    for (int i = 0; i < dm.getNumMidiInDevices(); i++) {
        te::MidiInputDevice* mi = dm.getMidiInDevice(i);
        if (mi->getName() == OscInputDevice::name) {
            if (auto adjustInput = dynamic_cast<OscInputDevice*>(mi)) {
                adjustSecs = adjustInput->atomicAdjustSecs;
                break;
            }
        }
    }
    
    // Handle lock free queue
    int start1, size1, start2, size2;
    abstractFifo.prepareToRead(abstractFifo.getNumReady(), start1, size1, start2, size2);
    auto* t = cybr.cybrTrackList->getOrCreateLastTrack();

    if (adjustSecs == 0) {
        std::cout << "Failed to get adjust secs" << std::endl;
    } else {
        for (int i = start1; i < start1 + size1; i++) {
            auto& obj = storage[i];
            obj.streamTime = storage[i].arrivedAt + adjustSecs;
            t->addEvent(obj.streamTime, obj.value);
        }
        for (int i = start2; i < start2 + size2; i++) {
            auto& obj = storage[i];
            obj.streamTime = storage[i].arrivedAt + adjustSecs;
            t->addEvent(obj.streamTime, obj.value);
        }
    }
    abstractFifo.finishedRead(size1 + size2);
    if (size1 || size2)
        std::cout
            << "Handled " << size1 << " + " << size2 << " elements"
            << std::endl << std::endl;
}

void OscRecorder::oscMessageReceived(const OSCMessage& message) {
    // Create the object
    double timeMs = Time::getMillisecondCounterHiRes();
    if (message.size() < 1) return;
    if (!message[0].isInt32()) return;
    TimestampedTest obj{ timeMs * 0.001, 0.0, message[0].getInt32() };
    
    // write to QUEUE
    int start1, size1, start2, size2;
    abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
    if (size1 > 0) storage[start1] = obj;
    else if (size2 > 0) storage[start2] = obj;
    abstractFifo.finishedWrite(size1 + size2);
}

void OscRecorder::oscBundleReceived(const OSCBundle& bundle) {
    std::cout << "OSC bundle received" << std::endl;
}


