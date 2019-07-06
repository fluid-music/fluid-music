/*
  ==============================================================================

    WipEdit.h
    Created: 7 Jun 2019 3:44:16pm
    Author:  Charles

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "CybrEdit.h"
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;
class AppJobs : public juce::ChangeBroadcaster {
public:

    /** Play the edit. This creates a NEW CybrEdit and a new te::Edit */
    void play(CybrEdit& cybrEdit) {
        CybrEdit* newCybrEdit = copyCybrEditForPlayback(cybrEdit);
        te::Edit& newEdit = newCybrEdit->getEdit();
 
        newEdit.getTransport().play(false);

        add(newCybrEdit);
        Timer::callAfterDelay((int)ceil(newEdit.getLength() * 1000.), [this, newCybrEdit]() {
            remove(newCybrEdit);
        });
    }
    
    void record(CybrEdit& cybrEdit) {
        CybrEdit* newCybrEdit = copyCybrEditForPlayback(cybrEdit);
        te::Edit& newEdit = newCybrEdit->getEdit();

        // It is possible to record without any tracks armed, but that means that
        // the `OscInputDeviceInstance::prepareToRecord` and `startRecording` handlers
        // will not be called. Below we disarm recording on all inputs except
        // `OscInputDeviceInstance`s.

        // When an Edit is first created, it will have no playback context, which is where
        // the `inputDeviceInstance`s are. I believe that a call to `getAllInputDevices`
        // before the `EditPlaybackContext` is allocated will just return an empty array.
        newEdit.getTransport().ensureContextAllocated();
        auto cybrHostTrack = cybrEdit.getOrCreateCybrHostAudioTrack();
        for (auto i : newEdit.getAllInputDevices()) {
            if (auto oscInstance = dynamic_cast<OscInputDeviceInstance*>(i)) {
                std::cout << "Found OSC input: " << oscInstance->owner.getName() << std::endl;
                oscInstance->recordEnabled = true; // this is a CachedValue
                oscInstance->setTargetTrack(cybrHostTrack, 0);
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
                if (i->getTargetTrack() == cybrHostTrack) i->clearFromTrack();
                i->recordEnabled = false;
            }
        }

        // It looks like it is an error call `.record()` while playing an edit.
        // The way punch-in/out works in Waveform is: You have to start recording
        // with at least one track armed. Then you can punch in our out on all
        // tracks, including the one that was initially armed. This probably
        // corresponds to the punch methods on the input/output device instances.
        //
        // The second argument to record is `allowRecordingIfNoInputsArmed`. I've
        // experience a bug:
        // - when we set this to true, and there is no VST in the edit, our app
        // goes into an infinite loop of TransportControl::valueTreePropChanged
        // callbacks.
        newCybrEdit->getEdit().getTransport().record(false, false);

        add(newCybrEdit);
        Timer::callAfterDelay((int)ceil(newEdit.getLength() * 1000.), [this, newCybrEdit]() {
            newCybrEdit->getEdit().getTransport().stop(true, false);
            remove(newCybrEdit);
        });
    }

    /** Add a CybrEdit if it is not already present. If succesful, AppJobs will
     own that CybrEdit, and is responsible for deleting it. Returns success. */
    bool add(CybrEdit* cybrEdit) {
        if (playingEdits.contains(cybrEdit)) return false;
        
        playingEdits.add(cybrEdit);
        sendChangeMessage();
        return true;
    }

    /** Remove a CybrEdit if it exists in the collection. Returns success. */
    bool remove(const CybrEdit* cybrEdit) {
        if (!playingEdits.contains(cybrEdit)) return false;
    
        playingEdits.removeObject(cybrEdit);
        sendChangeMessage();
        return true;
    }

    bool isEmpty() { return playingEdits.size() == 0; }
    bool isFinished() { return isEmpty() && ! runForever; }
    bool getRunForever() { return runForever; }
    void setRunForever(bool newFlag) {
        bool changed = (newFlag != runForever);
        runForever = newFlag;
        if (changed) sendChangeMessage();
    }

private:
    static CybrEdit* copyCybrEditForPlayback(CybrEdit& cybrEdit) {
        te::Edit& edit = cybrEdit.getEdit();
        te::Edit::Options options{ edit.engine };
        options.editState = edit.state;
        options.role = te::Edit::EditRole::forEditing;
        options.editProjectItemID = te::ProjectItemID::createNewID(0);
        options.numUndoLevelsToStore = 0;
        options.editFileRetriever = [] {
            return File::getCurrentWorkingDirectory().getChildFile("temp.tracktionedit");
        };
        // CybrEdit takes responsibility for deleting the Edit (via unique_ptr)
        te::Edit* newEdit = new te::Edit(options);
        newEdit->initialiseAllPlugins();
        newEdit->getTransport().position = 0;
        CybrEdit* newCybrEdit = new CybrEdit(newEdit);
        return newCybrEdit;
    }

    juce::OwnedArray<CybrEdit> playingEdits;
    bool runForever = false;
};
