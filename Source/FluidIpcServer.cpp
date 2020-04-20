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
    
    while(ipcMap.find(ipc_num) != ipcMap.end()){
        ipc_num += 1;
        ipc_num %= threshold;
    }
        
    ipcMap[ipc_num].setFluidServer(*fluidOscServer);
    ipcMap[ipc_num].setIpcServer(*this);
    ipcMap[ipc_num].setIpcNum(ipc_num);
    
    return &ipcMap[ipc_num];
}

FluidIpcServer::FluidIpcServer(FluidOscServer& server) : fluidOscServer(&server){
}

void FluidIpcServer::removeIpcConn(int ipc_conn){
    ipcMap.erase(ipc_conn);
}

//==============================================================================
void FluidIpc::setFluidServer(FluidOscServer& server){
    fluidOscServer = &server;
}

void FluidIpc::setIpcServer(FluidIpcServer& server){
    fluidIpcServer = &server;
}

void FluidIpc::connectionMade(){
    std::cout<<"Connection Made"<<std::endl;
}

void FluidIpc::setIpcNum(int num){
    ipc_num = num;
}

void FluidIpc::connectionLost(){
    std::cout<<"Connection Lost"<<std::endl;
    fluidIpcServer->removeIpcConn(ipc_num);
}

bool FluidIpc::sendOSCBundle(const OSCBundle& reply){
    OSCOutputStream outstream;
//    std::cout<<reply[0].getMessage().getAddressPattern().toString()<<std::endl;
    if(outstream.writeBundle(reply)){
        MemoryBlock reply_block(outstream.getData(), outstream.getDataSize());
//        std::cout<<outstream.getDataSize()<<std::endl;
//        std::cout<<reply_block.toBase64Encoding()<<std::endl;
        if(this->sendMessage(reply_block)){
            return 0;
        }
        
    }
    return 1;
}

bool FluidIpc::sendOSCMessage(const OSCMessage& reply){
    OSCOutputStream outstream;
    if(outstream.writeMessage(reply)){
        MemoryBlock reply_block(outstream.getData(), outstream.getDataSize());
        this->sendMessage(reply_block);
        return 0;
    }
    return 1;
}

void FluidIpc::messageReceived(const MemoryBlock &message){
    OSCInputStream instream(message.getData(), message.getSize());
    OSCBundle::Element elem = instream.readElementWithKnownSize(message.getSize());
    
    if(elem.isBundle()){
        // Pass the current selection in to the bundle handler
        SelectedObjects obj = fluidOscServer->getSelectedObjects();
        OSCBundle bundle = elem.getBundle();
        OSCBundle reply = fluidOscServer->handleOscBundle(bundle, obj);
        if(this->sendOSCBundle(reply)){
            OSCMessage error("/error");
            error.addString("sendOSCBundle failed");
            this->sendOSCMessage(error);
        }
    }
    else{
        OSCMessage msg = elem.getMessage();
        OSCMessage reply = fluidOscServer->handleOscMessage(msg);
        if(this->sendOSCMessage(reply)){
            OSCMessage error("/error");
            error.addString("sendOSCMessage failed");
            this->sendOSCMessage(error);
        }
    }
}
