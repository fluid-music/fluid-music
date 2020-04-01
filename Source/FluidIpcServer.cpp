/*
  ==============================================================================

    FluidIpcServer.cpp
    Created: 31 Mar 2020 6:42:03pm
    Author:  charles

  ==============================================================================
*/

#include "FluidIpcServer.h"


//==============================================================================
InterprocessConnection* FluidIpcServer::createConnectionObject(){
    std::cout<<"Creating interprocess connection"<<std::endl;
    
    ipcMap[ipc_num].setFluidServer(*fluidOscServer);

    return &ipcMap[ipc_num++];
}

FluidIpcServer::FluidIpcServer(FluidOscServer& server) : fluidOscServer(&server){
}

//==============================================================================
void FluidIpc::setFluidServer(FluidOscServer& server){
    fluidOscServer = &server;
}

void FluidIpc::connectionMade(){
    std::cout<<"Connection Made"<<std::endl;
}

void FluidIpc::connectionLost(){
    std::cout<<"Connection Lost"<<std::endl;
}

void FluidIpc::messageReceived(const MemoryBlock &message){
    OSCInputStream instream(message.getData(), message.getSize());
    OSCBundle::Element elem = instream.readElementWithKnownSize(message.getSize());
    
    if(elem.isBundle()){
        // Pass the current selection in to the bundle handler
        SelectedObjects obj = fluidOscServer->getSelectedObjects();
        OSCBundle bundle = elem.getBundle();
        fluidOscServer->handleOscBundle(bundle, obj);
    }
    else{
        OSCMessage msg = elem.getMessage();
        fluidOscServer->handleOscMessage(msg);
    }
}