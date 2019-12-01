const isEmpty =     (char) => char === ' ' || char === '.';
const notEmpty =    (char) => !isEmpty(char);
const isQuarter =   (char) => char.length === 1 && '1234567890'.includes(char);
const isEighth =    (char) => char === '+';
const isSixteenth = (char) => char === 'a' || char === 'e';

const division = (char) => {
  if (typeof char !== 'string' || char.length !== 1)
    throw new Error(`division must be a string of length 1, got: '${char}'`);

  if (isEmpty(char)) return 0;
  if (isQuarter(char)) return 1/4;
  if (isEighth(char)) return 1/8;
  if (isSixteenth(char)) return 1/16;

  throw new Error(`No division for '${char}' character`);
}

const rhythmToAdvanceArray = function(rhythm) {
  if (typeof rhythm === 'string') rhythm = rhythm.split('');

  const result = [];

  rhythm.forEach((char, i, array) => {
    if (i+1 === array.length) return;
    let amount = null; 
    let next = null; // next non-zero value
    for (const c of array.slice(i+1)) {
      if (notEmpty(c)) {
        next = c;
        break;
      }
    }

    if (isEmpty(char)) 
      amount = 0;
    else if (next === null)
      amount = division(char);
    else
      amount = Math.min(division(char), division(next));

    result.push(amount);
  });

  return result;
}


const rhythmToElapsedArray = function(rhythm) {
  if (typeof rhythm === 'string') rhythm = rhythm.split('');

  let elapsed = 0;
  let previous;
  const result = rhythm.map((char, i, array) => {
    const prev = array[i-1];
    if (' .'.includes(char)) return 0;
    if (typeof previous !== 'string') return;
    // if (previous )

  });
  return result;
};


module.exports = {
  rhythmToElapsedArray,
  rhythmToAdvanceArray,
};
