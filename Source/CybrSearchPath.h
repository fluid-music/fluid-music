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

const String CYBR_PRESET_PATHS("preset");
const String CYBR_SAMPLE_PATHS("sample");

class CybrSearchPath {
public:
    CybrSearchPath(StringRef name);
    void add(File directory);
    void init(ConsoleApplication& cApp, String defaults = "");
    const String key();
private:
    const String name;
};
