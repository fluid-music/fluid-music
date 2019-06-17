/*
  ==============================================================================

    cybr_EditSidecar.h
    Created: 16 Jun 2019 8:04:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"
namespace te = tracktion_engine;

class EditSidecar : public te::EditItem,
                    public ValueTree::Listener
{
    EditSidecar(te::Edit& e, ValueTree v);
    void valueTreePropertyChanged(ValueTree &treeWhosePropertyHasChanged, const Identifier &property); 
    static ValueTree create;
};
