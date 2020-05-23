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

const isUpperCase = (s) => R.toUpper(s) === s;

const predicates = R.map(R.startsWith, ['VCF','VCC','VCA','OSC','LFO','EQ','ENV']);
const startsWithUpperAcronym = R.anyPass(predicates);
const toLowerUnlessAcronym = (string) => {
  return startsWithUpperAcronym(string) ? string : R.toLower(string);
};

/**
 * Create a version of the word that with a lower case first letter.
 * If the word is all uppercase, make it all lower case.
 * @param {String} word
 * @returns {String}
 */
const firstWord = (word) => {
  if (!word || !word.length)
    throw new Error(`Invalid parameter word (${word}): First word must be a string w/ length >= 1`);
  if (word.length === 1 || isUpperCase(word)) return toLowerUnlessAcronym(word);
  if (startsWithUpperAcronym(word)) return word;
  return lowerFirstLetter(word);
};

const restWord = (word) => {
  word = isUpperCase(word) ? toLowerUnlessAcronym(word) : word;
  return upperFirstLetter(word);
}

/**
 * Generate a camelCase name from a parameter name
 */
const camelCaseFromParamName = R.pipe(
  R.replace(/[:\# \_\-\\\/]+/g, '-'),    // Replace misc chars with '-'
  R.split('-'),                          // create an array of words
  R.addIndex(R.map)((word, i) => {
    if (i === 0) return firstWord(word); // treat 1st word as special case
    return restWord(word); }),           // remaining words treated the same
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
  startsWithUpperAcronym,
  toLowerUnlessAcronym,
  camelCaseFromParamName,
  writePluginHelperFile,
};
