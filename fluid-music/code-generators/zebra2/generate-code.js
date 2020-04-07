const R = require('ramda');
const vst2PluginNames = require('./vst2-parameter-names');
const functionNames = vst2PluginNames.map(R.pipe(
  R.replace(/[:\# \-\\\/]+/g, '-'),
  R.split('-'),
  R.map(a => { let s = Array.from(a); s[0] = R.toUpper(s[0]); return R.join('', s); }),
  R.join(''),
  s => 'set' + s,
));
const funcNamesToParamNames = R.zipObj(vst2PluginNames, functionNames);

const createFunctionString = (functionName, paramName) => {
  return `
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  ${functionName}(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('${paramName}', value, timeInQuarterNotes, curve);
  },`
}

console.log(
`
const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  /**
   * Select a \`Zebra2\` vst2 plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('Zebra2', 'vst', pluginId);
  },
`);

const results = R.mapObjIndexed((funcName, paramName) => {
  const funcBody = createFunctionString(funcName, paramName);
  console.log(funcBody);
  return { funcName, funcBody };
}, funcNamesToParamNames);
console.log('};');
