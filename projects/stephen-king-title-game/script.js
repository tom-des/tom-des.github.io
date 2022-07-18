// Variables

originalTitlesLength = titles.length;
duplicate = false;

// Query Selector replacement

function getElem(cssSelector) {
  return document.querySelector(cssSelector);
}

// Add event listeners

getElem('#new-title').addEventListener('click', refresh);
getElem('#submit').addEventListener('click', onSubmit);
document.addEventListener('keyup', (key) => {
  if (key.code == 'Enter') onSubmit();
});

// Function to create player

function createPlayer() {
  player = {
    titlesRemaining: 0,
    currentStreak: 0,
    bestStreak: 0,
    score: 0,
  };
}

window.onload = createPlayer();
refresh();

//function to update player fields

function updateScoreCard() {
  getElem(
    '#remaining'
  ).textContent = `${player.titlesRemaining}/${originalTitlesLength} titles remaining`;
  getElem('#streak').textContent = `Current streak: ${player.currentStreak}`;
  getElem('#score').textContent = `Score: ${player.score}`;
  getElem('#best').textContent = `Best streak: ${player.bestStreak}`;
}

// Randomizer function

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

// Function to reset the game

function refresh() {
  if (this.textContent == 'Play Again') {
    location.reload();
  }
  getElem('#submit').style.display = '';
  if (this.textContent == 'Give Up') {
    getElem('#input').value = '';
    player.currentStreak = 0;
    getElem('H1').textContent = answer;
    getElem('#submit').style.display = 'none';
    getElem('#results').textContent = 'Was the title.';
    getElem('#what-title').textContent = 'SORRY';
    this.textContent = 'Next';
    return;
  }
  if (titles.length === 0) {
    player.titlesRemaining = titles.length;
    getElem('#what-title').textContent = 'YOU MADE IT';
    getElem('#results').textContent = 'Nicely done.';
    getElem('h1').textContent = 'GAME OVER';
    getElem('#submit').style.display = 'none';
    getElem('#input').style.display = 'none';
    getElem('#new-title').textContent = 'Play Again';
    updateScoreCard();
    this.href = '#';

    return;
  }
  getElem('#what-title').textContent = `WHAT IS THE TITLE?`;

  getElem('h1').textContent = 'Loading...';

  input = getElem('#input').value;

  titlesLength = titles.length;
  player.titlesRemaining = titlesLength;
  titleNumber = getRandom(titlesLength);

  title = titles[titleNumber];
  console.log(title);

  answer = title.toUpperCase();
  answerArray = answer.split('');
  answerLength = answerArray.length;
  shuffledTitle = '';

  for (i = 1; answerLength > 0; i++) {
    num = getRandom(answerLength);
    shuffledTitle += answerArray[num];
    answerArray.splice(num, 1);
    answerLength = answerArray.length;
    if (answer == shuffledTitle) {
      answerArray = answer.split('');
      answerLength = answerArray.length;
      shuffledTitle = '';
      continue;
    }
  }
  this.textContent = 'Give Up';
  getElem('h1').textContent = shuffledTitle;
  getElem('#results').textContent = 'Guess wisely.';
  getElem('#input').value = '';

  titles.splice(titleNumber, 1);
  updateScoreCard();
}

// Function to check the answer submitted

function onSubmit() {
  input = getElem('#input').value;
  if (!input) {
    getElem('#results').textContent = 'Enter your guess.';
    return;
  }

  if (input.toUpperCase().replace(/\W/g, '') == answer.replace(/\W/g, '')) {
    getElem('#new-title').innerText = 'Next';
    getElem('h1').textContent = answer;
    alertText = 'Well done.';
    getElem('#submit').style.display = 'none';
    getElem('#what-title').textContent = `CORRECT`;
    player.currentStreak++;
    player.score++;
    getElem('#input').value = '';
    updateScoreCard();
    if (player.bestStreak < player.currentStreak) {
      player.bestStreak = player.currentStreak;
    }
  } else {
    player.currentStreak = 0;
    updateScoreCard();

    alertText = 'Try again.';
  }
  getElem('#results').textContent = alertText;
}
