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

  return [ min, max ]
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
  const [min, max]  = guessParamRange(paramInfo)
  return (typeof min === 'number' && typeof max === 'number')
}

export function guessIsLinear(paramInfo: any) {
  const pName = paramInfo.name;

  const [min, max] = guessParamRange(paramInfo)
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

/**
 * Annotate the parameter object by adding a `.guess` object
 * @param paramInfo the parameter object found in a plugin parameter report
 */
export function guess(paramInfo: any) {
  paramInfo.guess = {
    isContinuous: guessIsContinuous(paramInfo),
    isLinear: guessIsLinear(paramInfo),
    range: guessParamRange(paramInfo),
    units: guessParamUnits(paramInfo),
  }

  return paramInfo.guess
}
