// The section below contains methods for creating parameter keys

export const upperFirstLetter = (string: string) => {
  const s = Array.from(string)
  s[0] = s[0].toUpperCase()
  return s.join('')
}

export const lowerFirstLetter = (string: string) => {
  const s = Array.from(string)
  s[0] = s[0].toLowerCase()
  return s.join('')
}

export const isUpperCase = (s) => s.length && (s.toUpperCase() === s)

/**
 * Create a version of the word that with a lower case first letter.
 */
export const firstWord = (word: string) => {
  if (word.length === 1 || isUpperCase(word)) return word.toLowerCase();
  // We have a lower or mixed case word. Decide based on the second letter.
  return isUpperCase(word[1]) ? word.toLowerCase() : lowerFirstLetter(word);
};

export const restWord = (word: string) => {
  if (word.length === 1) return word.toUpperCase();
  word = isUpperCase(word) ? word.toLowerCase() : word;
  // We have a lower or mixed case word. Decide based on the second letter.
  word = isUpperCase(word[1]) ? word.toLowerCase() : word;
  return upperFirstLetter(word);
}

/**
 * Generate a camelCase name from a parameter name
 */
export const camelCaseFromParamName = (paramName: string) => {
  return paramName
    .replace(/[\(\):\# \_\-\\\/]+/g, '-')  // Replace misc chars with '-'
    .split('-')                            // create an array of words
    .filter(s => s.length)
    .map((word, i) => {
      if (i === 0) return firstWord(word); // treat 1st word as special case
      return restWord(word);               // remaining words treated the same
    })
    .join('')
}

// Convert to an acceptable variable name
export const makeVarName = (name: string) => name.replace(/[\(\):\# \_\-\\\/]+/g, '')


// All lower case number conversions
const numberStrings = {
  "inf": Number.POSITIVE_INFINITY,
  "infinity": Number.POSITIVE_INFINITY,
}

function parseNumberString(str : string) {
  str = str.trim()
  let num = Number(str)
  if (!isNaN(num)) return num

  num = parseFloat(str)
  if (!isNaN(num)) return num

  let multiplier = 1
  if (str.startsWith('-')) { multiplier = -1; str = str.slice(1) }
  else if (str.startsWith('+')) { str = str.slice(1) }

  const lowerStr = str.toLowerCase().split(' ')[0]
  if (numberStrings.hasOwnProperty(lowerStr)) {
    return numberStrings[lowerStr] * multiplier
  }
}

export function guessParamRange(paramInfo: any) {
  let min = parseNumberString(paramInfo.outputValueRangeAsStrings[0])
  let max = parseNumberString(paramInfo.outputValueRangeAsStrings[1])

  if (typeof min === 'number' && typeof max === 'number') return [ min, max ]
  return null
}

// All lower case static unit conversions
const unitStrings = {
  "%": 'percent',
  "s": 'seconds'
}
function extractUnits(str : string) {
  const parts = str.split(' ')
  if (parts.length) {
    const lastPart = parts.slice(-1)[0]
    const lowerStr = lastPart.toLowerCase().split(' ')[0]
    if (unitStrings.hasOwnProperty(lowerStr)) return unitStrings[lowerStr]
    return lowerStr;
  }
  return null
}

/**
 * Try to get a lower case string that describes the parameter units. Returns
 * null if the unit type could not be identified.
 * @param paramInfo the parameter object found in a plugin parameter report
 */
export function guessParamUnits(paramInfo: any) {
  // If the min and the max both have the same label, use it
  const [minLabel, maxLabel] = paramInfo.outputValueRangeAsStringsWithLabels.map(extractUnits)
  if (minLabel && minLabel === maxLabel) return minLabel;
  if (paramInfo.currentLabel.length) return paramInfo.currentLabel
  return null
}

export function guessIsContinuous(paramInfo: any) {

  const steps = paramInfo.outputValueStepsAsStrings
  if (steps?.length) {
    const floats = steps.map(parseNumberString)
    const allNumbers = floats.every(f => typeof f === 'number')
    if (!allNumbers) return false
    const allIntegers = floats.every(f => f === Math.floor(f))
    if (allIntegers) return false
    else return true
  }

  return !!guessParamRange(paramInfo)
}

export function guessIsLinear(paramInfo: any) {
  const pName = paramInfo.name

  const range = guessParamRange(paramInfo)
  if (!range) return false

  const [min, max] = range
  if (typeof min !== 'number' || typeof max !== 'number') return false

  const span = Math.abs(max - min)

  const numSteps = paramInfo.outputValueStepsAsStrings.length
  if (numSteps % 2 === 0)
    throw new Error(`guessIsLinear: paramInfo.outputValueStepsAsStrings must have an odd length  (${pName})`)

  const linearMidpoint = min + (span/2)
  const actualMidpoint = parseNumberString(paramInfo.outputValueStepsAsStrings[Math.floor(numSteps / 2)])

  if (typeof actualMidpoint !== 'number')
    throw new Error(`guessIsLinear: failed to get a midpoint number (${pName})`)

  const difference = Math.abs(linearMidpoint - actualMidpoint)
  // We only have access to a parameter value as a string, so "actualMidpoint"
  // will be imprecise. Tolerate 1% inaccuracy.
  return (difference / span) <= 0.01
}

interface s2n { [key: string]: number }
export function guessDiscreteChoices(paramInfo) {
  const choices : s2n = {}
  const inputs = paramInfo.inputSteps as number[]
  const steps = paramInfo.outputValueStepsAsStrings
  steps.forEach((step, i) => choices[step] = inputs[i])

  const keys = Object.keys(choices)
  if (keys.length === 2) {
    if (choices[keys[0]] === 1) choices[keys[1]] = 0; else
    if (choices[keys[1]] === 1) choices[keys[0]] = 0
  }

  return choices
}

/**
 * Create a 'guess' object that aggregates results of the guess methods.
 * @param paramInfo the parameter object found in a plugin parameter report
 */
export function guess(paramInfo: any) {
  const units = guessParamUnits(paramInfo)
  const key = camelCaseFromParamName(paramInfo.name) + (units ? upperFirstLetter(units) : '')
  const isContinuous = guessIsContinuous(paramInfo)
  const choices = isContinuous ? null : guessDiscreteChoices(paramInfo)
  const guess = {
    key,
    units,
    isContinuous,
    choices,
    isLinear: guessIsLinear(paramInfo),
    range: guessParamRange(paramInfo),
  }

  return guess
}
