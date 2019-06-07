/*
  ==============================================================================

    WipEdit.h
    Created: 7 Jun 2019 3:44:16pm
    Author:  Charles

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;
class EditJobs : public juce::ChangeBroadcaster {
public:

    /** Make a copy of the Edit, and play it back. */
    void play(te::Edit& edit) {
        te::Edit::Options options{ edit.engine };
        options.editState = edit.state.createCopy();
        options.role = te::Edit::EditRole::forEditing;
        options.numUndoLevelsToStore = 0;
        options.editFileRetriever = [] {
            return File::getCurrentWorkingDirectory().getChildFile("temp.tracktionedit");
        };
        te::Edit* newEdit = new te::Edit(options);
        newEdit->initialiseAllPlugins();
        auto length = newEdit->getLength();
        auto& transport = newEdit->getTransport();
        transport.position = 0;
        transport.setLoopRange({ 0, length });
        transport.play(false);
        transport.looping = true;
        playingEdits.add(newEdit);
        sendChangeMessage();
        Timer::callAfterDelay(length * 1000., [this, newEdit]() {
            playingEdits.removeObject(newEdit);
            sendChangeMessage();
        });
    }

    bool isEmpty() { return playingEdits.size() == 0; }

private:
    juce::OwnedArray<te::Edit> playingEdits;
};