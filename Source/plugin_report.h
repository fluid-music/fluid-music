/*
  ==============================================================================

    plugin_report.h
    Created: 6 Aug 2020 5:50:05pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
namespace te = tracktion_engine;

juce::DynamicObject::Ptr getPluginReportObject(te::Plugin* selectedPlugin);
