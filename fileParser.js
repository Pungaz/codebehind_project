const readlineSync = require("readline-sync");
const fs = require("fs");

/**
 * Loads the file, validates the input and then it parses it to an array.
 * @returns {*[]} a sorted array of validated inputs that represent players and their information.
 */
function loadPlayersFromFile() {
    let file = readlineSync.question("\nUnesite ime ili putanju fajla i njegovu ekstenziju (npr. players.txt) koji sadrzi listu igraca: ");
    let tennisPlayers = [];

    while (true) {
        const rankingSet = new Set();
        tennisPlayers = [];

        try {
            const data = fs.readFileSync(file, 'utf8');
            const parsedData = data.split('\n');
            let invalidFileParam = false;

            for (let i = 0; i < parsedData.length - 1; i++) {
                const tempTennisPlayerData = parsedData[i].split(",");

                if (!rankingSet.has(parseInt(tempTennisPlayerData[3]))) {

                    for (let j = 0; j < 4; j++) {
                        if (!tempTennisPlayerData[j]) {
                            readlineSync.question("\nNevalidan sadrzaj fajla, ispravire gresku i probajte opet. Greska je kod: " + JSON.stringify(tennisPlayers[i]));
                            invalidFileParam = true;
                            break;
                        }
                    }

                    tennisPlayers.push({
                        firstName: tempTennisPlayerData[0].trim(),
                        lastName: tempTennisPlayerData[1].trim(),
                        country: tempTennisPlayerData[2].trim(),
                        ranking: parseInt(tempTennisPlayerData[3]),
                    });
                    rankingSet.add(tempTennisPlayerData[3]);

                    if (invalidFileParam) {
                        break;
                    }

                } else {
                    readlineSync.question("\nGRESKA -- Postoje dva igraca sa istim rankom u fajlu, ispravite gresku i pritisnite 'enter' za novi pokusaj");
                }
            }
            if (invalidFileParam) {
                continue;
            }
            break;
        } catch (e) {
            file = readlineSync.question("\nNe postoji fajl sa tim nazivom, pokusajte ponovo:  ");
        }
    }
    tennisPlayers.sort(sortByRanking);
    return tennisPlayers;
}

/**
 * Gets the information from console, validates it and puts it in array used later for simulating the game.
 * @returns {*[]} a sorted array of validated inputs that represent players and their information.
 */
function loadPlayersFromConsole() {
    let N = readlineSync.question("\nUnesite broj tenisera (N): ");

    while (N > 64) {
        N = readlineSync.question("\nBroj takmicara je ogranicen do 64, pokusajte ponovo: ");
    }

    const tennisPlayers = [];
    let rankingSet = new Set();

    for (let i = 0; i < N; i++) {
        const tempTennisPlayer = readlineSync.question(
            "\nUnesite tenisera u obliku [ime], [prezime], [drzava], [ranking]: "
        );

        const tempTennisPlayerData = tempTennisPlayer.split(",");

        if (!rankingSet.has(tempTennisPlayerData[3])) {
            tennisPlayers.push({
                firstName: tempTennisPlayerData[0].trim(),
                lastName: tempTennisPlayerData[1].trim(),
                country: tempTennisPlayerData[2].trim(),
                ranking: parseInt(tempTennisPlayerData[3]),
            });
            rankingSet.add(tempTennisPlayerData[3]);
        } else {
            console.log("\nGRESKA -- uneti rang vec postoji");
            i--;
        }
    }
    tennisPlayers.sort(sortByRanking);
    return tennisPlayers;
}

/**
 * Used to choose which type of input is utilised in parsing the information to an array.
 */
function fileOrConsole() {
    let consoleOrFile = readlineSync.question("\nUnesite 'file' ili 'console' u zavisnosti kako ucitavate igrace (CASE SENSITIVE!): ");
    let tennisPlayers = [];

    while (true) {
        if (consoleOrFile === "file") {
            tennisPlayers = loadPlayersFromFile();

            if (checkForEmptyPlayerList(tennisPlayers)) {
                continue;
            }
            break;

        } else if (consoleOrFile === "console") {
            tennisPlayers = loadPlayersFromConsole();

            if (checkForEmptyPlayerList(tennisPlayers)) {
                continue;
            }

            break;
        } else {
            consoleOrFile = readlineSync.question("\nGRESKA -- pogresan unos probajte ponovo: ");
        }
    }

    function checkForEmptyPlayerList(tennisPlayers) {
        if (tennisPlayers === null || tennisPlayers.length === 0) {
            readlineSync.question("\nGRESKA -- prazan file ili lista, ispravite i probajte opet");
            return 1;
        }
        return 0;
    }

    return tennisPlayers;
}

function sortByRanking(a, b) {
    return a.ranking - b.ranking;
}

module.exports = {
    fileOrConsole,
}
