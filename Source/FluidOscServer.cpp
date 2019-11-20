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
    std::cout << message.getAddressPattern().toString();
    for (auto arg : message) {
        std::cout << " - ";
        auto type = arg.getType();
        if (type == OSCTypes::int32) std::cout << arg.getInt32();
        else if (type == OSCTypes::string) std::cout << arg.getString();
        else if (type == OSCTypes::float32) std::cout << arg.getFloat32();
        else if (type == OSCTypes::blob) std::cout << arg.getBlob().toBase64Encoding();
        else if (type == OSCTypes::colour) {
            OSCColour c = arg.getColour();
            std::cout << "RGBA("<< c.red << "," << c.green << "," << c.blue << "," << c.alpha << ")";
        }
    }
    std::cout << std::endl;
}
