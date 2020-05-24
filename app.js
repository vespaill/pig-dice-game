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
const DEBUGGING = true;
let scores, roundScore, activePlayer, gamePlaying;

$(document).ready(function () {
    init();

    let $dice = $(".dice");
    $dice.hide();

    $(".btn-roll").on("click", () => {
        if (gamePlaying) {
            /* Roll dice */
            let diceValue = Math.floor(Math.random() * 6) + 1;

            /* Display the result */
            $dice.show()
                .attr("src", `./images/dice-${diceValue}.png`);

            /* Update the round score IF the rolled number was NOT a 1 */
            if (diceValue !== 1) {
                roundScore += diceValue;
                $(`#current-${activePlayer}`).text(roundScore);
            } else {
                nextPlayer();
            }
        }
    });

    $(".btn-hold").on("click", () => {
        if (gamePlaying) {
            /* Update the score on GLOBAL scope */
            scores[activePlayer] += roundScore;

            /* Update the UI */
            $(`#score-${activePlayer}`).text(scores[activePlayer]);

            /* Check if the player won the game */
            if (scores[activePlayer] >= WIN_SCORE) {
                $(`#name-${activePlayer}`).text("Winner!");

                $(".dice").hide();

                $(`.player-${activePlayer}-panel`)
                    .addClass("winner")
                    .removeClass("active");

                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    });

    $(".btn-new").on("click", init);
});

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    $(".dice").hide();

    $("#score-0").text("0");
    $("#score-1").text("0");
    $("#current-0").text("0");
    $("#current-1").text("0");

    $("#name-0").text("Player 1");
    $("#name-1").text("Player 2");

    $(".player-0-panel").removeClass("winner");
    $(".player-1-panel").removeClass("winner");
    $(".player-0-panel").removeClass("active");
    $(".player-1-panel").removeClass("active");

    $(".player-0-panel").addClass("active");
}

function nextPlayer() {
    activePlayer = (activePlayer + 1) % 2;
    if (DEBUGGING) console.log("activePlayer:", activePlayer);
    roundScore = 0;

    $("#current-0").text("0");
    $("#current-1").text("0");

    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");

    $(".dice").hide();
}
