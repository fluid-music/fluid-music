/*
  ==============================================================================

    SamplePathMode.h
    Created: 15 Jan 2020 3:23:58pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once

/** Specify how to save file paths to samples in the edit */
enum SamplePathMode : int {
    relative, /** Use filepaths relative to the edit */
    absolute, /** Use absolute filepaths */
    decide,   /** Use relative paths for children, absolute paths
               for any files that are not children of the directory
               containing the edit. */
};

