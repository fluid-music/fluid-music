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
#include "cybr_helpers.h"
#include "CliUiBehaviour.h"
#include "AppJobs.h"
#include "OscSource.h"
#include "CybrEdit.h"
#include "OscInputDevice.h"
#include "FluidOscServer.h"
#include "CybrSearchPath.h"

class CybrPropertyStorage : public te::PropertyStorage {
public:
    CybrPropertyStorage(const String appname) : te::PropertyStorage(appname) {};
    File getAppPrefsFolder() override {
        // Using juce::PropertiesFile only to get a nice cross-platform application
        // data directory. te::ApplicationSettings and te::PropertyStorage handle
        // everything else.
        PropertiesFile::Options jucePropOpts;
        jucePropOpts.osxLibrarySubFolder = "Application Support";
        jucePropOpts.folderName = getApplicationName();
        jucePropOpts.applicationName = getApplicationName();
        PropertiesFile juceProps(jucePropOpts);

        return juceProps.getFile().getParentDirectory();
    }
};

class CLIApp : public JUCEApplicationBase, ChangeListener {

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

    /** Members of this class that are ChangeBroadcasters should this callback
     when their state changes in a significant way.
    */
    void changeListenerCallback(ChangeBroadcaster* source) override { quitIfReady(); }

    /** Quit if there is no more work to be done
    */
    void quitIfReady() { if (appJobs.isFinished()) quit(); }

private:
    /** Some CLI options just set a variable that may be used by a subsequent
     argument. Note that our CLI only allows one value per argument, so commands
     that require multiple values for configuration must pre-set their values.
     for this reason, commands that use values specified in Options should copy
     the value, so that it may be updated for future commands.
     */
    struct Options {
        int targetPort { 9999 };
        String targetHostname { "127.0.0.1" };
        int listenPort { 9999 };

        /** When helpModeFlag is enabled, the app should print the detailed command
         string instead of running the command. CLI users may set the helpModeFlag
         by specifying the -h CLI argument. */
        bool helpModeFlag = false;
    } options;

    tracktion_engine::Engine engine{ std::make_unique<CybrPropertyStorage>(getApplicationName()), std::make_unique<CliUiBehaviour>(), nullptr };
    AppJobs appJobs;

    // cybrEdit is a wrapper around edit.
    std::unique_ptr<CybrEdit> cybrEdit;
    std::unique_ptr<OscSource> oscSource;

    // onRunning should be called once, and only after the MessageManager is
    // also running. There is where I am putting the body of the application.
    void onRunning();
};
