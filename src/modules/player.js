const gameBoard = require("./gameboard");
const shipFactory = require("./ships");

const player = (name) => {
  const playerName = name;
  const attack = function attack(coordinate, gameboard) {
    //this takes coordinates. it may have to change to taking x and y once dom and gameloop are attempted.
    //let x = coordinate[0];
    //let y = coordinate[1];
    return gameboard.receiveAttack(coordinate);
  };

  const computerAttack = (gameboard) => {
    let x = Math.floor(Math.random() * 10 + 1);
    let y = Math.floor(Math.random() * 10 + 1);
    let coordinates = [x, y];
    return gameboard.receiveAttack(coordinates);
    //this function is not working sometimes in regards to random ship attack test
    //random coordinates withing the 10x10 limitation
  };

  return {
    attack,
    computerAttack,
  };
};

module.exports = player;
