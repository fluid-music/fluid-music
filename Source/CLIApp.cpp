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
    std::cout << "command line: " << commandLine << std::endl;
    std::cout << "Is standalone? " << isStandaloneApp() << std::endl;
    MessageManager::getInstance()->callAsync([this] { onRunning(); });
}

void CLIApp::shutdown() 
{
    //myMainWindow = nullptr;
}

const String CLIApp::getApplicationName() 
{
    return "Cybernetic Productions!!";
}

const String CLIApp::getApplicationVersion() 
{
    return "0.1";
}

void CLIApp::onRunning()
{
    std::cout << "Running!" << std::endl;
    auto args = ArgumentList({ "UNSPECIFIED" }, getCommandLineParameterArray());
    for (auto arg : args.arguments) {
        std::cout << arg.text << std::endl;
    }
    quit();
}

START_JUCE_APPLICATION(CLIApp)
