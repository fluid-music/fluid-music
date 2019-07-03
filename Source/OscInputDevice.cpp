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

    auto received = incomingMessages.read();
    for (auto&& msg : received) {
        msg.streamTime = msg.arrivedAt + adjustSecs;
    }

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
    incomingMessages.writeMessage(message, timeMs);
}

void OscInputDevice::oscBundleReceived(const OSCBundle& bundle) {
    std::cout << "OSC bundle received" << std::endl;
}

