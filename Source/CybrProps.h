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
    static File getPresetSaveLoadDir();
    static bool setPresetSaveLoadDir(File directory);
    static void resetPresetSaveLoadDir();
private:
    static const String keyPresetSaveLoadDir;
    static File getDefaultPresetSaveLoadDir();
};
