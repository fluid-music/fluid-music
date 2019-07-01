/*
  ==============================================================================

    TimestampedTest.h
    Created: 1 Jul 2019 6:06:42pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once

// For now, just use a simple test message. Later we can figure out if and how
// to subclass or DRY these.
struct TimestampedTest {
    double arrivedAt = 0;
    double streamTime = 0;
    double editTime = 0;

    int value;
    String toString() {
        String t(streamTime, 4);
        String s{ "test: " };
        s << t << " - " << value;
        return s;
    }
};
