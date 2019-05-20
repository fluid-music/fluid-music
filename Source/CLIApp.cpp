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
    std::cout << "Shutdown!" << std::endl;
}

const String CLIApp::getApplicationName() 
{
    return "Cybernetic Production";
}

const String CLIApp::getApplicationVersion() 
{
    return "0.0.1";
}

void CLIApp::ScanForPlugins()
{
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
}

void CLIApp::ListPlugins()
{
    std::cout << "Known Plugins:" << std::endl;
    for (auto plugin : engine.getPluginManager().knownPluginList) {
        std::cout << plugin->pluginFormatName << " - " << plugin->name << " - " << plugin->fileOrIdentifier << std::endl;
    }
}

void CLIApp::onRunning()
{
    ArgumentList argumentList = ArgumentList(String{ "UNSPECIFIED" }, getCommandLineParameterArray());
    for (auto arg : argumentList.arguments) {
        std::cout << arg.text << std::endl;
    }

    if (argumentList.containsOption("-s|--scan-plugins")) ScanForPlugins();
    if (argumentList.containsOption("--list-plugins")) ListPlugins();

    // Create input edit.
    // If -i inputfile is specified, use that file
    // Else if "default.tracktionedit" exists in working dir, use that
    // Else create an empty edit
    ValueTree valueTree;
    File inputFile;
    if (argumentList.containsOption("-i")) {
        inputFile = argumentList.getExistingFileForOption("-i");
        valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl;
    }
    else {
        inputFile = File::getCurrentWorkingDirectory().getChildFile("default.tracktionedit");;
        if (inputFile.existsAsFile()) {
            std::cout << "Loading default.tracktionedit" << std::endl;
            valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
        }
        else {
            // Caution: edit will have no file specified. 
            std::cout << "Creating an empty edit" << std::endl;
            valueTree = te::createEmptyEdit();
        }
    }

    // Create the edit object
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::LoadContext loadContext;
    std::unique_ptr<te::Edit> edit = std::make_unique<te::Edit>(engine,
        valueTree,
        te::Edit::forRendering,
        &loadContext,
        0);

    // List any missing plugins
    for (auto plugin : edit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }

    // Render
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
