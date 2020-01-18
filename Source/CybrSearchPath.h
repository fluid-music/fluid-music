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

const String CYBR_PRESET("preset");
const String CYBR_SAMPLE("sample");

/** Guess the application directory for Tracktion Waveform */
File getWaveformAppDir();

/** Helper class for dealing with search paths */
class CybrSearchPath {
public:
    CybrSearchPath(StringRef name);
    void add(File directory);
    void init(ConsoleApplication& cApp, String defaults = "");
    String key() const;
    Array<File> paths() const;
    File find(const StringRef filePath) const;
private:
    const String name;
};
