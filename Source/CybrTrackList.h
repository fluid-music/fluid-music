/*
  ==============================================================================

    CybrTrackList.h
    Created: 19 Jun 2019 4:49:14pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "CybrEdit.h"

class CybrEdit;
const juce::Identifier CYBRTRACK ("CYBRTRACK");

class CybrTrack {
public:
    CybrTrack(const ValueTree& v) : state(v) { std::cout << "Created CYBRTRACK" << std::endl; }
    ~CybrTrack() { std::cout << "Deleted CYBRTRACK" << std::endl; }
    int i = 0;
    ValueTree state;
};

class CybrTrackList : te::ValueTreeObjectList<CybrTrack>
{
public:
    CybrTrackList (CybrEdit& c, const ValueTree& parent) : ValueTreeObjectList<CybrTrack>(parent), cybr(c){ rebuildObjects(); }
    virtual ~CybrTrackList() { freeObjects(); }
    
    virtual bool isSuitableType (const ValueTree& v) const override { return v.hasType(CYBRTRACK); }
    virtual CybrTrack* createNewObject (const ValueTree& v) override { return new CybrTrack(v); }
    virtual void deleteObject (CybrTrack* t) override { delete t; }
    virtual void newObjectAdded (CybrTrack*) override {}
    virtual void objectRemoved (CybrTrack*) override {}
    virtual void objectOrderChanged() override {}
    
    CybrEdit& cybr;
};
