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

    //==============================================================================
    juce::CachedValue<float> semitonesValue;
    te::AutomatableParameter::Ptr semitones;

    //==============================================================================
    static float getMaximumSemitones() { return 3.0f * 12.0f; }

    static const char* getPluginName() { return NEEDS_TRANS("MIDI Modifier"); }
    static const char* xmlTypeName;

    juce::String getName() override { return TRANS("OpenFrameworks Plugin"); }
    juce::String getPluginType() override { return xmlTypeName; }
    juce::String getShortName(int) override { return "OF"; }

    void initialise(const te::PlaybackInitialisationInfo&) override;
    void deinitialise() override;
    double getLatencySeconds() override;
    int getNumOutputChannelsGivenInputs(int) override;
    void getChannelNames(juce::StringArray*, juce::StringArray*) override;
    bool takesAudioInput() override;
    bool canBeAddedToClip() override;
    bool needsConstantBufferSize() override;

    void applyToBuffer(const te::AudioRenderContext&) override;

    juce::String getSelectableDescription() override;

    void restorePluginStateFromValueTree(const juce::ValueTree&) override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(OpenFrameworksPlugin)
};
