/*
  ==============================================================================

    cybr_EditSidecar.cpp
    Created: 16 Jun 2019 8:04:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "cybr_EditSidecar.h"

const juce::Identifier SIDECAR("SIDECAR");

EditSidecar::EditSidecar(te::Edit& e, ValueTree v) :
    te::EditItem (te::EditItemID::readOrCreateNewID (e, v), e)
{
    
}

void EditSidecar::valueTreePropertyChanged(juce::ValueTree &treeWhosePropertyHasChanged, const juce::Identifier &property)
{
    
}
