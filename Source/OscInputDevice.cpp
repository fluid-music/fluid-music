/*
  ==============================================================================

    OscInputDevice.cpp
    Created: 21 Jun 2019 10:47:01am
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "OscInputDevice.h"



const String OscInputDevice::name{"stream-time-helper"};

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
        
        // This uses
        auto vmi = new OscInputDevice (engine, name);
        engine.getDeviceManager().midiInputs.add (vmi);
        
        vmi->setEnabled (true);
        vmi->initialiseDefaultAlias();
        vmi->saveProps(); // Checking if this is commented out is this still saved?
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
{}

void OscInputDevice::masterTimeUpdate (double streamTime)
{
    adjustSecs = streamTime - Time::getMillisecondCounterHiRes() * 0.001;
    atomicAdjustSecs = adjustSecs;

    const ScopedLock sl (instanceLock);

    for (auto instance : instances)
        instance->masterTimeUpdate (streamTime);
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
