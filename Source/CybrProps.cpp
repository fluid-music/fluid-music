/*
  ==============================================================================

    CybrProps.cpp
    Created: 14 Jan 2020 12:12:49pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#include "CybrProps.h"

// Presets ===============================================================
File CybrProps::getPresetSaveLoadDir() {
    if (PropertiesFile* props = te::getApplicationSettings()) {
        String path = props->getValue(keyPresetSaveLoadDir);
        if (path.isNotEmpty()) {
            File directory = File(path);
            if (directory.isDirectory()) {
                return directory;
            }
        }
    }
    return getDefaultPresetSaveLoadDir();
}

bool CybrProps::setPresetSaveLoadDir(File directory) {
    directory.createDirectory();
    if (directory.isDirectory()) {
        if (PropertiesFile* props = te::getApplicationSettings()) {
            props->setValue(keyPresetSaveLoadDir, directory.getFullPathName());
            return true;
        }
    }
    return false;
}

void CybrProps::resetPresetSaveLoadDir() {
    te::getApplicationSettings()->removeValue(keyPresetSaveLoadDir);
}


// Samples ===============================================================
File CybrProps::getSamplesDir() {
    if (PropertiesFile* props = te::getApplicationSettings()) {
        String path = props->getValue(keySampleDir);
        if (path.isNotEmpty()) {
            File directory = File(path);
            if (directory.isDirectory()) {
                return directory;
            }
        }
    }
    return getDefaultSamplesDir();
}

bool CybrProps::setSamplesDir(File directory) {
    directory.createDirectory();
    if (directory.isDirectory()) {
        if (PropertiesFile* props = te::getApplicationSettings()) {
            props->setValue(keySampleDir, directory.getFullPathName());
            return true;
        }
    }
    return false;
}

void CybrProps::resetSamplesDir() {
    te::getApplicationSettings()->removeValue(keySampleDir);
}

// Resolvers =============================================================

File CybrProps::resolveAudioFilepath(const StringRef path, File optionalExtraDir) {
    if (File::isAbsolutePath(path)) return File(path);
    File file = File();
    File check1 = File();

    if (optionalExtraDir != file)
         check1 = optionalExtraDir.getChildFile(path);
    File check2 = CybrProps::getSamplesDir().getChildFile(path);
    File check3 = File::getCurrentWorkingDirectory().getChildFile(path);

    if (check1.existsAsFile()) file = check1;
    else if (check2.existsAsFile()) file = check2;
    else if (check3.existsAsFile()) file = check3;
    else file = check2;

    return file;
}

// Private ===============================================================

File CybrProps::getDefaultPresetSaveLoadDir() {
    te::Engine& engine = te::Engine::getInstance();
    te::PropertyStorage& storage = engine.getPropertyStorage();
    return storage.getAppPrefsFolder().getChildFile("presets/");
}

File CybrProps::getDefaultSamplesDir() {
    te::Engine& engine = te::Engine::getInstance();
    te::PropertyStorage& storage = engine.getPropertyStorage();
    return storage.getAppPrefsFolder().getChildFile("samples/");
}

const String CybrProps::keyPresetSaveLoadDir = "cybr-preset-save-load-path";
const String CybrProps::keySampleDir = "cybr-sample-dir";
