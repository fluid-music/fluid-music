/*
  ==============================================================================

    OpenFrameworksPlugin.cpp
    Created: 29 May 2019 7:49:52pm
    Author:  Charles

  ==============================================================================
*/

#include "OpenFrameworksPlugin.h"




OpenFrameworksPlugin::OpenFrameworksPlugin(te::PluginCreationInfo info) : te::Plugin(info)
{
    semitones = addParam("semitones up", TRANS("Semitones"),
        { -getMaximumSemitones(), getMaximumSemitones() },
        [](float value) { return std::abs(value) < 0.01f ? "(" + TRANS("Original pitch") + ")"
                                                            : te::getSemitonesAsString(value); },
        [](const String& s) { return jlimit(-OpenFrameworksPlugin::getMaximumSemitones(),
                                            OpenFrameworksPlugin::getMaximumSemitones(),
                                            s.getFloatValue()); });


    semitonesValue.referTo(state, te::IDs::semitonesUp, getUndoManager());
    semitones->attachToCurrentValue(semitonesValue);
}

OpenFrameworksPlugin::~OpenFrameworksPlugin()
{
    notifyListenersOfDeletion();

    semitones->detachFromCurrentValue();
}

const char* OpenFrameworksPlugin::xmlTypeName = "openframeworks";

void OpenFrameworksPlugin::initialise(const te::PlaybackInitialisationInfo&) {}
void OpenFrameworksPlugin::deinitialise() {}
double OpenFrameworksPlugin::getLatencySeconds() { return 0.0; }
int OpenFrameworksPlugin::getNumOutputChannelsGivenInputs(int) { return 0; }
void OpenFrameworksPlugin::getChannelNames(StringArray*, StringArray*) {}
bool OpenFrameworksPlugin::takesAudioInput() { return false; }
bool OpenFrameworksPlugin::canBeAddedToClip() { return false; }
bool OpenFrameworksPlugin::needsConstantBufferSize() { return false; }

void OpenFrameworksPlugin::applyToBuffer(const te::AudioRenderContext& fc)
{
    if (fc.bufferForMidiMessages != nullptr)
        fc.bufferForMidiMessages->addToNoteNumbers(roundToInt(semitones->getCurrentValue()));
}

String OpenFrameworksPlugin::getSelectableDescription()
{
    return TRANS("MIDI Modifier Plugin");
}


void OpenFrameworksPlugin::restorePluginStateFromValueTree(const juce::ValueTree& v)
{
    CachedValue<float>* cvsFloat[] = { &semitonesValue, nullptr };
    te::copyPropertiesToNullTerminatedCachedValues(v, cvsFloat);
}

