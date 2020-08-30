/*
  ==============================================================================

    cybr_helpers.h
    Created: 18 Jun 2019 5:52:06pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"
#include "SamplePathMode.h"
#include "CybrEdit.h"

namespace te = tracktion_engine;

/** Create and activate an empty edit */
te::Edit* createEmptyEdit(juce::File inputFile, te::Engine& engine, te::Edit::EditRole role = te::Edit::forRendering);

/** Load and activate  an edit from a .tracktionedit file */
te::Edit* createEdit(juce::File inputFile, te::Engine& engine, te::Edit::EditRole role = te::Edit::forRendering);

/** For each audio clip, update that source's filepath. This will use remove and project IDs */
void setClipAndSamplerSourcesToDirectFileReferences(
                                                    te::Edit& changeEdit,
                                                    SamplePathMode mode = SamplePathMode::decide,
                                                    bool verbose = false);

/** Try to lookup and add project manager settings from Tracktion Waveform. */
void autodetectPmSettings(te::Engine& engine);
void listWaveDevices(te::Engine& engine);
void listMidiDevices(te::Engine& engine);
void scanVst2(te::Engine& engine);
void scanVst3(te::Engine& engine);
void listPlugins(te::Engine& engine);
void listProjects(te::Engine& engine);
void listPluginParameters(te::Engine& engine, const juce::String pluginName);
void listPluginPresets(te::Engine& engine, const juce::String pluginName);
void queryPluginParamPoints(te::Engine& engine, const juce::String pluginName, const juce::String paramName);
void printOscMessage(const juce::OSCMessage& message);
void printPreset(te::Plugin* plugin);
void saveTracktionPreset(te::Plugin* plugin, juce::String name);
void loadTracktionPreset(te::AudioTrack& track, juce::ValueTree preset);
juce::ValueTree loadXmlFile(juce::File file);

void removeAllClipsFromTrack(te::ClipTrack& track);
void removeAllPluginAutomationFromTrack(te::ClipTrack& track);

/** Get the index of the bus with a given name. If that bus does not exist,
 create it. If all buses already have a name, return -1 */
int ensureBus(te::Edit& edit, juce::String busName);

/** Render a range of the audio file, overwriting the file if it already exists.
Includes some simple checks like non-zero duration, file write access. */
void renderTrackRegion(juce::File outputFile, te::Track& track, te::EditTimeRange range);

te::AudioTrack* getOrCreateAudioTrackByName(te::Edit& edit, const juce::String name);
te::MidiClip* getOrCreateMidiClipByName(te::AudioTrack& track, const juce::String name);
void ensureWidthRack(te::AudioTrack& track);

/** Add a plugin just before the VolumeAndPan plugin.
 `type` can be 'vst|vst3|tracktion|AudioUnit' or an empty string.
 If `type` is an empty string, search all types.*/
te::Plugin* getOrCreatePluginByName(te::AudioTrack& track,
                                    const juce::String name,
                                    const juce::String type = {},
                                    const int index = 0);

class CybrEdit;
/** Create a copy of a the cybrEdit, suitable for playback and editing.
 CAUTION: The returned CybrEdit should be stored in a unique_ptr to ensure
 it will be deleted correctly. */
CybrEdit* copyCybrEditForPlayback(CybrEdit& cybrEdit);
