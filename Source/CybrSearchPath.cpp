/*
  ==============================================================================

    CybrSearchPath.cpp
    Created: 16 Jan 2020 9:06:58pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrSearchPath.h"

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

const String CybrSearchPath::key() {
    return "cybr-" + name + "-paths";
}

void CybrSearchPath::init(ConsoleApplication& cApp, String defaults) {
    PropertiesFile* props = te::getApplicationSettings();
    String k = key();
    if (props->getValue(k).isEmpty()) props->setValue(k, defaults);
    String command = "--" + name + "-paths";
    String n = name;
    cApp.addCommand({
        command,
        command + "[=./path|!]",
        "Print/Add/Reset " + name + "search paths",
        "Multi-purpose tool for getting and setting a search path.\n\
        \n\
        This can be used in three different ways:\n\
        1) With no argument, print the search path, which is a semicolon\n\
           separated list of directories\n\
        2) With '=./some/path' as an argument, add that path to the front of\n\
           the list of search paths. The path string may be absolute or\n\
           relative. If it is relative, it will be resolved to an absolute\n\
           path before it is added to the list of search paths.\n\
        3) With '=!' as the argument, which resets the path to a default value",
        [k, defaults, command, n](const ArgumentList& args) {
            String newPath = args.getValueForOption(command);
            auto* propFile = te::getApplicationSettings();
            if (newPath.isNotEmpty()) {
                if (newPath == "!") {
                    propFile->setValue(k, defaults);
                    std::cout << "Reset " << n << " search path to: ";
                } else {
                    CybrSearchPath path(n);
                    path.add(File::getCurrentWorkingDirectory().getChildFile(newPath));
                    std::cout << n << " search path updated to: ";
                }
            }
            std::cout << te::getApplicationSettings()->getValue(k) << std::endl;
        }
    });
}
