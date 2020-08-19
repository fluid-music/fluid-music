/*
  ==============================================================================

    plugin_report.cpp
    Created: 6 Aug 2020 5:50:05pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "plugin_report.h"

#if (JUCE_PLUGINHOST_VST3)

JUCE_BEGIN_IGNORE_WARNINGS_LEVEL_MSVC (0, 4505 4702)

JUCE_BEGIN_IGNORE_WARNINGS_GCC_LIKE ("-Wnon-virtual-dtor",
                                     "-Wreorder",
                                     "-Wunsequenced",
                                     "-Wint-to-pointer-cast",
                                     "-Wunused-parameter",
                                     "-Wconversion",
                                     "-Woverloaded-virtual",
                                     "-Wshadow",
                                     "-Wdeprecated-register",
                                     "-Wunused-function",
                                     "-Wsign-conversion",
                                     "-Wsign-compare",
                                     "-Wdelete-non-virtual-dtor",
                                     "-Wdeprecated-declarations",
                                     "-Wextra-semi",
                                     "-Wmissing-braces",
                                     "-Wswitch-default",
                                     "-Wshadow-field",
                                     "-Wpragma-pack",
                                     "-Wcomma",
                                     "-Wzero-as-null-pointer-constant",
                                     "-Winconsistent-missing-destructor-override",
                                     "-Wcast-align",
                                     "-Wignored-qualifiers",
                                     "-Wmissing-field-initializers",
                                     "-Wformat=",
                                     "-Wformat",
                                     "-Wpedantic",
                                     "-Wextra",
                                     "-Wclass-memaccess")

#include <pluginterfaces/vst/ivstcomponent.h>
#include <pluginterfaces/vst/ivstaudioprocessor.h>
#include <pluginterfaces/vst/ivsteditcontroller.h>
#include <pluginterfaces/base/ipluginbase.h>
#include <pluginterfaces/vst/vsttypes.h>
#include <public.sdk/source/common/memorystream.h>
#include <public.sdk/source/vst/vstpresetfile.h>
#endif

using namespace juce;

juce::DynamicObject::Ptr getPluginReportObject(te::Plugin* selectedPlugin) {

    // This is a recommended way of storing dynamic objects safely described here:
    // https://forum.juce.com/t/style-question-with-dynamicobject/9413
    DynamicObject::Ptr object = new DynamicObject();
    object->setProperty("shortName10", selectedPlugin->getShortName(10));
    object->setProperty("name",selectedPlugin->getName());
    object->setProperty("vendor", selectedPlugin->getVendor());
    object->setProperty("isSynth", selectedPlugin->isSynth());
    object->setProperty("idString", selectedPlugin->getIdentifierString());
    object->setProperty("automatableParamsCount", selectedPlugin->getNumAutomatableParameters());
    object->setProperty("pluginType", selectedPlugin->getPluginType());


    if (auto x = dynamic_cast<te::ExternalPlugin*>(selectedPlugin)) {
        // Annoyingly:
        // - PluginDescription.pluginFormatName is "VST"  or "VST3" (upper case)
        // - Plugin::getPluginType()       returns "vst"            (lower case)
        object->setProperty("externalPluginFormat", x->desc.pluginFormatName);
        object->setProperty("uidHex", x->getPluginUID());
        object->setProperty("uidInt", x->desc.uid);
        // update the plugin's .state value Tree
        x->flushPluginStateToValueTree();
        var state = x->state.getProperty(te::IDs::state);
        MemoryBlock chunk;
        if (chunk.fromBase64Encoding(state.toString())) {
            String properBase64 = Base64::toBase64(chunk.getData(), chunk.getSize());
            object->setProperty("tracktionXmlStateBase64", properBase64);
        }
        {
            x->getPluginStateFromTree(chunk);
            String pluginState = Base64::toBase64(chunk.getData(), chunk.getSize());
            object->setProperty("pluginState", pluginState);
        }

        object->setProperty("tracktionXml", x->elementState.toXmlString());
        // Try a different method of getting the state

        juce::AudioPluginInstance* jucePlugin = x->getAudioPluginInstance();

        MemoryBlock stateInfoBlock;
        MemoryBlock programStateInfoBlock;

        TRACKTION_ASSERT_MESSAGE_THREAD
        jucePlugin->suspendProcessing (true);
        jucePlugin->getCurrentProgramStateInformation(programStateInfoBlock); // Verify: If this is a VST2, get fxp (patch)
        jucePlugin->getStateInformation(stateInfoBlock);                      // Verify: If this is a VST2, get fxb (bank)
        // Note: I tried to get the VST3 IEditController state from this chunk, but it didn't work.
        // It appears that the data returned by getStateInformation is not the same as the contents
        // of a .vstpreset file.
        jucePlugin->suspendProcessing(false);

        String programStateInfo = Base64::toBase64(programStateInfoBlock.getData(), programStateInfoBlock.getSize());
        String stateInfo  = Base64::toBase64(stateInfoBlock.getData(), stateInfoBlock.getSize());

        object->setProperty("currentProgramStateInfo", programStateInfo);
        object->setProperty("currentStateInfo", stateInfo);

        object->setProperty("numPrograms", jucePlugin->getNumPrograms());     // number of programs in the bank
        object->setProperty("currentProgramIndex", jucePlugin->getCurrentProgram()); // program number within (bank)
        object->setProperty("currentProgramName", jucePlugin->getProgramName(jucePlugin->getCurrentProgram()));

        // Dynamic cast doesn't work, but I don't know why: if (auto* vst = dynamic_cast<VSTPluginInstance*> (plugin)) {
        if (x->isVST()) {
            // if for some reason, we wanted to get the AEffect, we could do it like this:
            // #if (JUCE_PLUGINHOST_VST)
            // #include "pluginterfaces/vst2.x/aeffect.h" // required
            // AEffect* vst2 = static_cast<AEffect*>(jucePlugin->getPlatformSpecificData());
            // #endif

            // My understanding is that stateInfo and programStateInfo map to
            // fxb and fxp formats for VST2 plugins. This assumption needs to be
            // verified.
#if (JUCE_PLUGINHOST_VST)
            object->setProperty("fxb", stateInfo);        // same as: currentStateInfo
            object->setProperty("fxp", programStateInfo); // same as: currentProgramStateInfo

            MemoryBlock presetChunk;
            if (VSTPluginFormat::getChunkData(jucePlugin, presetChunk, true)) {
                object->setProperty("vst2State", Base64::toBase64(presetChunk.getData(), presetChunk.getSize()));
            } else {
                object->setProperty("vst2StateError", 1);
            }
#endif
        } else if (x->isVST3()) {
#if (JUCE_PLUGINHOST_VST3)
            // In the block below, I tried to get the IEditController state from the preset. However,
            // It appears that the data returned by JucePlugin::getStateInformation is not the same as
            // the contents of a .vstpreset file.
            {
                auto* presetStream = new Steinberg::MemoryStream(stateInfoBlock.getData(), stateInfoBlock.getSize());
                Steinberg::Vst::PresetFile presetFile(presetStream);
                presetFile.readChunkList();
                if (presetFile.contains(Steinberg::Vst::kControllerState)) {
                    object->setProperty("vst3FoundControllerState", true);
                    if (auto* entry = presetFile.getEntry(Steinberg::Vst::kControllerState)) {
                        presetFile.seekToControllerState();
                        auto* stream = presetFile.getStream();
                        MemoryBlock controllerState;
                        controllerState.ensureSize(entry->size);
                        
                        if (stream->write(controllerState.getData(), entry->size)) {
                            object->setProperty("vst3ControllerState", controllerState);
                        }
                    }
                }
                if (presetFile.contains(Steinberg::Vst::kComponentState)) {
                    object->setProperty("vst3FoundComponentState", true);
                }
                presetStream->release();
            }
            
            // This code is modeled after a suggestion on the forum
            // https://forum.juce.com/t/fr-vst3pluginformat-loadfromvstpresetfile/24881/7
            // However, the code on the forum is for writing to plugin's state, while I want to
            // read the plugin state.
            auto funknown = static_cast<Steinberg::FUnknown*> (jucePlugin->getPlatformSpecificData());
            Steinberg::Vst::IComponent* vstcomponent = nullptr;
            Steinberg::Vst::IAudioProcessor* vstprocessor = nullptr;
            
            if (funknown->queryInterface(Steinberg::Vst::IAudioProcessor_iid, (void**) &vstprocessor) == Steinberg::kResultOk
                && vstprocessor != nullptr)
            {
                object->setProperty("vst3IsAudioProcessor", true);
                char strUID[33] = {0};
                vstprocessor->iid.toString(strUID);
                object->setProperty("vst3ProcessorId", String(strUID));
            }
            vstprocessor->release();

            if (funknown->queryInterface (Steinberg::Vst::IComponent_iid, (void**) &vstcomponent) == Steinberg::kResultOk
                && vstcomponent != nullptr)
            {
                object->setProperty("vst3IsComponent", true);
                auto* memoryStream = new Steinberg::MemoryStream();
                auto result = vstcomponent->getState(memoryStream);
                if (result != Steinberg::kResultOk) {
                    object->setProperty("vst3StateError", result);
                } else {
                    // The output of this looks very similar to the way that REAPER stores VSTs
                    // Reaper's Base64 binary has an extra 8 bytes at the beginning of the stream,
                    // and an extra 8 bytes at the end.
                    memoryStream->truncateToCursor();
                    String state = Base64::toBase64(memoryStream->getData(), memoryStream->getSize());
                    object->setProperty("vst3IComponentState", state);
                }

                // Get the long ClassID for the plugin. Send it to the client, Base64 encoded
                {
                    
                    Steinberg::TUID id;
                    // Charles: My understanding is that we can only get the ControllerClassID
                    // from with this .getControllerClassId method if this is a "split" aka
                    // "kDistributable" plugin. if the plugin is implemented as a single component
                    // (i.e. is derived from SingleComponentEffect), we must get the plugin using
                    // queryInterface(Steinberg::Vst::IEditController_iid, ...)
                    Steinberg::tresult result = vstcomponent->getControllerClassId(id);
                    if (result != Steinberg::kResultOk) {
                        object->setProperty("vst3EditControllerIdError", result);
                    } else {
                        Steinberg::FUID fid = Steinberg::FUID::fromTUID(id);
                        char strUID[33] = {0};
                        fid.toString(strUID);
                        object->setProperty("vst3EditControllerId", String(strUID));
                    }
                    
                }
                {
                    Steinberg::Vst::IEditController* vsteditcontroller = nullptr;
                    if (vstcomponent->queryInterface(Steinberg::Vst::IEditController_iid, (void**) &vsteditcontroller) == Steinberg::kResultOk
                        && vsteditcontroller != nullptr)
                    {
                        // I believe that this will not overlap with a successful call to
                        // getControllderClassId above, but I don't know for sure. I suspect
                        // that this is what happens when the plugin is written
                        // so that the same class derives from all three VST3 components
                        // vst::IComponent, Vst::IAudioProcessor, and Vst::IEditController

                        // My understanding is that when a plugin derives from
                        // SimpleComponentEffect, the IEditController iid IS exactly
                        // Steinberg::Vst::IEditController_iid.
                        char strUID[33] = {0};
                        vsteditcontroller->iid.toString(strUID);
                        object->setProperty("vst3IsEditController", true);
                        object->setProperty("vst3EditControllerId", String(strUID));

                        // get EditControllerState
                        auto* memoryStream = new Steinberg::MemoryStream();
                        if (vsteditcontroller->getState(memoryStream) == Steinberg::kResultOk) {
                            memoryStream->truncateToCursor();
                            String state = Base64::toBase64(memoryStream->getData(), memoryStream->getSize());
                            object->setProperty("vst3EditControlerState", state);
                        };
                        memoryStream->release();
                    }
                }
                memoryStream->release();
                vstcomponent->release();
           }
#endif
        }
    } // end isExternalPlugin block
    
    return object;
}
