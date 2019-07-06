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
#include "CybrTrackList.h"
#include "OscInputDeviceInstance.h"

class CybrTrackList;
namespace te = tracktion_engine;

const juce::Identifier CYBR("CYBR");

/** CybrEdit is a listener/updater of the main CYBR object in our ValueTree.
 This contains the root level extensions that drive the extended functionality
 that the cybr app adds to existing tracktion_engine functionality.
 */
class CybrEdit :
    public ValueTree::Listener,
    private Timer
{
private:
    std::unique_ptr<te::Edit> edit;
public:
    CybrEdit(te::Edit* edit); // take ownership of the edit, and delete it when ready
    virtual ~CybrEdit();

    /** Print a list of all the clips in the eidt */
    void listClips();
    /** Print a list of all the tracks in the edit*/
    void listTracks();
    /** Save the active edit to a .tracktionedig or .wav file */
    void saveActiveEdit(File outputFile);
    /** List all the top level XML tags of the state */
    void listState();
    /** Simple getter for the underlying edit */
    te::Edit& getEdit() { return *edit; }
    /** Ensure that all the most recent changes are applied to the state */
    void flushPendingChanges();
   
    /** WIP - testing custom plugin */
    void junk();
    
    /** The CybrEdit uses a te::AudioTrack hosted in the Edit for for integrating with
     tracktion engine. Use this method to get it, creating it if it does not exist. */
    te::AudioTrack* getOrCreateCybrHostAudioTrack();

    void valueTreePropertyChanged(ValueTree &treeWhosePropertyHasChanged, const Identifier &property) override;
    void valueTreeChildAdded(juce::ValueTree &parentTree, juce::ValueTree &childWhichHasBeenAdded) override;
    
    /** Check if the CybrEdit needs to be updated. This is where we retrieve incoming
     OSC messages from the OscInputDeviceInstance. */
    void timerCallback() override;

    // te::EditItem overrides
    String getName() { return {"Cybr Edit Sidecar"}; }
   
    // CyberEdit Member variables
    ValueTree state;
    std::unique_ptr<CybrTrackList> cybrTrackList;
    bool saveOnClose = false;
};
