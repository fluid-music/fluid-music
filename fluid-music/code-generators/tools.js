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

/**
 * Create a version of the word that with a lower case first letter.
 * @param {String} word
 * @returns {String}
 */
const firstWord = (word) => {
  if (word.length === 1 || isUpperCase(word)) return word.toLowerCase();
  // We have a lower or mixed case word. Decide based on the second letter.
  return isUpperCase(word[1]) ? word.toLowerCase() : lowerFirstLetter(word);
};

const restWord = (word) => {
  if (word.length === 1) return word.toUpperCase();
  word = isUpperCase(word) ? word.toLowerCase() : word;
  // We have a lower or mixed case word. Decide based on the second letter.
  word = isUpperCase(word[1]) ? word.toLowerCase() : word;
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

const writePluginHelperFile = (pluginName, paramNames, writableStream, includeParams = true, type='VST2') => {

  const camelCaseNames = paramNames.map(camelCaseFromParamName);
  const functionNames  = camelCaseNames.map(s => 'set' + upperFirstLetter(s));

  const funcNamesToParamNames  = R.zipObj(paramNames, functionNames);
  const camelNamesToParamNames = R.zipObj(camelCaseNames, paramNames);

  writableStream.write(`
const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  type: '${type}',
  name: '${pluginName}',
  /**
   * Select a \`${pluginName}\` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [nth] Optional index of the \`${pluginName}\` instance.
   *    The selected track may have multiple plugins with the same name. Index
   *    from within those plugins. Most of the time this isn't needed, because
   *    it is unusual to have more than one plugin with a given name on a
   *    particular track.
   */
  select(nth) {
    return fluid.plugin.select('${pluginName}', '${type}', nth);
  },
` );

  R.mapObjIndexed((funcName, paramName) => {
    const funcBody = createFunctionString(funcName, paramName);
    writableStream.write(funcBody);
    return { funcName, funcBody };
  }, funcNamesToParamNames);

  if (includeParams) {
    writableStream.write(`\n  params: {`);
    for (const [camelName, fullName] of Object.entries(camelNamesToParamNames)) {
      writableStream.write(`
    ${camelName}: {
      name: '${fullName}',
      units: undefined,
      normalize: undefined,
    },`)
    }
    writableStream.write(`\n  },`);
  }

  writableStream.write('\n};\n');
};

/**
 * Take an individual param object from a plulgin parameter report, and convert
 * it to an object that will be useful for auto-generation of plugin modules.
 * The input looks like this as of August 24, 2020 (it may change):
 * ```javascript
 * {
 *   name: 'LFO1: FreqMod Dpt',
 *   defaultValue: 0,
 *   currentExplicitValue: 0.5,
 *   currentNormalizedValue: 0.5,
 *   currentValue: 0.5,
 *   currentValueAsStringWithLabel: '0.00',
 *   currentValueAsString: '0.00',
 *   currentBaseValue: 0.5,
 *   isDiscrete: false,
 *   isAutomationActive: false,
 *   isActive: true,
 *   hasAutomationPoints: false,
 *   hasLabels: false,
 *   currentLabel: '',
 *   inputValueRange: [ 0, 1 ],
 *   outputValueStepsAsString: [
 *     '-5.00', '-4.29', '-3.57',
 *     '-2.86', '-2.14', '-1.43',
 *     '-0.71', '0.00',  '0.71',
 *     '1.43',  '2.14',  '2.86',
 *     '3.57',  '4.29',  '5.00'
 *   ],
 *   outputValueRangeAsString: [ '-5.00', '5.00' ],
 *   outputValueRangeAsStringWithLabel: [ '-5.00', '5.00' ]
 * }
 * ```
 * @param {object} param 
 */
function paramReportToModuleData(param) {

  throw new Error('paramReportToModuleData is a work in progress');

  let min = parseFloat(param.outputValueRangeAsString[0]);
  let max = parseFloat(param.outputValueRangeAsString[1]);

  return {
    paramKey: tools.camelCaseFromParamName(param.name),
    paramName: param.name,
    min,
    max,
  }
}


module.exports = {
  camelCaseFromParamName,
  writePluginHelperFile,
};
