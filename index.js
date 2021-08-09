const {fileOrConsole} = require('./fileParser');
const {playoff, qualifiers} = require('./gameSimulator');

const main = () => {
    let tennisPlayers = fileOrConsole();
    playoff(qualifiers(tennisPlayers), 1);
};

main();
