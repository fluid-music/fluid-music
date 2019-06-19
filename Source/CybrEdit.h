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

namespace te = tracktion_engine;

const juce::Identifier CYBR("CYBR");

/** CybrEdit is a listener/updater of the main CYBR object in our ValueTree.
 This contains the root level extensions that drive the extended functionality
 that the cybr app adds to existing tracktion_engine functionality.
 */
class CybrEdit : public te::EditItem,
                 public ValueTree::Listener
{
public:
    CybrEdit(te::Edit& e);

    // Some CybrEdit methods only use the Edit, but not the CybrEdit.
    // Eventually We could consider moving these into helpers.

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

    // te::EditItem overrides

    void valueTreePropertyChanged(ValueTree &treeWhosePropertyHasChanged, const Identifier &property);
    String getName() { return {"Cybr Edit Sidecar"}; }
   
    ValueTree state;

private:
    std::unique_ptr<OscRecorder> oscRecorder;
};
