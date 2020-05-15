const R = require('ramda');
const vst2PluginNames = require('./helm-vst2-parameter-names');
const functionNames = vst2PluginNames.map(R.pipe(
  R.replace(/[:\# \_\-\\\/]+/g, '-'),
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
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  ${functionName}(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('${paramName}', value, timeInWholeNotes, curve);
  },`
}

console.log(
`
const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  /**
   * Select a \`Helm\` vst2 plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('helm', 'vst', pluginId);
  },
`);

const results = R.mapObjIndexed((funcName, paramName) => {
  const funcBody = createFunctionString(funcName, paramName);
  console.log(funcBody);
  return { funcName, funcBody };
}, funcNamesToParamNames);

// params
console.log('params: {')
R.forEachObjIndexed((value, key) => {
    let camelCase = value.slice(3);
    camelCase = camelCase[0].toLowerCase() + camelCase.slice(1);
    console.log(`'${camelCase}':'${key}',`);
}, funcNamesToParamNames);
console.log('},');
// done params
console.log('};');
