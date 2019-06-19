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
    CybrEdit(te::Edit& e);

    // Some CybrEdit methods only use the Edit, but not the CybrEdit. We could
    // consider moving these into helpers. They are probably okay here for now.

    /** Print a list of all the clips in the eidt */
    void listClips();
    /** Print a list of all the tracks in the edit*/
    void listTracks();
    /** Save the active edit to a .tracktionedig or .wav file */
    void saveActiveEdit(File outputFile);

    // More complex methods will actually use the CybrEdit
    
    /** WIP - testing custom plugin */
    void junk();
    void recordOsc();

   
    te::Edit& edit;

private:
    std::unique_ptr<OscRecorder> oscRecorder;
    std::unique_ptr<Cybr> cybr;
};
