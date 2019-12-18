/*
  ==============================================================================

    cybr_helpers.h
    Created: 18 Jun 2019 5:52:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"
#include "CybrEdit.h"

namespace te = tracktion_engine;

/** Create and activate an empty edit */
te::Edit* createEmptyEdit(File inputFile, te::Engine& engine);

/** Load and activate  an edit from a .tracktionedit file */
te::Edit* createEdit(File inputFile, te::Engine& engine);

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
void listPluginParameters(te::Engine& engine, const String pluginName);
void listPluginPresets(te::Engine& engine, const String pluginName);
void printOscMessage(const OSCMessage& message);

te::AudioTrack* getOrCreateAudioTrackByName(te::Edit& edit, const String name);
te::MidiClip* getOrCreateMidiClipByName(te::AudioTrack& track, const String name);
/** Add a plugin just before the VolumeAndPan plugin.
 `type` can be 'vst|vst3|tracktion' or an empty string.
 If `type` is an empty string, search all types. */
te::Plugin* getOrCreatePluginByName(te::AudioTrack& track, const String name, const String type = {});

class CybrEdit;
/** Create a copy of a the cybrEdit, suitable for playback and editing.
 CAUTION: The returned CybrEdit should be stored in a unique_ptr to ensure
 it will be deleted correctly. */
CybrEdit* copyCybrEditForPlayback(CybrEdit& cybrEdit);
