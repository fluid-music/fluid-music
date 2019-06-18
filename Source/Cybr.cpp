/*
  ==============================================================================

    cybr_EditSidecar.cpp
    Created: 16 Jun 2019 8:04:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "Cybr.h"

Cybr::Cybr(te::Edit& e, ValueTree v) :
    te::EditItem (te::EditItemID::readOrCreateNewID (e, v), e)
{
}

void Cybr::valueTreePropertyChanged(juce::ValueTree &treeWhosePropertyHasChanged, const juce::Identifier &property)
{
}
