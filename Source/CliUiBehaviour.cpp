/*
  ==============================================================================

    CliUiBehavior.cpp
    Created: 5 May 2019 5:44:09pm
    Author:  Charles

  ==============================================================================
*/

#include <iostream>
#include "CliUiBehaviour.h"

void CliUiBehaviour::runTaskWithProgressBar(te::ThreadPoolJobWithProgress& job) {
    
    while (job.runJob() != juce::ThreadPoolJob::JobStatus::jobHasFinished) {
        std::cout << "\rprogress: " << job.getCurrentTaskProgress() << "                     ";
    }
    DBG(job.getCurrentTaskProgress());
    std::cout << std::endl;
}

  void CliUiBehaviour::showWarningAlert(const juce::String & title, const juce::String & message)
  {
      std::cout << "Warn Alert: " << title << " --- " << message << std::endl;
      DBG("WARNING: " + message);
  }

  bool CliUiBehaviour::showOkCancelAlertBox(const juce::String & title, const juce::String & message, const juce::String & ok, const juce::String & cancel)
  {
      std::cout << "Canceled:   " << title << " - " << message << " - Ok: " << ok << " - Cancel: " << cancel << std::endl;
      DBG("CANCEL: " + message);
      return false;
  }

  int CliUiBehaviour::showYesNoCancelAlertBox(const juce::String & title, const juce::String & message, const juce::String & yes, const juce::String & no, const juce::String & cancel)
  {
      std::cout << "Y/(N):      " << title << " - " << message << " - Yes: " << yes << " - No: " << no << " - Cancel: " << cancel << std::endl;
      DBG("Y/(N): " + message);
      return 0;
  }

  void CliUiBehaviour::showInfoMessage(const juce::String & message)
  {
      std::cout << "Info:       " << message << std::endl;
      DBG("INFO: " + message);
  }

  void CliUiBehaviour::showWarningMessage(const juce::String & message)
  {
      std::cout << "Warn Msg:   " << message << std::endl;
      DBG("WARN: " + message);
  }
