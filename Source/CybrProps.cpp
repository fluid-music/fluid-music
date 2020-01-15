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
