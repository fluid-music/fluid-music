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
const juce::Identifier CE ("CE"); // CYBR EVENT

class CybrTrack {
public:
    CybrTrack(const juce::ValueTree& v) : state(v) {
        int numChildren = state.getNumChildren();
        if (numChildren > 0) {
            juce::ValueTree lastChild = state.getChild(numChildren-1);
            auto& var = lastChild[te::IDs::t];
            lastEventTime = var;
        }
        std::cout << "Created CYBRTRACK. lastEventTime: " << lastEventTime << std::endl;
    }
    ~CybrTrack() { std::cout << "Deleted CYBRTRACK" << std::endl; }

    /** Add an event to the track unless the supplied time is less than
        the previously added event time. Returns true on success. */
    bool addEvent(double time, int value) {
        if (time >= lastEventTime) {
            lastEventTime = time;
            state.addChild({CE, {{te::IDs::t, time}, {te::IDs::v, value}}}, -1, nullptr);
            return true;
        } else {
            return false;
        }
    }

    juce::ValueTree state;
private:
    double lastEventTime = 0;
};

class CybrTrackList : te::ValueTreeObjectList<CybrTrack>
{
public:
    CybrTrackList (CybrEdit& c, const juce::ValueTree& parent) : ValueTreeObjectList<CybrTrack>(parent), cybr(c){ rebuildObjects(); }
    virtual ~CybrTrackList() { freeObjects(); }
    
    virtual bool isSuitableType (const juce::ValueTree& v) const override { return v.hasType(CYBRTRACK); }
    virtual CybrTrack* createNewObject (const juce::ValueTree& v) override { return new CybrTrack(v); }
    virtual void deleteObject (CybrTrack* t) override { delete t; }
    virtual void newObjectAdded (CybrTrack*) override {}
    virtual void objectRemoved (CybrTrack*) override {}
    virtual void objectOrderChanged() override {}
    
    void appendEmptyTrack() {
        juce::ValueTree v(CYBRTRACK);
        parent.addChild(v, -1, nullptr);
    }

    CybrTrack* getOrCreateLastTrack() {
        if (size() == 0) appendEmptyTrack();
        return at(size() - 1);
    }
    CybrEdit& cybr;
};
