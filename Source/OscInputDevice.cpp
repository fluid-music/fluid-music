/*
  ==============================================================================

    OscInputDevice.cpp
    Created: 21 Jun 2019 10:47:01am
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "OscInputDevice.h"



const String OscInputDevice::name{"OSC-Input-Device"};

/** Create an OscInputDevice, and add it to the the engine. Note that this
 currently only allows one OSC device to exist at a time. If there is already
 an OSC Input Device in the device manager it will be removed before a new one
 is added. */
Result createOscInputDevice(te::Engine& engine, const String& name)
{
    // CRASH_TRACER
    TRACKTION_ASSERT_MESSAGE_THREAD
    {
        auto& mi = engine.getDeviceManager().midiInputs;
        for (int i = 0; i < mi.size(); i++) {
            if (mi[i]->getName() == OscInputDevice::name) {
                // Editing an array while iterating is normally a bad idea.
                // We must break the loop immediately.
                mi.remove(i);
                break;
            }
        }
    }
    
    // This is where the original function would check the engine property
    // storage, and fail if a input device with the specified name already
    // exists. We are skipping over that because we just delete the device
    // (if it exists) in the code above. For the original behavior, see:
    // te::DeviceManager::createVirtualMidiDevice(const juce::String &name);
    
    {
        te::DeviceManager::ContextDeviceListRebuilder deviceRebuilder (engine.getDeviceManager());
        
        OscInputDevice* oscDevice = new OscInputDevice (engine, name);
        engine.getDeviceManager().midiInputs.add (oscDevice);
        
        oscDevice->setEnabled (true);
        oscDevice->initialiseDefaultAlias();
        oscDevice->saveProps(); // Check: if this is commented out, is this still saved?
    }
    
    te::VirtualMidiInputDevice::refreshDeviceNames (engine);
    engine.getDeviceManager().sendChangeMessage();
    
    return Result::ok();
}

////////////////////////////////////////////////////////////////////////

OscInputDevice::OscInputDevice(te::Engine& e, const String& name) :
    // The VirtualMidiInputDevice constructor is specified with a type enum.
    // Below I am using the VirtualMidiInputDevice, which is technically
    // correct, but could also lead to some subtle bugs down the line.
    VirtualMidiInputDevice(e, name, te::InputDevice::virtualMidiDevice)
{
    std::cout << "Creating OscInputDevice" << std::endl;
    oscReceiver.addListener(this);
    if (oscReceiver.connect(9999)) {
        std::cout << "Listening for OSC" << std::endl;
    } else {
        std::cout << "Failed to Listen for OSC" << std::endl;
    }
}

void OscInputDevice::masterTimeUpdate (double streamTime)
{
    adjustSecs = streamTime - Time::getMillisecondCounterHiRes() * 0.001;
    atomicAdjustSecs = adjustSecs;

    // temporary storage for received values
    // is std::vector the right container?
    std::vector<TimestampedTest> received;
    
    // Handle lock free queue
    int start1, size1, start2, size2;
    abstractFifo.prepareToRead(abstractFifo.getNumReady(), start1, size1, start2, size2);
    received.reserve(size1+size2);

    // previous we did: auto* t = cybr.cybrTrackList->getOrCreateLastTrack();
    
    if (adjustSecs == 0) {
        std::cout << "Failed to get adjust secs" << std::endl;
    } else {
        for (int i = start1; i < start1 + size1; i++) {
            auto& obj = storage[i];
            obj.streamTime = storage[i].arrivedAt + adjustSecs;
            received.push_back(obj);
        }
        for (int i = start2; i < start2 + size2; i++) {
            auto& obj = storage[i];
            obj.streamTime = storage[i].arrivedAt + adjustSecs;
            received.push_back(obj);
        }
    }
    abstractFifo.finishedRead(size1 + size2);
    
    if (size1 || size2)
        std::cout
            << "Handled " << size1 << " + " << size2 << " elements"
            << std::endl << std::endl;

    const ScopedLock sl (instanceLock);
    for (auto instance : instances) {
        instance->masterTimeUpdate (streamTime);
        instance->handleOscMessages(received);
    }
}

te::InputDeviceInstance* OscInputDevice::createInstance (te::EditPlaybackContext& c)
{
    return new OscInputDeviceInstance(*this, c);
}

void OscInputDevice::addInstance (OscInputDeviceInstance* i)
{
    const ScopedLock sl (instanceLock);
    instances.addIfNotAlreadyThere(i);
}

void OscInputDevice::removeInstance (OscInputDeviceInstance* i)
{
    const ScopedLock sl (instanceLock);
    instances.removeAllInstancesOf(i);
}

void OscInputDevice::oscMessageReceived(const OSCMessage& message) {
    // Create the object
    double timeMs = Time::getMillisecondCounterHiRes();
    if (message.size() < 1) return;
    if (!message[0].isInt32()) return;
    TimestampedTest obj{ timeMs * 0.001, 0.0, 0.0, message[0].getInt32() };
    
    // write to QUEUE
    int start1, size1, start2, size2;
    abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
    if (size1 > 0) storage[start1] = obj;
    else if (size2 > 0) storage[start2] = obj;
    abstractFifo.finishedWrite(size1 + size2);

    if (size1 + size2 == 0) {
        // If our buffer was full, just throw some stuff in the buffer away.
        // 10 was chosen arbitrarily.
        abstractFifo.prepareToRead(10, start1, size1, start2, size2);
        abstractFifo.finishedRead(size1 + size2);

        // write to QUEUE should be identical to above
        abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
        if (size1 > 0) storage[start1] = obj;
        else if (size2 > 0) storage[start2] = obj;
        abstractFifo.finishedWrite(size1 + size2);
    }
}

void OscInputDevice::oscBundleReceived(const OSCBundle& bundle) {
    std::cout << "OSC bundle received" << std::endl;
}

