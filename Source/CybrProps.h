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
    // Preset Dir ==============================================================
    static File getPresetSaveLoadDir();
    static bool setPresetSaveLoadDir(File directory);
    static void resetPresetSaveLoadDir();

    // Sample Dir ==============================================================
    static File getSamplesDir();
    static bool setSamplesDir(File directory);
    static void resetSamplesDir();

    // Resolvers ===============================================================

    /** Find an audio sample file from a pathname.

    This is intended to be used when cybr receives a request to add a sample.
    If that sample is identified by a filename, what directories should the
    engine search to find that sample?

    - If the filename is absolute, just return it directly.
    - Then check the optionalExtraDir.
    - Then check the samples dir
    - Then check the working directory (bad idea?)

    If a file still has not been found consider the path relative to the
    samples directory (returned by getSamplesDir).

    Note that this is not related to the filepath that actually gets saved in
    with the edit. That is handled by the CybrEdit's save method. */
    static File resolveAudioFilepath(const StringRef path,
                                     File optionalExtraDir = File());

private:
    static const String keyPresetSaveLoadDir;
    static const String keySampleDir;
    static File getDefaultPresetSaveLoadDir();
    static File getDefaultSamplesDir();
};
