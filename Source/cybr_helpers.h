/*
  ==============================================================================

    cybr_helpers.h
    Created: 18 Jun 2019 5:52:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;

/** Create and activate an empty edit */
std::unique_ptr<te::Edit> loadEmptyEdit(File inputFile, te::Engine& engine);

/** Load and activate  an edit from a .tracktionedit file */
std::unique_ptr<te::Edit> loadEditFile(File inputFile, te::Engine& engine);

/** For each audio clip with a source that references a project ID, update
 that source so it uses a filepath instead. */
void setClipSourcesToDirectFileReferences(te::Edit& changeEdit, bool useRelativePath, bool verbose);

/** Try to lookup and add the project manager settings from Tracktion Waveform. */
void autodetectPmSettings(te::Engine& engine);
void listWaveDevices(te::Engine& engine);
void listMidiDevices(te::Engine& engine);
void scanVst2(te::Engine& engine);
void scanVst3(te::Engine& engine);
void listPlugins(te::Engine& engine);
void listProjects(te::Engine& engine);
