// All lower case
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


function extractUnits(str : string) {
  const parts = str.split(' ')
  if (parts.length) return parts.slice(-1)[0]
  return null
}

export function guessParamUnits(paramInfo: any) {
  // If the min and the max both have the same label, use it
  const [minLabel, maxLabel] = paramInfo.outputValueRangeAsStringsWithLabels.map(extractUnits)
  if (minLabel && minLabel === maxLabel) return minLabel;
  if (paramInfo.currentLabel.length) return paramInfo.currentLabel
  return null
}
