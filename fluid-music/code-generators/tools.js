const R = require('ramda');

const upperFirstLetter = (string) => {
  const s = Array.from(string);
  s[0] = R.toUpper(s[0]);
  return R.join('', s);
};

const lowerFirstLetter = (string) => {
  const s = Array.from(string);
  s[0] = R.toLower(s[0]);
  return R.join('', s);
};

/**
 * Create a version of the word that with a lower case first letter, UNLESS the
 * input word is all uppercase for example DRY.
 * @param {String} word
 * @returns {String}
 */
const firstWord = (word) => {
  if (!word || !word.length) throw new Error('First word must be a string of length 1');
  if (word.length === 1) return R.toLower(word);
  if (R.toLower(word[2]) === word[2]) return lowerFirstLetter(word);
  return word;
};

/**
 * Generate a camelCase name from a parameter name
 */
const camelCaseFromParamName = R.pipe(
  R.replace(/[:\# \_\-\\\/]+/g, '-'),
  R.split('-'),
  R.addIndex(R.map)((a, i) => {
    if (i === 0) return firstWord(a);
    return upperFirstLetter(a); }),
  R.join(''),
);

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
`;
};

const writePluginHelperFile = (pluginName, paramNames, writableStream, includeParams = true) => {

  const camelCaseNames = paramNames.map(camelCaseFromParamName);
  const functionNames  = camelCaseNames.map(s => 'set' + upperFirstLetter(s));

  const funcNamesToParamNames = R.zipObj(paramNames, functionNames);
  const paramNamesToFuncNames = R.zipObj(camelCaseNames, paramNames);

  writableStream.write(`
const plugin = require('./plugin');
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
`   );

  R.mapObjIndexed((funcName, paramName) => {
    const funcBody = createFunctionString(funcName, paramName);
    writableStream.write(funcBody);
    return { funcName, funcBody };
  }, funcNamesToParamNames);

  if (includeParams)
    writableStream.write(`\n  params: ${JSON.stringify(paramNamesToFuncNames, null, 2)},\n`)

  writableStream.write('\n};\n');
};

module.exports = {
  writePluginHelperFile,
};
