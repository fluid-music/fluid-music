/*
  ==============================================================================

    FluidOscServer.cpp
    Created: 18 Nov 2019 5:50:15pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "FluidOscServer.h"



FluidOscServer::FluidOscServer() {
    addListener (this);
}

void FluidOscServer::oscMessageReceived (const OSCMessage& message) {
    if (message.getAddressPattern().matches({"/test"})) {
        printOscMessage(message);
    }
}
