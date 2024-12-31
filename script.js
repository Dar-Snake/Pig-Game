'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
let scores, currentScore, activePlayer, playerscore, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playerscore = 0;

  playing = true;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();
// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generating a random dice role
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;

    // 3.Check for rolled 1: if true,switch to next player
    if (diceRoll !== 1) {
      currentScore += diceRoll;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
  //   playerscore += currentScore;
  //   document.querySelector(`#score--${activePlayer}`).textContent =
  //   if (score0El.textContent < 100 && score1El.textContent < 100) {
  //       Number(document.querySelector(`#score--${activePlayer}`).textContent) +
  //       playerscore;
  //      document.getElementById(`current--${activePlayer}`).textContent = 0;
  //     currentScore = 0;
  //     activePlayer = activePlayer === 0 ? 1 : 0;
  //     player0El.classList.toggle('player--active');
  //     player1El.classList.toggle('player--active');
  //   } else {
  //     console.log(`player--${activePlayer} wins`);
  //   }
});

btnNew.addEventListener('click', init);
