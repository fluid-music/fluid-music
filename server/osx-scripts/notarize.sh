#!/bin/sh

# if [ -z "$1" ]
# then
#     echo "Usage: $ ./notarize.sh <path-to-cybr.pkg>"
#     exit 1
# fi

PKG_FILE="../Builds/MacOSX/build/cybr-0.2.pkg"
echo "Notarizing pkg: $PKG_FILE"

xcrun altool --notarize-app \
             --primary-bundle-id "edu.mit.media.cybr" \
             --username "citysymph@media.mit.edu" \
             --password "@keychain:Developer-altool" \
             --asc-provider "2Z44ZRUPZ4" \
             --file "$PKG_FILE"
