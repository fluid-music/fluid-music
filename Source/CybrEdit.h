/*
  ==============================================================================

    CybrEdit.h
    Created: 18 Jun 2019 10:57:17am
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "cybr_helpers.h"
#include "OpenFrameworksPlugin.h"
#include "OscRecorder.h"
#include "OscSource.h"
#include "Cybr.h"

namespace te = tracktion_engine;

/** CybrEdit wraps a tracktion_engine::Edit and a Cybr object, and provides the
 main interface for interacting with the model
 */
class CybrEdit {
public:
    CybrEdit(std::unique_ptr<te::Edit> e) : edit(std::move(e)) {
        ValueTree cybrValueTree = edit->state.getOrCreateChildWithName(CYBR, nullptr);
        cybr = std::make_unique<Cybr>(*edit, cybrValueTree);
        std::cout << "CYBR sidecar added with id: " << cybr->itemID.toString() << std::endl;
    }
    
    void listClips();
    void listTracks();
    
    /** WIP - testing custom plugin */
    void junk();
    void recordOsc();
    
    /** Save the active edit to a .tracktionedig or .wav file */
    void saveActiveEdit(File outputFile);

    /** Is there an active edit? */
    bool hasActiveEdit() { return edit != nullptr; }
    
    std::unique_ptr<te::Edit> edit;

private:
    std::unique_ptr<OscRecorder> oscRecorder;
    std::unique_ptr<Cybr> cybr;
};
