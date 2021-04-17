/**
 * Randomly get an element from an object or array.
 * @param {Object|Array} input 
 */
export function choice(input) {
  if (!input.length && !(Object.keys(input).length))
    return undefined;
  if (Array.isArray(input))
    return input[Math.floor(Math.random() * input.length)];
  else
    return input[choice(Object.keys(input))];
}

export function shuffle(array : any[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}