/*
  ==============================================================================

    CybrEdit.cpp
    Created: 18 Jun 2019 10:57:17am
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrEdit.h"

CybrEdit::CybrEdit(te::Edit* e) :
    edit(std::move(e)),
    state(edit->state.getOrCreateChildWithName(CYBR, nullptr))
{
    cybrTrackList = std::make_unique<CybrTrackList>(*this, state);
    std::cout << "CYBR sidecar to: " << edit->editFileRetriever().getFullPathName() << std::endl;

    // Inside the timer callback is where messages are collected from the input
    // device instances, and applied to the edit's ValueTree. The juce::Timer
    // docs say that interval accuracy should be about 10-20 millisecond, which
    // informed my on the interval. However this may be worth tweaking, depending
    // on the volume of incoming messages.
    startTimer(15);
}

CybrEdit::~CybrEdit() {
    flushPendingChanges();
    if (saveOnClose)
        saveActiveEdit(File::getCurrentWorkingDirectory().getChildFile({ "out.tracktionedit" }));
}

void CybrEdit::timerCallback()
{
    flushPendingChanges();
}

void CybrEdit::flushPendingChanges()
{
    // Read any received OSC messages
    auto inputDeviceInstances = edit->getAllInputDevices();
    for (auto* instance : inputDeviceInstances) {
        if (auto* oscInput = dynamic_cast<OscInputDeviceInstance*>(instance)) {
            auto* t = cybrTrackList->getOrCreateLastTrack();
            for (auto& message : oscInput->toMessageThread.read()) {
                t->addEvent(message.streamTime, message.value);
            }
        }
    }
}

void CybrEdit::valueTreePropertyChanged(juce::ValueTree &treeWhosePropertyHasChanged, const juce::Identifier &property)
{
    std::cout << "CybrEdit property changed: " << treeWhosePropertyHasChanged.toXmlString() << std::endl;
}

void CybrEdit::valueTreeChildAdded(juce::ValueTree &parentTree, juce::ValueTree &childWhichHasBeenAdded)
{
    std::cout << "CybrEdit child added: " << childWhichHasBeenAdded.toXmlString() << std::endl;
}

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

void CybrEdit::listInputDevices() {
    std::cout << "List input device state..." << std::endl;
    auto& inputDevices = edit->getEditInputDevices();
    auto& deviceManager = edit->engine.getDeviceManager();
    int numInputDevices = deviceManager.getNumInputDevices();

    XmlElement::TextFormat format;
    format.addDefaultHeader = false;
    for (int i = 0; i < numInputDevices; i++) {
        auto* dev = deviceManager.getInputDevice(i);
        ValueTree state = inputDevices.getInstanceStateForInputDevice(*dev);
        std::cout << state.toXmlString(format); // adds endl by default
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

void CybrEdit::removeTracksNamed(const String name) {
    for (auto track : te::getAllTracks(*edit)) {
        if (track->getName().equalsIgnoreCase(name)) {
            edit->deleteTrack(track);
        }
    }
}


void CybrEdit::listState() {
    int count = edit->state.getNumChildren();
    std::cout << "Printing all top level element types" << std::endl;
    for (int i = 0; i < count; i++){
        std::cout << edit->state.getChild(i).getType().toString() << std::endl;
    }
    std::cout << std::endl;
}

void CybrEdit::junk()
{
   if (auto audioTrack = te::getFirstAudioTrack(*edit)) {
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

void CybrEdit::saveActiveEdit(File outputFile, SamplePathMode mode) {
    auto outputExt = outputFile.getFileExtension().toLowerCase(); // resolve relative if needed
    
    if (outputExt == ".tracktionedit") {
        // Save a .tracktionedit file.
        std::cout << "Saving: " << outputFile.getFullPathName() << std::endl;
        // When edit files are saved, prefer relative paths.
        edit->editFileRetriever = [outputFile] { return outputFile; };
        setClipAndSamplerSourcesToDirectFileReferences(*edit, mode);
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
        << "Could not save file due to unknown extension: "
        << outputFile.getFullPathName()
        << std::endl;
    }
}

te::AudioTrack* CybrEdit::getOrCreateCybrHostAudioTrack() {
    te::AudioTrack* found = nullptr;
    edit->getTrackList().visitAllTopLevel([&found] (te::Track& t) {
        if (auto audioTrack = dynamic_cast<te::AudioTrack*>(&t)) {
            if (audioTrack->getName() == String{"CYBR_HOST"}) {
                found = audioTrack;
                return false;
            }
        }
        return true;
    });
    if (!found) {
        std::cout << "No CYBR_HOST audio track found" << std::endl;
        // We just want to add a track, and don't really care where it is.
        // I'm using insertPoint creation from Edit::ensureNumberOfAudioTracks
        te::TrackInsertPoint insertPoint(nullptr, getTopLevelTracks (*edit).getLast());
        auto track = edit->insertNewAudioTrack(insertPoint, nullptr);
        track->setName({ "CYBR_HOST" });
    }
    return found;
}

te::MidiClip::Ptr CybrEdit::getOrCreateMidiClipWithName(juce::String name){
    for (auto track : te::getClipTracks(*edit)) {
        for (auto clip : track->getClips()) {
            if (auto midiClip = dynamic_cast<te::MidiClip*>(clip)) {
                if (midiClip->getName() == name) return midiClip;
            }
        }
    }
    edit->ensureNumberOfAudioTracks(1);
    te::AudioTrack* track = te::getAudioTracks(*edit).getLast();
    te::MidiClip::Ptr clip = track->insertMIDIClip(name, {0, 4}, nullptr);
    return clip;
}
