'use strict';

//! Selecting elements */

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.getElementById('name--0');
const name1 = document.getElementById('name--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing,currentScore,activePlayer,scores,winningScore;

//! Starting condition */

function init() {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  winningScore = 100;

  score0.textContent = 0;
  score1.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
}

init();
//! Switch player */
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 1 ? 0 : 1;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//!Dice roll */
btnRoll.addEventListener('click', function(){
  if (playing) {
    // 1 generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2 display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    //! 3 switch to next player if rollled 1 */
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

//! Hold the score */

btnHold.addEventListener('click', function()  {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // check if score is greater or equal to winning score
    if (scores[activePlayer] >= winningScore) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER 🎉🎉';
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//! New game

btnNew.addEventListener('click',init);
