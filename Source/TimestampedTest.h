/*
  ==============================================================================

    TimestampedTest.h
    Created: 1 Jul 2019 6:06:42pm
    Author:  Charles Holbrow

  ==============================================================================
*/

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"

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

/** LockFreeOscMessageQueue helps efficiently pass messages between threads.
 */
class LockFreeOscMessageQueue {
public:
    void writeMessage(const OSCMessage& message, double timeMs) {
        // Create the object
        if (message.size() < 1) return;
        if (!message[0].isInt32()) return;
        TimestampedTest obj{ timeMs * 0.001, 0.0, 0.0, message[0].getInt32() };
        writeMessage(obj);
    }

    void writeMessage(TimestampedTest obj) {
        // write to QUEUE
        int start1, size1, start2, size2;
        abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
        if (size1 > 0) storage[start1] = obj;
        else if (size2 > 0) storage[start2] = obj;
        abstractFifo.finishedWrite(size1 + size2);

        // Note that this behavior below would not work if we were
        // writing more than one value. If at some point we want to
        // write more than one value, we will need to account for the
        // where some of the values were written in the first loop.
        if (size1 + size2 == 0) {
            // Our buffer was full: just throw some stuff in the
            // buffer away. 10 was chosen arbitrarily.
            abstractFifo.prepareToRead(10, start1, size1, start2, size2);
            abstractFifo.finishedRead(size1 + size2);
            
            // write to QUEUE should be identical to above
            abstractFifo.prepareToWrite(1, start1, size1, start2, size2);
            if (size1 > 0) storage[start1] = obj;
            else if (size2 > 0) storage[start2] = obj;
            abstractFifo.finishedWrite(size1 + size2);
        }
    }

    std::vector<TimestampedTest> read(double adjustSecs) {
        // temporary storage for received values
        // is std::vector the right container?
        std::vector<TimestampedTest> received;
        
        // Handle lock free queue
        int start1, size1, start2, size2;
        abstractFifo.prepareToRead(abstractFifo.getNumReady(), start1, size1, start2, size2);
        received.reserve(size1+size2);
        
        // previous we did: auto* t = cybr.cybrTrackList->getOrCreateLastTrack();
        
        if (adjustSecs == 0) {
            std::cout << "Failed to get adjust secs" << std::endl;
        } else {
            for (int i = start1; i < start1 + size1; i++) {
                auto& obj = storage[i];
                obj.streamTime = storage[i].arrivedAt + adjustSecs;
                received.push_back(obj);
            }
            for (int i = start2; i < start2 + size2; i++) {
                auto& obj = storage[i];
                obj.streamTime = storage[i].arrivedAt + adjustSecs;
                received.push_back(obj);
            }
        }
        abstractFifo.finishedRead(size1 + size2);
        
        if (size1 || size2)
            std::cout
            << "Handled " << size1 << " + " << size2 << " elements"
            << std::endl << std::endl;
        
        return received;
    }

private:
    std::atomic<bool> lostMessages{false};
    static const int SIZE = 4096;
    AbstractFifo abstractFifo{SIZE};
    TimestampedTest storage[SIZE];
};
