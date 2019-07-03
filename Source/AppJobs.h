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
        te::Edit& edit = cybrEdit.getEdit();
        te::Edit::Options options{ edit.engine };
        options.editState = edit.state;
        options.role = te::Edit::EditRole::forEditing;
        options.editProjectItemID = te::ProjectItemID::createNewID(0);
        options.numUndoLevelsToStore = 0;
        options.editFileRetriever = [] {
            return File::getCurrentWorkingDirectory().getChildFile("temp.tracktionedit");
        };
        // The CybrEdit takes responsibility for deleting the edit (via unique_ptr)
        te::Edit* newEdit = new te::Edit(options);
        CybrEdit* newCybrEdit = new CybrEdit(newEdit);
        newEdit->initialiseAllPlugins();
        auto length = newEdit->getLength();
        auto& transport = newEdit->getTransport();
        transport.position = 0;
        transport.play(false);
        playingEdits.add(newCybrEdit);
        sendChangeMessage();
        Timer::callAfterDelay((int)ceil(length * 1000.), [this, newCybrEdit]() {
            playingEdits.removeObject(newCybrEdit);
            sendChangeMessage();
        });
    }

    bool isEmpty() { return playingEdits.size() == 0; }
    bool isFinished() { return isEmpty() && ! runForever; }
    
    void setRunForever(bool newFlag) {
        bool changed = (newFlag != runForever);
        runForever = newFlag;
        if (changed) sendChangeMessage();
    }
    bool getRunForever() { return runForever; }

private:
    juce::OwnedArray<CybrEdit> playingEdits;
    bool runForever = false;
};
