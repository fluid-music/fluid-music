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
    //myMainWindow.reset(new MyApplicationWindow());
    //myMainWindow->setBounds(100, 100, 400, 500);
    //myMainWindow->setVisible(true);
    std::cout << "Is standalone? " << isStandaloneApp() << std::endl;
}

void CLIApp::shutdown() 
{
    //myMainWindow = nullptr;
}

const String CLIApp::getApplicationName() 
{
    return "Charles' App!!!";
}

const String CLIApp::getApplicationVersion() 
{
    return "1.0";
}

START_JUCE_APPLICATION(CLIApp)
