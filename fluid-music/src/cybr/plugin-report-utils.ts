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
  if (!guessIsContinuous(paramInfo)) return null;

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
const checkForAltUnitName = (u: string) => {
  u = u.toLowerCase()
  return unitStrings.hasOwnProperty(u) ? unitStrings[u] : u
}
function extractUnits(str : string) {
  const parts = str.split(' ')
  if (parts.length) {
    const lastPart = parts.slice(-1)[0]
    const unitStr = lastPart.split(' ')[0]
    return checkForAltUnitName(unitStr)
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
  const range = paramInfo.outputValueRangeAsStringsWithLabels
  if (range?.length) {
    const [minLabel, maxLabel] = range.map(extractUnits)
    if (minLabel && minLabel === maxLabel) return minLabel
    if (paramInfo.currentLabel?.length) return checkForAltUnitName(paramInfo.currentLabel)
    return null
  }

  throw new Error('missing paramInfo (outputValueRangeAsStrings)')
}

/**
 * Guess if the parameter is a continuous value. This will be a much stronger
 * guess if the report was generates with a large number of steps.
 * @param paramInfo a parameter report
 */
export function guessIsContinuous(paramInfo: any) {
  // If every step is a floating value (and not an integer) assume continuous
  const steps = paramInfo.outputValueStepsAsStrings
  if (steps?.length) {
    const floats = steps.map(parseNumberString)
    const allNumbers = floats.every(f => typeof f === 'number')
    if (!allNumbers) return false
    const allIntegers = floats.every(f => f === Math.floor(f))
    if (allIntegers) return false
    return true
  }

  // If the output steps are not available, just check if the range evaluates to
  // numbers (returning the range even if both are integers)
  const range = paramInfo.outputValueRangeAsStrings
  if (range?.length) {
    const floats = range.map(parseNumberString)
    const allNumbers = floats.every(f => typeof f === 'number')
    if (!allNumbers) return false
    return true
  }

  throw new Error('missing paramInfo (outputValueStepsAsStrings || outputValueRangeAsStrings')
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
  steps.forEach((step, i) => choices[step.toLowerCase()] = inputs[i])

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
  const isContinuous = guessIsContinuous(paramInfo)
  let choices = isContinuous ? null : guessDiscreteChoices(paramInfo)
  if (choices && Object.keys(choices).length >= paramInfo.outputValueStepsAsStrings.length) {
    console.warn(`Guesser: Omitting .choices from "${paramInfo.name}" param because the report step resolution may be too low`)
    choices = null
  }
  const guess = {
    units,
    isContinuous,
    choices,
    isLinear: guessIsLinear(paramInfo),
    range: guessParamRange(paramInfo),
  }

  return guess
}
