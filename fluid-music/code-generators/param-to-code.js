var fs = require('fs');
const R = require('ramda');

if (process.argv.length <= 2 && typeof(process.argv[2]) !== 'string'){
    console.log("param-to-code.js takes an additional argument of the name of the plugin")
    return
}

var pluginName = process.argv[2].toString();
pluginName[0] = R.toUpper(pluginName[0]);

var paramNames = fs.readFileSync('param-list.txt').toString().split("\n").filter((item)=>{
    if (item.length > 0) return true;
    return false;
});

const functionIds = paramNames.map(R.pipe(
    R.replace(/[:\# \_\-\\\/]+/g, '-'),
    R.split('-'),
    R.map(a => { let s = Array.from(a); s[0] = R.toUpper(s[0]); return R.join('', s); }),
    R.join(''),
));

const functionNames = functionIds.map(R.pipe(
  s => 'set' + s,
));

const funcNamesToParamNames = R.zipObj(paramNames, functionNames);
const paramNamesToFuncNames = R.zipObj(functionIds, paramNames);

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
  },
  `
}

let writeStream = fs.createWriteStream(`plugin-${pluginName.toLowerCase()}-vst.js`);

writeStream.write(
    `const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  /**
   * Select a \`${pluginName}\` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
  return fluid.plugin.select('${pluginName}', 'vst', pluginId);
  },
`);
    
R.mapObjIndexed((funcName, paramName) => {
    const funcBody = createFunctionString(funcName, paramName);
    writeStream.write(funcBody);
    return { funcName, funcBody };
}, funcNamesToParamNames);

writeStream.write(`\n  params = ${JSON.stringify(paramNamesToFuncNames)}\n`)

writeStream.write('\n};');