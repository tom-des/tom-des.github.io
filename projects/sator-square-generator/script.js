let validWords = [];
let palindromes = [];
let solutions = [];
let testCount = 0;

// Generate list of words that are valid forwards and backwards

for (let i = 0; i < completeWordList.length; i++) {
  let word = completeWordList[i];
  word = word.split('').reverse().join('');

  if (completeWordList.indexOf(word) >= 0) {
    validWords.push(word);
  }

  // Generate list of palindrome words

  if (word == word.split('').reverse().join('')) {
    palindromes.push(word);
  }
}

// The main solver loop

let validWordLength = validWords.length;

// Get word 1 + 5 reversed

for (let i = 0; i < validWordLength; i++) {
  let word1 = validWords[i].split('');

  // Get and test word 2 + 4 reversed 

  for (let j = 0; j < validWordLength; j++) {
    let word2 = validWords[j].split('');

    if (word1[1] + word1[3] !== word2[0] + word2[4]) {
      testCount++;
      continue;
    }

    // Get and test word 3 (palindrome word)

    for (let k = 0; k < palindromes.length; k++) {
      let word3 = palindromes[k].split('');

      if (word1[2] + word2[2] !== word3[0] + word3[1]) {
        testCount++;
        continue;
      }
      testCount++;
      solutions.push([word1, word2, word3]);

      console.log(`${word1}\n${word2}\n${word3}`);
    }
  }
}

// Choose random solution and output it

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let solutionIndex = getRandomInt(solutions.length);
let outputSolution = solutions[solutionIndex];

let solutionHTML = `
${outputSolution[0].join(' ')}</br>
${outputSolution[1].join(' ')}</br>
${outputSolution[2].join(' ')}</br>
${outputSolution[1].reverse().join(' ')}</br>
${outputSolution[0].reverse().join(' ')}
`;

document.querySelector('#sator-square').innerHTML = solutionHTML;

// Log out stats

console.log(`${completeWordList.length} words in dictionary`);
console.log(
  `${validWords.length} valid words (${
    (validWords.length - palindromes.length) / 2
  } pairs + ${palindromes.length} palindrome words)`
);
console.log(`${testCount} tests performed`);
console.log(`${solutions.length} solutions found`);
