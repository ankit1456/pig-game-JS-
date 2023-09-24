'use strict';

//SECTION: selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let isPlaying, currentScore, activePlayer, scores;

const init = function () {
  isPlaying = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
};

//SECTION STARTING THE GAME
init();

const displayCurrentScore = function (crnScore) {
  currentScore = crnScore;
  document.getElementById(`current--${activePlayer}`).textContent = crnScore;
};

const switchPlayer = () => {
  displayCurrentScore(0);
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const WINNING_SCORE = 20;

//SECTION: roll dice

btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    if (dice === 1) {
      switchPlayer();
    } else {
      displayCurrentScore(currentScore + dice);
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= WINNING_SCORE) {
      document.getElementById(`name--${activePlayer}`).textContent =
        'WINNER 🎉🎉';
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
