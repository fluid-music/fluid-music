/*
  ==============================================================================

    AppJobs.h
    Created: 7 Jun 2019 3:44:16pm
    Author:  Charles

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "cybr_helpers.h"
#include "CybrEdit.h"
#include "FluidOscServer.h"

namespace te = tracktion_engine;
class AppJobs : public juce::ChangeBroadcaster {
public:
    /** Play the edit. This creates a NEW CybrEdit and a new te::Edit */
    void play(CybrEdit& cybrEdit);
    void record(CybrEdit& cybrEdit);
    bool runFluidOscServer(int port);

    /** Add a CybrEdit if it is not already present. If succesful, AppJobs will
     own that CybrEdit, and is responsible for deleting it. Returns success. */
    bool add(CybrEdit* cybrEdit);

    /** Remove a CybrEdit if it exists in the collection. Returns success. */
    bool remove(const CybrEdit* cybrEdit);

    bool isEmpty() { return playingEdits.size() == 0; }
    bool isFinished() { return isEmpty() && ! runForever; }
    bool getRunForever() { return runForever; }
    void setRunForever(bool newFlag);

    FluidOscServer fluidOscServer;
private:
    juce::OwnedArray<CybrEdit> playingEdits;
    bool runForever = false;
};
