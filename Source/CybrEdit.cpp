/*
  ==============================================================================

    CybrEdit.cpp
    Created: 18 Jun 2019 10:57:17am
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrEdit.h"

CybrEdit::CybrEdit(te::Edit& e) :
    te::EditItem (te::EditItemID::readOrCreateNewID (e, e.state.getOrCreateChildWithName(CYBR, nullptr)), e),
    state(e.state.getOrCreateChildWithName(CYBR, nullptr))
{
    cybrTrackList = std::make_unique<CybrTrackList>(*this, state);
    std::cout << "CYBR sidecar added with id: " << itemID.toString() << std::endl;
}

CybrEdit::~CybrEdit() {
    if (saveOnClose)
        saveActiveEdit(File::getCurrentWorkingDirectory().getChildFile({ "out.tracktionedit" }));
}

void CybrEdit::valueTreePropertyChanged(juce::ValueTree &treeWhosePropertyHasChanged, const juce::Identifier &property)
{
    std::cout << "CybrEdit property changed: " << treeWhosePropertyHasChanged.toXmlString() << std::endl;
}

void CybrEdit::listClips() {
    std::cout << "List Clips..." << std::endl;
    // I believe "Clip" tracks may be Marker, Chord, or Audio tracks (and
    // possibly others). Audio Tracks may have midi clips
    for (auto track : te::getClipTracks(edit)) {
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
    for (auto track : te::getAllTracks(edit))
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

void CybrEdit::listState() {
    int count = edit.state.getNumChildren();
    std::cout << "Printing all top level element types" << std::endl;
    for (int i = 0; i < count; i++){
        std::cout << edit.state.getChild(i).getType().toString() << std::endl;
    }
    std::cout << std::endl;
}

void CybrEdit::junk()
{
   if (auto audioTrack = te::getFirstAudioTrack(edit)) {
        // insert my plugin
        if (auto plugin = audioTrack->pluginList.insertPlugin(OpenFrameworksPlugin::create(), 0)) {
            std::cout << "My Plugin Added!" << std::endl;
            if (auto ofPlugin = dynamic_cast<OpenFrameworksPlugin*>(plugin.get())){
                std::cout << "My Plugin is correct type!" << std::endl;
                ofPlugin->semitonesValue.setValue(30, nullptr);
            }
        } else {
            std::cout << "Failed to add plugin" << std::endl;
        }
    };
    std::cout << std::endl;
}

void CybrEdit::saveActiveEdit(File outputFile) {
    auto outputExt = outputFile.getFileExtension().toLowerCase(); // resolve relative if needed
    
    if (outputExt == ".tracktionedit") {
        // Save a .tracktionedit file.
        std::cout << "Saving: " << outputFile.getFullPathName() << std::endl;
        // When edit files are saved, prefer relative paths.
        edit.editFileRetriever = [outputFile] { return outputFile; };
        setClipSourcesToDirectFileReferences(edit, true, true);
        // .save and .saveAs may be silent no-ops unless we markAsChanged()
        edit.markAsChanged();
        te::EditFileOperations(edit).saveAs(outputFile, true);
    }
    else if (outputExt == ".wav")
    {
        std::cout << "Save: " << outputFile.getFullPathName() << std::endl;
        // Just add all the tracks to the bitmask
        BigInteger tracksToDo;
        {
            int trackCount = te::getAllTracks(edit).size();
            for (int i = 0; i < trackCount; i++) {
                tracksToDo.setBit(i);
            }
        }
        te::Renderer::renderToFile({ "Chaz Render Job" },
                                   outputFile,
                                   edit,
                                   { 0, edit.getLength() },
                                   tracksToDo, true, {}, false);
    }
    else {
        std::cout
        << "Could not output file due to unknown extension: "
        << outputFile.getFullPathName()
        << std::endl;
    }
}


