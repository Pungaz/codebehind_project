/**
 * Used to put all players against each other to get the number of contestant to a product of 4 so the playoffs are valid.
 * The people that ger disqualified are the ones with the leas amount of wins which is a parameter added to the players here.
 * @param players is a list of all players that are entered either through console or a file
 * @returns {*[]|*} the list of players, length is a product of 4 and is not longer than 16. We also add one parameter
 * to the player and it's the number of wins
 */
function qualifiers(players) {
    if (players.length === 2 || players.length === 1) {
        return players;
    }

    let wins = {};
    let winners = [];
    for (let i = 0; i < players.length - 1; i++) {
        for (let j = i + 1; j < players.length; j++) {
            let matchInfo = playMatch(players[i], players[j]);
            if (!wins[matchInfo.winner.ranking]) {
                matchInfo.winner.wins = 0;
                wins[matchInfo.winner.ranking] = matchInfo.winner;
            }
            wins[matchInfo.winner.ranking].wins += 1;
        }
    }

    for (const [key, value] of Object.entries(wins)) {
        winners.push(value);
    }

    winners.sort(sortByNumOfWins);

    if (players.length === 3) {
        return winners.slice(0, 2);
    }

    if(players.length > 16){
        return winners.slice(0, 16);
    }else {
        return winners.slice(0, players.length - players.length % 4);
    }
}

/**
 * Simulation of the playoffs where if you loose you are disqualified
 * @param players list of players not longer than 16
 * @param round used to write the round number in output, it starts from 1 then goes up accordingly
 */
function playoff(players, round) {

    if (players.length === 2) {
        console.log(`\nFinals`);
    } else if (players.length === 4) {
        console.log(`\nSemifinals`);
    } else if (players.length !== 1) {
        console.log(`\nRound number ${round}`);

    }
    if (players.length === 1) {
        console.log(`\nWinner is ${players[0].firstName} ${players[0].lastName} (${players[0].country}, ${players[0].ranking})`);
        return;
    }
    let winners = [];
    for (let i = 0; i < players.length / 2; i++) {
        winners.push(playMatch(players[i], players[players.length / 2 + i])["winner"]);
    }

    playoff(winners, round + 1);
}

/**
 * Simulation of a single match with the score throughout the game.
 * @param player1 player object with his name, surname, country of origin, rank and number of wins in qualifiers
 * @param player2 player object with his name, surname, country of origin, rank and number of wins in qualifiers
 * @returns {{score: *[], winner: *, loser: *}} Object that has the winner, loser and the score at the end of the match
 */
function playMatch(player1, player2) {
    let player1Set = 0, player2Set = 0, player1Game = 0, player2Game = 0;
    let score = [], gameScore = [], gameWin;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 14; j++) {
            gameWin = Math.floor(Math.random() * 2);
            gameWin ? ++player2Game : ++player1Game;

            if ((player1Game === 6 && player2Game < 5) || player1Game === 7) {
                ++player1Set;
                break;
            } else if ((player2Game === 6 && player1Game < 5) || player2Game === 7) {
                ++player2Set;
                break;
            }
        }

        gameScore.push(player1Game, player2Game);
        score.push(gameScore);
        gameScore = [];
        player1Game = 0;
        player2Game = 0;
        if (player1Set === 2 || player2Set === 2) {
            break;
        }
    }

    console.log(`\nMatch played between ${player1.firstName} & ${player2.firstName}, the winner is ${player1Set === 2 ? player1.firstName : player2.firstName} with the score of ${score}`);

    return {
        winner: player1Set === 2 ? player1 : player2,
        loser: player1Set < 2 ? player1 : player2,
        score: score
    };
}

function sortByNumOfWins(a, b) {
    return b.wins - a.wins;
}

module.exports = {
    playoff,
    qualifiers
}