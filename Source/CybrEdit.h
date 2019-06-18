/*
  ==============================================================================

    CybrEdit.h
    Created: 18 Jun 2019 10:57:17am
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include <iostream>
#include "../JuceLibraryCode/JuceHeader.h"
#include "OpenFrameworksPlugin.h"
#include "OscRecorder.h"
#include "OscSource.h"
#include "Cybr.h"

namespace te = tracktion_engine;

/** CybrEdit wraps a tracktion_engine::Edit and a Cybr object, and provides the
 main interface for interacting with the model
 */
class CybrEdit {
public:
    CybrEdit(te::Engine& e) : engine(e) {}

    void listClips();
    void listTracks();
    
    /** WIP - testing custom plugin
     */
    void junk();
    void recordOsc();
    
    /** Create and activate an empty edit
     */
    void activateEmptyEdit(File inputFile);
    void loadEditFile(File inputFile);
    void saveActiveEdit(File outputFile);
    
    /** For each audio clip with a source that references a project ID, update
     that source so it uses a filepath instead.
     */
    void setClipSourcesToDirectFileReferences(te::Edit& changeEdit, bool useRelativePath, bool verbose);

    /** Is there an active edit?
     */
    bool hasActiveEdit() { return edit != nullptr; }
    
    std::unique_ptr<te::Edit> edit;
private:
    te::Engine& engine;

    std::unique_ptr<OscRecorder> oscRecorder;
    std::unique_ptr<Cybr> cybr;
};
