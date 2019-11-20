/*
  ==============================================================================

    AppJobs.cpp
    Created: 19 Nov 2019 9:13:17pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "AppJobs.h"

void AppJobs::play(CybrEdit& cybrEdit) {
    CybrEdit* newCybrEdit = copyCybrEditForPlayback(cybrEdit);
    te::Edit& newEdit = newCybrEdit->getEdit();
    
    newEdit.getTransport().play(false);
    
    add(newCybrEdit);
    Timer::callAfterDelay((int)ceil(newEdit.getLength() * 1000.), [this, newCybrEdit]() {
        remove(newCybrEdit);
    });
}

void AppJobs::record(CybrEdit& cybrEdit) {
    CybrEdit* newCybrEdit = copyCybrEditForPlayback(cybrEdit);
    te::Edit& newEdit = newCybrEdit->getEdit();

    newEdit.getTransport().triggerClearDevicesOnStop(); // Without this, we go into an infinite loop
    newCybrEdit->saveOnClose = true;

    // It is possible to record without any tracks armed, but that means that
    // the `OscInputDeviceInstance::prepareToRecord` and `startRecording` handlers
    // will not be called. Below we disarm recording on all inputs except
    // `OscInputDeviceInstance`s.

    // When an Edit is first created, it will have no playback context, which is where
    // the `inputDeviceInstance`s are. I believe that a call to `getAllInputDevices`
    // before the `EditPlaybackContext` is allocated will just return an empty array.
    newEdit.getTransport().ensureContextAllocated();
    auto cybrHostTrack = cybrEdit.getOrCreateCybrHostAudioTrack();
    for (auto i : newEdit.getAllInputDevices())
    {
        if (auto oscInstance = dynamic_cast<OscInputDeviceInstance*>(i))
        {
            std::cout << "Found OSC input: " << oscInstance->owner.getName() << std::endl;
            i->setTargetTrack(cybrHostTrack, 0);
            i->setRecordingEnabled(true); // Arm the track
            // We just set the targetTrack, However, note that a single track can have
            // multiple inputs (the second argument, trackIndex, specified which slot
            // to set this to. We should be careful, because another input device
            // instance could possibly point to the same slot. I have not looked in
            // to what the implications of this are.
            //
            // If we wanted to have multiple OSC inputs, we would probably want to
            // increment the targetIndex.
        } else {
            // if there are any other inputs that are targeting this track, clear them.
            i->setRecordingEnabled(false);
            if (i->getTargetTrack() == cybrHostTrack) i->clearFromTrack();
        }
    }

    // It looks like it is an error call `.record()` while playing an edit.
    // The way punch-in/out works in Waveform is: You have to start recording
    // with at least one track armed. Then you can punch in our out on all
    // tracks, including the one that was initially armed. This probably
    // corresponds to the punch methods on the input/output device instances.
    //
    // The second argument to record is `allowRecordingIfNoInputsArmed`.
    newCybrEdit->getEdit().getTransport().record(false, false);

    add(newCybrEdit);
    Timer::callAfterDelay((int)ceil(newEdit.getLength() * 1000. + 1000), [this, newCybrEdit]() {
        newCybrEdit->getEdit().getTransport().stop(true, false);
        remove(newCybrEdit);
    });
}

bool AppJobs::runFluidOscServer(int listenPort) {
    if (!fluidOscServer.connect(listenPort)) {
        std::cout << "FluidOscServer falied to connect" << std::endl;
        return false;
    }
    setRunForever(true);
    std::cout << "FluidOscServer connected!" << std::endl;
    return true;
}

bool AppJobs::add(CybrEdit* cybrEdit) {
    if (playingEdits.contains(cybrEdit)) return false;

    playingEdits.add(cybrEdit);
    sendChangeMessage();
    return true;
}

bool AppJobs::remove(const CybrEdit* cybrEdit) {
    if (!playingEdits.contains(cybrEdit)) return false;

    playingEdits.removeObject(cybrEdit);
    sendChangeMessage();
    return true;
}

void AppJobs::setRunForever(bool newFlag) {
    bool changed = (newFlag != runForever);
    runForever = newFlag;
    if (changed) sendChangeMessage();
}
