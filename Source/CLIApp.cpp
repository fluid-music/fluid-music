/*
  ==============================================================================

    CLIApp.cpp
    Created: 3 May 2019 2:46:39pm
    Author:  Charles

  ==============================================================================
*/

#include "CLIApp.h"

bool CLIApp::moreThanOneInstanceAllowed() { return true; }
void CLIApp::anotherInstanceStarted(const String&) {}

void CLIApp::suspended() {}
void CLIApp::resumed() {}

void CLIApp::systemRequestedQuit() { quit(); }

void CLIApp::unhandledException(const std::exception*, const String&, int)
{
    jassertfalse;
}


void CLIApp::initialise(const String& commandLine) 
{
    MessageManager::getInstance()->callAsync([this] { onRunning(); });
}

void CLIApp::shutdown() 
{
    //myMainWindow = nullptr;
}

const String CLIApp::getApplicationName() 
{
    return "Cybernetic Production";
}

const String CLIApp::getApplicationVersion() 
{
    return "0.1";
}

void CLIApp::onRunning()
{
    // Parse and print arguments
    auto args = ArgumentList({ "UNSPECIFIED" }, getCommandLineParameterArray());
    for (auto arg : args.arguments) {
        std::cout << arg.text << std::endl;
    }

    // ------------ Plugin Scan -------------
    // Log all the stuff about the plugins
    std::cout << "Plugin Info..." << std::endl;
    
    juce::VST3PluginFormat vst3;
    juce::String deadPlugins;
    juce::PluginDirectoryScanner pluginScanner{
        engine.getPluginManager().knownPluginList,
        vst3,
        vst3.getDefaultLocationsToSearch(),
        true,
        deadPlugins
    };

    juce::String pluginName;
    do {
        std::cout << "Scanning: \"" << pluginScanner.getNextPluginFileThatWillBeScanned() << "\"" << std::endl;
    } while (pluginScanner.scanNextFile(true, pluginName));

    // log failures
    std::cout << "Dead Plugins: " << deadPlugins << std::endl << std::endl;
    for (auto filename : pluginScanner.getFailedFiles()) {
        std::cout << "Failed to load plugin: " << filename << std::endl;
    }
    // ----------------------

    // If there's an input.tracktionedit in working dir, load it. otherwise create a new one. 
    auto inputFile = File::getCurrentWorkingDirectory().getChildFile("input.tracktionedit");
    std::cout << "Check file:  " << inputFile.getFullPathName() << std::endl;
    bool load = inputFile.existsAsFile();
    ValueTree valueTree;
    if (load) {
        valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl;
    }
    else {
        std::cout << "Creating empty edit" << std::endl;
        valueTree = te::createEmptyEdit();
    }

    // Create the edit object
    te::Edit::LoadContext loadContext;
    std::unique_ptr<te::Edit> edit = std::make_unique<te::Edit>(engine,
        valueTree,
        te::Edit::forRendering,
        &loadContext,
        0);
    BigInteger tracksToDo;
    int trackIndex = 0;
    for (auto track : te::getAllTracks(*edit)) {
        tracksToDo.setBit(trackIndex++);
    }
    te::Renderer::renderToFile(
                               { "Chaz Render Job" },
                               { juce::File::getCurrentWorkingDirectory().getChildFile("out.wav") },
                               *edit,
                               { 0, 20 },
                               tracksToDo, true, {}, false);

    // careful, dispatch may only be called form the main message thread
    engine.getPluginManager().knownPluginList.dispatchPendingMessages();
    quit();
}

START_JUCE_APPLICATION(CLIApp)
