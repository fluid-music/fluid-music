/*
  ==============================================================================

    FluidIpcServer.h
    Created: 31 Mar 2020 6:42:03pm
    Author:  charles

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include "temp_OSCInputStream.h"
#include "temp_OSCOutputStream.h"
#include "FluidOscServer.h"

class FluidIpc;
class FluidIpcServer;

//==============================================================================
class FluidIpc : public InterprocessConnection{
public:
    void connectionMade() override;
    void connectionLost() override;
    void messageReceived(const MemoryBlock& message) override;
    
    bool sendOSCBundle(const OSCBundle& bundle);
    bool sendOSCMessage(const OSCMessage& message);
    void setFluidServer(FluidOscServer& server);
    void setIpcServer(FluidIpcServer& server);
    void setIpcNum(int ipc_num);
private:
    int ipc_num;
    FluidOscServer* fluidOscServer = nullptr;
    FluidIpcServer* fluidIpcServer = nullptr;
};

//==============================================================================
class FluidIpcServer : public InterprocessConnectionServer{
public:
    FluidIpcServer(FluidOscServer& server);
    InterprocessConnection* createConnectionObject() override;
    void removeIpcConn(int ipc_conn_num);
    
private:
    int ipc_num = 0;
    int threshold = 1000000000;
    std::map<int, FluidIpc> ipcMap;
    FluidOscServer* fluidOscServer = nullptr;
};
