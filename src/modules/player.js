const gameBoard = require("./gameboard");
const shipFactory = require("./ships");

const player = (name) => {
  const playerName = name;
  const attack = function attack(coordinate, gameboard) {
    return gameboard.receiveAttack(coordinate);
  };

  const computerAttack = (gameboard) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let coordinate = [x, y];

    let resultOfAttack = gameboard.receiveAttack(coordinate);
    console.log(resultOfAttack + "before wile loop" + coordinate);
    while (resultOfAttack === false) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      coordinate = [x, y];
      console.log("attempting again in while loop");
      resultOfAttack = gameboard.receiveAttack(coordinate);
    }
    console.log(resultOfAttack + "after while loop" + coordinate);
    return { coordinate, resultOfAttack };
  };

  return {
    attack,
    computerAttack,
    playerName,
  };
};

module.exports = player;
