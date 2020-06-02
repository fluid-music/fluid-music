/*
  ==============================================================================

    CybrSearchPath.h
    Created: 16 Jan 2020 9:06:58pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once

#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;

const juce::String CYBR_PRESET("preset");
const juce::String CYBR_SAMPLE("sample");

/** Guess the application directory for Tracktion Waveform */
juce::File getWaveformAppDir();

/** Helper class for dealing with search paths */
class CybrSearchPath {
public:
    CybrSearchPath(juce::StringRef name);
    void add(juce::File directory);
    void init(juce::ConsoleApplication& cApp, juce::String defaults = "");
    juce::String key() const;
    juce::Array<juce::File> paths() const;
    juce::File find(const juce::StringRef filePath) const;
private:
    const juce::String name;
};
