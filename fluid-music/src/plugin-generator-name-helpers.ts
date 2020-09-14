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
export const makeVarName = (name: string) => name.replace(/[\.\(\):\# \_\-\\\/]+/g, '')
