import gameBoard from "./gameboard";
import shipFactory from "./ships";
import player from "./player";

let player1 = player("player1");
let player2 = player("player2");
let player1board = gameBoard();
let player2board = gameBoard();
let winner = null;

const ships = () => {
  return [
    shipFactory("carrier", 5),
    shipFactory("battleship", 4),
    shipFactory("destroyer", 3),
    shipFactory("submarine", 3),
    shipFactory("Patrol", 2),
  ];
};

let player1ships = ships();
let player2ships = ships();

const placeships = function placeships(playerships, playerboard) {
  playerships.forEach((ship) => {
    let shipPlaced = playerboard.placeShipRandomly(ship);
    while (!shipPlaced) {
      shipPlaced = playerboard.placeShipRandomly(ship);
    }
  });
};

const checkWinner = () => {
  if (player1board.allSunk()) winner = "Computer wins";
  else if (player2board.allSunk()) winner = "Player wins";
  return winner;
};

const resetGameboards = () => {
  player1board = gameBoard();
  player2board = gameBoard();
  player1ships = ships();
  player2ships = ships();
};

const resetWinner = () => {
  winner = null;
};

export {
  ships,
  player1board,
  player2board,
  player1,
  player2,
  player1ships,
  player2ships,
  placeships,
  checkWinner,
  resetWinner,
  resetGameboards,
};
