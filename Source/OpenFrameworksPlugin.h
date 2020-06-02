/*
  ==============================================================================

    OpenFrameworksPlugin.h
    Created: 29 May 2019 7:49:52pm
    Author:  Charles

  ==============================================================================
*/

#pragma once

#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"

namespace te = tracktion_engine;

class OpenFrameworksPlugin : public te::Plugin
{
public:
    OpenFrameworksPlugin(te::PluginCreationInfo);
    ~OpenFrameworksPlugin();
    static juce::ValueTree create();

    //==============================================================================
    juce::CachedValue<float> semitonesValue;
    te::AutomatableParameter::Ptr semitones;

    //==============================================================================
    static float getMaximumSemitones() { return 3.0f * 12.0f; }


    // Overridden from Plugin ======================================================
    static const char* getPluginName() { return NEEDS_TRANS("MIDI Modifier"); }
    static const char* xmlTypeName;

    juce::String getName() override { return TRANS("OpenFrameworks Plugin"); }
    juce::String getPluginType() override { return xmlTypeName; }
    juce::String getShortName(int) override { return "OF"; }

    void initialise(const te::PlaybackInitialisationInfo&) override { } // Happens lazily (in my case, on render.)
    void initialiseFully() override { } // never called in my case?
    void deinitialise() override { }
    double getLatencySeconds() override { return 0.0; }
    int getNumOutputChannelsGivenInputs(int) override { return 0; }
    void getChannelNames(juce::StringArray*, juce::StringArray*) override {}
    bool isSynth() override { return false; }
    bool takesAudioInput() override { return false; }
    bool canBeAddedToClip() override { return false; }
    bool needsConstantBufferSize() override { return false; }
    // takesMidiInput is not overridden, and by default if returns false. Why??

    void applyToBuffer(const te::AudioRenderContext&) override;
    // Overridden from Selectable ==================================================

    juce::String getSelectableDescription() override;

    // Overridden from AutomatableEditItem =========================================
    void restorePluginStateFromValueTree(const juce::ValueTree&) override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(OpenFrameworksPlugin)
};
