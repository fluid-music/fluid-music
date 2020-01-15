/*
  ==============================================================================

    CybrProps.h
    Created: 14 Jan 2020 12:12:49pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once

#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;



class CybrProps {
public:
    // Preset Dir
    static File getPresetSaveLoadDir();
    static bool setPresetSaveLoadDir(File directory);
    static void resetPresetSaveLoadDir();

    // Sample Dir
    static File getSamplesDir();
    static bool setSamplesDir(File directory);
    static void resetSamplesDir();

private:
    static const String keyPresetSaveLoadDir;
    static const String keySampleDir;
    static File getDefaultPresetSaveLoadDir();
    static File getDefaultSamplesDir();
};
