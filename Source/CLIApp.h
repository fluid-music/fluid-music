/*
  ==============================================================================

    CLIApp.h
    Created: 3 May 2019 2:46:39pm
    Author:  Charles

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "CliUiBehaviour.h"

class CLIApp : public juce::JUCEApplicationBase {
    /** Returns the global instance of the application object being run. */
    //static CLIApp* JUCE_CALLTYPE getInstance() noexcept;

    /** Checks whether multiple instances of the app are allowed.

        If your application class returns true for this, more than one instance is
        permitted to run (except on OSX where the OS automatically stops you launching
        a second instance of an app without explicitly starting it from the command-line).

        If it's false, the second instance won't start, but it you will still get a
        callback to anotherInstanceStarted() to tell you about this - which
        gives you a chance to react to what the user was trying to do.
    */
    bool moreThanOneInstanceAllowed() override;

    /** Indicates that the user has tried to start up another instance of the app.
        This will get called even if moreThanOneInstanceAllowed() is false.
    */
    void anotherInstanceStarted(const String& commandLine) override;

    /** Called when the operating system is trying to close the application.

        The default implementation of this method is to call quit(), but it may
        be overloaded to ignore the request or do some other special behaviour
        instead. For example, you might want to offer the user the chance to save
        their changes before quitting, and give them the chance to cancel.

        If you want to send a quit signal to your app, this is the correct method
        to call, because it means that requests that come from the system get handled
        in the same way as those from your own application code. So e.g. you'd
        call this method from a "quit" item on a menu bar.
    */
    void systemRequestedQuit() override;

    /** This method is called when the application is being put into background mode
        by the operating system.
    */
    void suspended() override;

    /** This method is called when the application is being woken from background mode
        by the operating system.
    */
    void resumed() override;

    /** If any unhandled exceptions make it through to the message dispatch loop, this
        callback will be triggered, in case you want to log them or do some other
        type of error-handling.

        If the type of exception is derived from the std::exception class, the pointer
        passed-in will be valid. If the exception is of unknown type, this pointer
        will be null.
    */
    void unhandledException(const std::exception* e,
        const String& sourceFilename,
        int lineNumber) override;

    void initialise(const String& commandLine) override;
    void shutdown() override;
    const String getApplicationName() override;
    const String getApplicationVersion() override;

    void ScanForPlugins();
    void ListPlugins();
    void ListProjects();
    void ListClips(te::Edit&);
    void ListTracks(te::Edit&);

    /** Try to lookup and add the project manager settings from Tracktion Waveform.
    */
    void autodetectPmSettings();
private:
    tracktion_engine::Engine engine{ getApplicationName(), std::make_unique<CliUiBehaviour>(), nullptr };

    // onRunning should be called once, and only after the MessageManager is
    // also running. There is where I am putting the body of the application.
    void onRunning();
};
