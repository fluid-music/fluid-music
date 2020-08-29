/**
 * This is a .trkpreset in string format that contains a rack with a single
 * continuous macro parameter named 'width. The width behaves as follows:
 * - width = 0.0 // inverted left / right
 * - width = 0.5 // mono
 * - width = 1.0 // standard stereo
 */
export const stereoWidthRack = 
`<?xml version="1.0" encoding="UTF-8"?>

<PRESET name="stereo-width" tags="Rack" path="/Users/charles/Library/Application Support/Tracktion/Waveform/Presets"
        filename="stereo-width.trkpreset">
  <RACK id="1004" name="Stereo Width">
    <MACROPARAMETERS id="1004">
      <MACROPARAMETER id="1006" name="width" value="1.0"/>
      <MODIFIERASSIGNMENTS/>
    </MACROPARAMETERS>
    <WINDOWSTATE windowPos="528 478 847 658" active="1" windowLocked="1"/>
    <OUTPUT name="midi output"/>
    <OUTPUT name="output 1 (left)"/>
    <OUTPUT name="output 2 (right)"/>
    <INPUT name="midi input"/>
    <INPUT name="input 1 (left)"/>
    <INPUT name="input 2 (right)"/>
    <MODIFIERS/>
    <FACEPLATE width="8.0" height="4.0" autoSize="1" stretch="1">
      <RESOURCES/>
    </FACEPLATE>
    <PLUGININSTANCE x="0.5377777777777778" y="0.4092140921409214">
      <PLUGIN id="1008" type="volume" windowLocked="1" enabled="1" pan="-1.0"
              base64:parameters="8.vEla......." windowX="607" windowY="205"
              volume="0.5488116145133972">
        <MACROPARAMETERS id="1010"/>
        <MODIFIERASSIGNMENTS>
          <MACRO source="1006" paramID="pan" value="-1.0" offset="0.5"/>
        </MODIFIERASSIGNMENTS>
        <FACEPLATE width="8.0" height="4.0" autoSize="1" assignEnabled="0">
          <RESOURCES/>
          <BACKGROUND imageAlpha="1.0"/>
        </FACEPLATE>
      </PLUGIN>
    </PLUGININSTANCE>
    <CONNECTION src="0" dst="1008" srcPin="1" dstPin="1"/>
    <CONNECTION src="1008" dst="0" srcPin="1" dstPin="1"/>
    <CONNECTION src="1008" dst="0" srcPin="2" dstPin="2"/>
    <CONNECTION src="0" dst="1008" srcPin="0" dstPin="0"/>
    <CONNECTION src="1008" dst="0" srcPin="0" dstPin="0"/>
    <PLUGININSTANCE x="0.5533333333333333" y="0.8157181571815718">
      <PLUGIN id="1011" type="volume" windowLocked="1" enabled="1" pan="1.0"
              base64:parameters="8.vEla......." windowX="607" windowY="205"
              volume="0.5488116145133972">
        <MACROPARAMETERS id="1013"/>
        <MODIFIERASSIGNMENTS>
          <MACRO source="1006" paramID="pan" value="1.0" offset="-0.5"/>
        </MODIFIERASSIGNMENTS>
        <FACEPLATE width="8.0" height="4.0" autoSize="1">
          <RESOURCES/>
        </FACEPLATE>
      </PLUGIN>
    </PLUGININSTANCE>
    <CONNECTION src="1011" dst="0" srcPin="1" dstPin="1"/>
    <CONNECTION src="1011" dst="0" srcPin="2" dstPin="2"/>
    <CONNECTION src="0" dst="1008" srcPin="1" dstPin="2"/>
    <CONNECTION src="0" dst="1011" srcPin="2" dstPin="2"/>
    <CONNECTION src="0" dst="1011" srcPin="2" dstPin="1"/>
  </RACK>
</PRESET>
`;
