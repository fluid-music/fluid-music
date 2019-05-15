/*
  ==============================================================================

    CliUiBehavior.h
    Created: 5 May 2019 5:44:09pm
    Author:  Charles

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"
namespace te = tracktion_engine;

class CliUiBehaviour : public te::UIBehaviour {
    virtual void runTaskWithProgressBar(te::ThreadPoolJobWithProgress&);

    /** Should display a dismissable alert window. N.B. this should be non-blocking. */
    virtual void showWarningAlert(const juce::String& title, const juce::String& message);

    /** Should display a dismissable alert window.
        Returns true for OK.
        N.B. this is blocking.
    */
    virtual bool showOkCancelAlertBox(const juce::String& title, const juce::String& message,
        const juce::String& ok = {},
        const juce::String& cancel = {});

    /** Should display a dismissable alert window.
        Returns 1 = yes, 2 = no, 0 = cancel
        N.B. this is blocking.
    */
    virtual int showYesNoCancelAlertBox(const juce::String& title, const juce::String& message,
        const juce::String& yes = {},
        const juce::String& no = {},
        const juce::String& cancel = {});

    /** Should display a temporary information message, usually in the same place. */
    virtual void showInfoMessage(const juce::String& message);

    /** Should display a temporary warning message. */
    virtual void showWarningMessage(const juce::String& message);
};
