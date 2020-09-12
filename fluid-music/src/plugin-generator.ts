import * as R from 'ramda'
import { guess } from './cybr/plugin-report-utils'

// The section below contains methods for creating parameter keys

export const upperFirstLetter = (string: string) => {
  const s = Array.from(string)
  s[0] = R.toUpper(s[0])
  return R.join('', s)
}

export const lowerFirstLetter = (string: string) => {
  const s = Array.from(string)
  s[0] = R.toLower(s[0])
  return R.join('', s)
}

export const isUpperCase = (s) => R.toUpper(s) === s

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
  const a = R.replace(/[:\# \_\-\\\/]+/g, '-', paramName) // Replace misc chars with '-'
  const b = R.split('-', a)                               // create an array of words
  const c = b.map((word, i) => {
    if (i === 0) return firstWord(word); // treat 1st word as special case
    return restWord(word);               // remaining words treated the same
  });           
  return c.join('')
}


export function generatePluginModule(report: any) { 
  const pluginName = report.name
  let output = `import { PluginType, FluidPlugin, PluginAutomationEvent } from './plugin';\n`
  
  for (const paramInfo of report.params) guess(paramInfo);
  
}