const fluid = require('fluid-music');

module.exports = {
  /**
   * Select and configure a short reverb preset.
   * 
   * This does not select a track. You must select a track before calling.
   */
  shortReverb() {
    return [
      fluid.pluginTReverber8.select(),
      fluid.pluginTReverber8.setMixPercent(100),
      fluid.pluginTReverber8.setGainDbfs(0),
      fluid.pluginTReverber8.setEarlyLateMixPercent(64),
      fluid.pluginTReverber8.setDecay(0.24),
      fluid.pluginTReverber8.setPredelayMs(30),
      fluid.pluginTReverber8.setSizePercent(37),
      fluid.pluginTReverber8.setDampingHz(5437),
      fluid.pluginTReverber8.setBandwidthHz(5500),
      fluid.pluginTReverber8.setDensity(0.42),
    ];
  }
}