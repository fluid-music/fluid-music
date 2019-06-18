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

class Cybr : public te::EditItem,
             public ValueTree::Listener
{
public:
    Cybr(te::Edit& e, ValueTree v);
    void valueTreePropertyChanged(ValueTree &treeWhosePropertyHasChanged, const Identifier &property); 
    String getName() { return {"Cybr Edit Sidecar"}; }
};
