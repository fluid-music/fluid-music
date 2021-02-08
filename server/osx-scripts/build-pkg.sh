#!/bin/sh

pkgbuild --root ../Builds/MacOSX/build/pkgroot/ \
         --identifier "edu.mit.media.cybr" \
         --version "0.2" \
         --install-location "/" \
         --sign "Developer ID Installer: Tod Machover (2Z44ZRUPZ4)" \
         ../Builds/MacOSX/build/cybr-0.2.pkg
