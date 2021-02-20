//
//  temp_OSCInputStream.hpp
//  cybr - ConsoleApp
//
//  Created by Zhi Wei Gan on 2/24/20.
//

#pragma once
#include "../JuceLibraryCode/JuceHeader.h"

namespace cybr {

//==============================================================================
/** Allows a block of data to be accessed as a stream of OSC data.

    The memory is shared and will be neither copied nor owned by the OSCInputStream.

    This class is implementing the Open Sound Control 1.0 Specification for
    interpreting the data.

    Note: Some older implementations of OSC may omit the OSC Type Tag string
    in OSC messages. This class will treat such OSC messages as format errors.
*/
class OSCInputStream
{
public:
    /** Creates an OSCInputStream.

        @param sourceData               the block of data to use as the stream's source
        @param sourceDataSize           the number of bytes in the source data block
    */
    OSCInputStream (const void* sourceData, size_t sourceDataSize);

    //==============================================================================
    /** Returns a pointer to the source data block from which this stream is reading. */
    const void* getData() const noexcept        { return input.getData(); }

    /** Returns the number of bytes of source data in the block from which this stream is reading. */
    size_t getDataSize() const noexcept         { return input.getDataSize(); }

    /** Returns the current position of the stream. */
    juce::uint64 getPosition()                        { return (juce::uint64) input.getPosition(); }

    /** Attempts to set the current position of the stream. Returns true if this was successful. */
    bool setPosition (juce::int64 pos)                { return input.setPosition (pos); }

    /** Returns the total amount of data in bytes accessible by this stream. */
    juce::int64 getTotalLength()                      { return input.getTotalLength(); }

    /** Returns true if the stream has no more data to read. */
    bool isExhausted()                          { return input.isExhausted(); }

    //==============================================================================
    juce::int32 readInt32();

    juce::uint64 readUint64();

    float readFloat32();
    
    double readFloat64();

    juce::String readString();

    juce::MemoryBlock readBlob();

    OSCColour readColour();

    OSCTimeTag readTimeTag();

    OSCAddress readAddress();
    
    OSCAddressPattern readAddressPattern();

    OSCTypeList readTypeTagString();

    OSCArgument readArgument (OSCType type);

    //==============================================================================
    OSCMessage readMessage();

    OSCBundle readBundle (size_t maxBytesToRead = std::numeric_limits<size_t>::max());

    //==============================================================================
    OSCBundle::Element readElement();

    OSCBundle::Element readElementWithKnownSize (size_t elementSize);

private:
    juce::MemoryInputStream input;

    void readPaddingZeros (size_t bytesRead);
    
    OSCBundle readBundleWithCheckedSize (size_t size);
    
    OSCMessage readMessageWithCheckedSize (size_t size);
    
    void checkBytesAvailable (juce::int64 requiredBytes, const char* message);
};

} // namespace

