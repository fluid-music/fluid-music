#!/bin/sh

if [ -z "$1" ]
then
    echo "Usage: $ ./status.sh <RequestUUID>"
    exit 1
fi

echo "Checking Notarization Status: $1"

xcrun altool --username "citysymph@media.mit.edu" \
             --password "@keychain:Developer-altool" \
             --notarization-info "$1"
