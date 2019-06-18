/*
  ==============================================================================

    cybr_EditSidecar.h
    Created: 16 Jun 2019 8:04:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;

const juce::Identifier CYBR("CYBR");

/** Cybr is a listener/updater of the main CYBR object in our ValueTree. This
 contains the root level extensions that drive the extended functionality that
 the cybr app adds to existing tracktion_engine functionality.
 
 Cybr is made to be used inside a CybrEdit, and should not need to be
 instantiated directly.
 */
class Cybr : public te::EditItem,
             public ValueTree::Listener
{
public:
    Cybr(te::Edit& e, ValueTree v);
    void valueTreePropertyChanged(ValueTree &treeWhosePropertyHasChanged, const Identifier &property); 
    String getName() { return {"Cybr Edit Sidecar"}; }
};
