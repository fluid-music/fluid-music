/*
  ==============================================================================

    CybrSearchPath.cpp
    Created: 16 Jan 2020 9:06:58pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrSearchPath.h"

using namespace juce;

File getWaveformAppDir() {
    PropertiesFile::Options jucePropOpts;

    // It appears applicationName is ignored on Mac. For some reason, setting it
    // to "config" yields correct results on linux, which expands to:
    // /home/$USER/.config/Tracktion/Waveform/
    jucePropOpts.applicationName = "config";
    jucePropOpts.osxLibrarySubFolder = "Application Support";
    jucePropOpts.getDefaultFile();
    PropertiesFile juceProps(jucePropOpts);
    return juceProps.getFile().getParentDirectory().getChildFile("Tracktion/Waveform");
}

CybrSearchPath::CybrSearchPath(StringRef _name)
: name(_name)
{}

void CybrSearchPath::add(File directory) {
    String k = key();
    PropertiesFile* props = te::getApplicationSettings();
    const String paths = props->getValue(k);
    FileSearchPath searchPath = FileSearchPath(paths);
    searchPath.add(directory, 0);
    props->setValue(k, searchPath.toString());
}

String CybrSearchPath::key() const {
    return "cybr-" + name + "-paths";
}

void CybrSearchPath::init(ConsoleApplication& cApp, String defaults) {
    PropertiesFile* props = te::getApplicationSettings();
    String k = key();
    if (props->getValue(k).isEmpty()) props->setValue(k, defaults);
    String command = "--" + name + "-path";
    String n = name;
    cApp.addCommand({
        command,
        command + "[=./path|!]",
        "Print/Add/Reset " + name + " search path",
        "Multi-purpose tool for getting and setting a search directories.\n\
        \n\
        This can be used in three different ways:\n\
        1) With no argument, print the current search paths\n\
        2) With '=./some/path' as an argument, add that path to the front of\n\
           the list of search paths. The path string may be absolute or\n\
           relative. If it is relative, it will be resolved to an absolute\n\
           path before it is added to the list of search paths.\n\
        3) With '=!' as the argument, reset to the default search paths",
        [k, defaults, command, n](const ArgumentList& args) {
            String newPath = args.getValueForOption(command);
            auto* propFile = te::getApplicationSettings();
            CybrSearchPath searchPath(n);
            if (newPath.isNotEmpty()) {
                if (newPath == "!") {
                    propFile->setValue(k, defaults);
                    std::cout << "Reset " << n << " search dirs to: " << std::endl;
                } else {
                    searchPath.add(File::getCurrentWorkingDirectory().getChildFile(newPath));
                    std::cout << "Update " << n << " search dirs to: " << std::endl;
                }
            }
            for (auto dir : searchPath.paths())
                std::cout << dir.getFullPathName() << std::endl;
        }
    });
}

Array<File> CybrSearchPath::paths() const {
    String k = key();
    auto searchPath = FileSearchPath(te::getApplicationSettings()->getValue(k));
    Array<File> directories;

    int count = searchPath.getNumPaths();
    for (int i = 0; i < count; i++) directories.add(searchPath[i]);
    return directories;
}

File CybrSearchPath::find(const StringRef filePath) const {
    auto dirs = paths();

    for (auto dir : dirs) {
        File check = dir.getChildFile(filePath);
        if (check.existsAsFile()) {
            return check;
        }
    }
    return File();
}
