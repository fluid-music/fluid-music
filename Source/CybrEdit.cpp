/*
  ==============================================================================

    CybrEdit.cpp
    Created: 18 Jun 2019 10:57:17am
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrEdit.h"

void CybrEdit::listClips() {
    std::cout << "List Clips..." << std::endl;
    // I believe "Clip" tracks may be Marker, Chord, or Audio tracks (and
    // possibly others). Audio Tracks may have midi clips
    for (auto track : te::getClipTracks(*edit)) {
        for (auto clip : track->getClips()) {
            std::cout
            << track->getName() << " - "
            << clip->getName() << " - "
            << clip->typeToString(clip->type) << " - "
            << clip->getStartBeat() << " to " << clip->getEndBeat() << " - ";
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) {
                // to make the clip use a filename for the source, use
                //audioClip->getSourceFileReference().setToDirectFileReference(...);
                // to make the clip use a project reference, use
                //audioClip->getSourceFileReference().setToProjectFileReference(...);
                std::cout << "Source: " << audioClip->getSourceFileReference().source;
            }
            if (auto midiClip = dynamic_cast<te::MidiClip*>(clip)) {
                std::cout
                << "Notes,CC: "
                << midiClip->getSequence().getNumNotes() << ","
                << midiClip->getSequence().getNumControllerEvents();
            }
            std::cout << std::endl;
        }
    }
    std::cout << std::endl;
}

void CybrEdit::listTracks() {
    std::cout << "List Tracks..." << std::endl;
    for (auto track : te::getAllTracks(*edit))
    {
        // are these mutually exclusive?
        if (track->isAudioTrack()) std::cout << "Audio Track - ";
        if (track->isAutomationTrack()) std::cout << "Automation Track - ";
        if (track->isChordTrack()) std::cout << "Chord Track - ";
        if (track->isFolderTrack()) std::cout << "Folder Track - ";
        if (track->isMarkerTrack()) std::cout << "Marker Track - ";
        if (track->isTempoTrack()) std::cout << "Tempo Track - ";
        std::cout << track->getName() << std::endl;
    }
    std::cout << std::endl;
}

void CybrEdit::junk()
{
    if (!edit) {
        std::cout << "JUNK: No active edit. Junk not possible." << std::endl;
        return;
    }
    
    if (auto audioTrack = te::getFirstAudioTrack(*edit)) {
        // insert my plugin
        if (auto plugin = audioTrack->pluginList.insertPlugin(OpenFrameworksPlugin::create(), 0)) {
            std::cout << "My Plugin Added!" << std::endl;
            if (auto ofPlugin = dynamic_cast<OpenFrameworksPlugin*>(plugin.get())){
                std::cout << "My Plugin is correct type!" << std::endl;
                ofPlugin->semitonesValue.setValue(30, nullptr);
            }
        }
        // insert a VolumeAndPanPlugin
        if (auto plugin = audioTrack->pluginList.insertPlugin(te::VolumeAndPanPlugin::create(), -1)) {
            std::cout << "Plugin added: " << plugin->getName() << " to: " << audioTrack->getName() << std::endl;
            if (auto vpPlugin = dynamic_cast<te::VolumeAndPanPlugin*>(plugin.get())) {
                vpPlugin->setVolumeDb(-3);
                std::cout << "Plugin is correct type :)" << std::endl;
            }
        }
        else {
            std::cout << "Failed to add plugin" << std::endl;
        }
    };
    std::cout << std::endl;
}

void CybrEdit::recordOsc()
{
    oscRecorder = std::make_unique<OscRecorder>(engine);
}

void CybrEdit::activateEmptyEdit(File inputFile)
{
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = te::createEmptyEdit();
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    edit = std::make_unique<te::Edit>(editOptions);
}

void CybrEdit::loadEditFile(File inputFile) {
    // we are assuming the file exists.
    ValueTree valueTree = te::loadEditFromFile(inputFile, te::ProjectItemID::createNewID(0));
    
    // Create the edit object.
    // Note we cannot save an edit file without and ediit file retriever. It is
    // also used resolves audioclips that have source='./any/relative/path.wav'.
    std::cout << "Creating Edit Object" << std::endl;
    te::Edit::Options editOptions{ engine };
    editOptions.editProjectItemID = te::ProjectItemID::createNewID(0);
    editOptions.editState = valueTree;
    editOptions.numUndoLevelsToStore = 0;
    editOptions.role = te::Edit::forRendering;
    editOptions.editFileRetriever = [inputFile] { return inputFile; };
    std::unique_ptr<te::Edit> newEdit = std::make_unique<te::Edit>(editOptions);
    
    // By default (and for simplicity), all clips in an in-memory edit should
    // have a source property with an absolute path value. We want to avoid
    // clip sources with project ids or relative path values.
    setClipSourcesToDirectFileReferences(*newEdit, false, true);
    
    // List any missing plugins
    for (auto plugin : newEdit->getPluginCache().getPlugins()) {
        if (plugin->isMissing()) {
            std::cout << "WARNING! Edit contains this plugin, which is missing from the host: " << plugin->getName() << std::endl;
        }
    }
    edit = std::move(newEdit);
    std::cout << "Loaded file: " << inputFile.getFullPathName() << std::endl;
    
    // Add the CYBER Sidecar
    ValueTree cybrValueTree = edit->state.getOrCreateChildWithName(CYBR, nullptr);
    cybr = std::make_unique<Cybr>(*edit, cybrValueTree);
    std::cout << "CYBR sidecar added with id: " << cybr->itemID.toString() << std::endl;
    std::cout << std::endl;
}

void CybrEdit::saveActiveEdit(File outputFile) {
    if (!edit) {
        std::cerr
        << "ERROR: Output failed. No edit file loaded."
        << std::endl << std::endl;
        return;
    }
    auto outputExt = outputFile.getFileExtension().toLowerCase(); // resolve relative if needed
    
    if (outputExt == ".tracktionedit") {
        // Save a .tracktionedit file.
        std::cout << "Saving: " << outputFile.getFullPathName() << std::endl;
        // When edit files are saved, prefer relative paths.
        edit->editFileRetriever = [outputFile] { return outputFile; };
        setClipSourcesToDirectFileReferences(*edit, true, true);
        // .save and .saveAs may be silent no-ops unless we markAsChanged()
        edit->markAsChanged();
        te::EditFileOperations(*edit).saveAs(outputFile, true);
    }
    else if (outputExt == ".wav")
    {
        std::cout << "Save: " << outputFile.getFullPathName() << std::endl;
        // Just add all the tracks to the bitmask
        BigInteger tracksToDo;
        {
            int trackCount = te::getAllTracks(*edit).size();
            for (int i = 0; i < trackCount; i++) {
                tracksToDo.setBit(i);
            }
        }
        te::Renderer::renderToFile({ "Chaz Render Job" },
                                   outputFile,
                                   *edit,
                                   { 0, edit->getLength() },
                                   tracksToDo, true, {}, false);
    }
    else {
        std::cout
        << "Could not output file due to unknown extension: "
        << outputFile.getFullPathName()
        << std::endl;
    }
}

void CybrEdit::setClipSourcesToDirectFileReferences(te::Edit& changeEdit, bool useRelativePath, bool verbose = true)
{
    int failures = 0;
    if (verbose) std::cout << "Searching for audio clips and updating their sources to "
        << (useRelativePath ? "relative" : "absolute")
        << " file paths" << std::endl;
    
    for (auto track : te::getClipTracks(changeEdit)) { // for each track
        for (auto clip : track->getClips()) { // inspect each clip
            if (auto audioClip = dynamic_cast<te::WaveAudioClip*>(clip)) { // if it is an audio clip
                auto& sourceFileRef = audioClip->getSourceFileReference();
                auto file = sourceFileRef.getFile();
                if (file == File()) {
                    // We failed to get the filepath from the project manager
                    failures++;
                    std::cerr
                    << "ERROR: Failed to find and update source clip: " << audioClip->getName()
                    << " source=\"" << sourceFileRef.source << "\"" << std::endl;
                }
                else {
                    // We have a filepath. We are not certain the file exists.
                    // Even if the file does not exists, we may be able to
                    // update the source property.
                    //
                    // TODO: What hapens if files have no common ancestor, and
                    // we are changing to relative paths???
                    //
                    // Note: setToDirectFileReference triggers a breakpoint if
                    // the edit file is not found, and we are using a realtive
                    // path, but it will still set the relative path correctly.
                    String original = sourceFileRef.source;
                    sourceFileRef.setToDirectFileReference(file, useRelativePath); // assertion breakpoint if edit file DNE
                    if (original != sourceFileRef.source) {
                        audioClip->sourceMediaChanged(); // what does this really do, and is it needed?
                        if (verbose) std::cout
                            << "Updated \"" << original
                            << "\" to \"" << sourceFileRef.source << "\"" << std::endl;
                    }
                    else {
                        if (verbose) std::cout
                            << "Unchanged path: " << sourceFileRef.source << std::endl;
                    }
                }
            }
        }
    }
    if (failures > 0) {
        std::cerr
        << "ERROR: not all source clips could be identified!" << std::endl
        << "In my testing on windows, this happens when any of the following are true:" << std::endl
        << "- App is not aware of the project manager (try --autodetect-pm)" << std::endl
        << "- The uid is not found by the project manager" << std::endl;
    }
    if (verbose) std::cout << std::endl;
}

