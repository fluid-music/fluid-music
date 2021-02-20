#include "cybr_OSCInputStream.h"

using namespace juce;

namespace cybr {

using OSCType = char;

class TypeWrapper{
public:
    static const OSCType int32 = 'i';
    static const OSCType float32 = 'f';
    static const OSCType string = 's';
    static const OSCType blob = 'b';
    static const OSCType colour = 'r';
    static const OSCType float64 = 'd';
};

OSCInputStream::OSCInputStream (const void* sourceData, size_t sourceDataSize)
    : input (sourceData, sourceDataSize, false)
{}

//==============================================================================
int32 OSCInputStream::readInt32()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading int32");
    return input.readIntBigEndian();
}

uint64 OSCInputStream::readUint64()
{
    checkBytesAvailable (8, "OSC input stream exhausted while reading uint64");
    return (uint64) input.readInt64BigEndian();
}

float OSCInputStream::readFloat32()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading float");
    return input.readFloatBigEndian();
}

double OSCInputStream::readFloat64()
{
    checkBytesAvailable (8, "OSC input stream exhausted while reading double");
    return input.readDoubleBigEndian();
}

String OSCInputStream::readString()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading string");

    auto posBegin = (size_t) getPosition();
    auto s = input.readString();
    auto posEnd = (size_t) getPosition();

    if (static_cast<const char*> (getData()) [posEnd - 1] != '\0')
        throw OSCFormatError ("OSC input stream exhausted before finding null terminator of string");

    size_t bytesRead = posEnd - posBegin;
    readPaddingZeros (bytesRead);

    return s;
}

MemoryBlock OSCInputStream::readBlob()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading blob");

    auto blobDataSize = input.readIntBigEndian();
    checkBytesAvailable ((blobDataSize + 3) % 4, "OSC input stream exhausted before reaching end of blob");

    MemoryBlock blob;
    auto bytesRead = input.readIntoMemoryBlock (blob, (ssize_t) blobDataSize);
    readPaddingZeros (bytesRead);

    return blob;
}

OSCColour OSCInputStream::readColour()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading colour");
    return OSCColour::fromInt32 ((uint32) input.readIntBigEndian());
}

OSCTimeTag OSCInputStream::readTimeTag()
{
    checkBytesAvailable (8, "OSC input stream exhausted while reading time tag");
    return OSCTimeTag (uint64 (input.readInt64BigEndian()));
}

OSCAddress OSCInputStream::readAddress()
{
    return OSCAddress (readString());
}

OSCAddressPattern OSCInputStream::readAddressPattern()
{
    return OSCAddressPattern (readString());
}

//==============================================================================
OSCTypeList OSCInputStream::readTypeTagString()
{
    OSCTypeList typeList;

    checkBytesAvailable (4, "OSC input stream exhausted while reading type tag string");

    if (input.readByte() != ',')
        throw OSCFormatError ("OSC input stream format error: expected type tag string");

    for (;;)
    {
        if (isExhausted())
            throw OSCFormatError ("OSC input stream exhausted while reading type tag string");

        const OSCType type = input.readByte();

        if (type == 0)
            break;  // encountered null terminator. list is complete.

        if (! OSCTypes::isSupportedType (type))
            throw OSCFormatError ("OSC input stream format error: encountered unsupported type tag");

        typeList.add (type);
    }

    auto bytesRead = (size_t) typeList.size() + 2;
    readPaddingZeros (bytesRead);

    return typeList;
}

//==============================================================================
OSCArgument OSCInputStream::readArgument (OSCType type)
{
    switch (type)
    {
        case TypeWrapper::int32:       return OSCArgument (readInt32());
        case TypeWrapper::float32:     return OSCArgument (readFloat32());
        case TypeWrapper::float64:     return OSCArgument (readFloat64());
        case TypeWrapper::string:      return OSCArgument (readString());
        case TypeWrapper::blob:        return OSCArgument (readBlob());
        case TypeWrapper::colour:      return OSCArgument (readColour());

        default:
            // You supplied an invalid OSCType when calling readArgument! This should never happen.
            jassertfalse;
            throw OSCInternalError ("OSC input stream: internal error while reading message argument");
    }
}

//==============================================================================
OSCMessage OSCInputStream::readMessage()
{
    auto ap = readAddressPattern();
    auto types = readTypeTagString();

    OSCMessage msg (ap);

    for (auto& type : types)
        msg.addArgument (readArgument (type));

    return msg;
}

//==============================================================================
OSCBundle OSCInputStream::readBundle (size_t maxBytesToRead)
{
    // maxBytesToRead is only passed in here in case this bundle is a nested
    // bundle, so we know when to consider the next element *not* part of this
    // bundle anymore (but part of the outer bundle) and return.

    checkBytesAvailable (16, "OSC input stream exhausted while reading bundle");

    if (readString() != "#bundle")
        throw OSCFormatError ("OSC input stream format error: bundle does not start with string '#bundle'");

    OSCBundle bundle (readTimeTag());

    size_t bytesRead = 16; // already read "#bundle" and timeTag
    auto pos = getPosition();

    while (! isExhausted() && bytesRead < maxBytesToRead)
    {
        bundle.addElement (readElement());

        auto newPos = getPosition();
        bytesRead += (size_t) (newPos - pos);
        pos = newPos;
    }

    return bundle;
}

//==============================================================================
OSCBundle::Element OSCInputStream::readElement()
{
    checkBytesAvailable (4, "OSC input stream exhausted while reading bundle element size");

    auto elementSize = (size_t) readInt32();

    if (elementSize < 4)
        throw OSCFormatError ("OSC input stream format error: invalid bundle element size");

    return readElementWithKnownSize (elementSize);
}

//==============================================================================
OSCBundle::Element OSCInputStream::readElementWithKnownSize (size_t elementSize)
{
    checkBytesAvailable ((int64) elementSize, "OSC input stream exhausted while reading bundle element content");

    auto firstContentChar = static_cast<const char*> (getData()) [getPosition()];

    if (firstContentChar == '/')  return OSCBundle::Element (readMessageWithCheckedSize (elementSize));
    if (firstContentChar == '#')  return OSCBundle::Element (readBundleWithCheckedSize (elementSize));

    throw OSCFormatError ("OSC input stream: invalid bundle element content");
}

//==============================================================================
void OSCInputStream::readPaddingZeros (size_t bytesRead)
{
    size_t numZeros = ~(bytesRead - 1) & 0x03;

    while (numZeros > 0)
    {
        if (isExhausted() || input.readByte() != 0)
            throw OSCFormatError ("OSC input stream format error: missing padding zeros");

        --numZeros;
    }
}

OSCBundle OSCInputStream::readBundleWithCheckedSize (size_t size)
{
    auto begin = (size_t) getPosition();
    auto maxBytesToRead = size - 4; // we've already read 4 bytes (the bundle size)

    OSCBundle bundle (readBundle (maxBytesToRead));

    if (getPosition() - begin != size)
        throw OSCFormatError ("OSC input stream format error: wrong element content size encountered while reading");

    return bundle;
}

OSCMessage OSCInputStream::readMessageWithCheckedSize (size_t size)
{
    auto begin = (size_t) getPosition();
    auto message = readMessage();

    if (getPosition() - begin != size)
        throw OSCFormatError ("OSC input stream format error: wrong element content size encountered while reading");

    return message;
}

void OSCInputStream::checkBytesAvailable (int64 requiredBytes, const char* message)
{
    if (input.getNumBytesRemaining() < requiredBytes)
        throw OSCFormatError (message);
}
}
