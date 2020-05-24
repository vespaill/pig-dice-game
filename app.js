/**
 * GAME RULES:
 *
 * The game has 2 players, playing in rounds.
 *
 * In each turn, a player rolls a dice as many times as he whishes. Each result
 * get added to his ROUND score.
 *
 * BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's
 * the next player's turn.
 *
 * The player can choose to 'Hold', which means that his ROUND score gets added
 * to his GLOBAL score. After that, it's the next player's turn.
 *
 * The first player to reach 100 points on GLOBAL score wins the game.
 */

const WIN_SCORE = 20;
let scores, roundScore, activePlayer;

init();

document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", () => {
    /* Random dice number */
    let dice = Math.floor(Math.random() * 6) + 1;

    /* Display the result */
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `./images/dice-${dice}.png`;

    /* Update the round score IF the rolled number was NOT a 1 */
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
    /* Update the score on GLOBAL scope */
    scores[activePlayer] += roundScore;

    /* Update the UI */
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    /* Check if the player won the game */
    if (scores[activePlayer] >= WIN_SCORE) {
        document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
    } else {
        nextPlayer();
    }
});


function nextPlayer() {
    console.log(activePlayer);
    activePlayer = (activePlayer+1) % 2;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

}

document.querySelector(".btn-new").addEventListener("click", init);
