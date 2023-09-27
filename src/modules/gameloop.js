import gameBoard from "./gameboard";
import shipFactory from "./ships";
import player from "./player";

const player1 = player("player1");
const player2 = player("player2");
const player1board = gameBoard();
const player2board = gameBoard();
const ships = () => {
  return;
  [
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
      shipPlaced = playerboard.placeShip(ship);
    }
  });
};

const checkWinner = () => {
  if (player1Board.allSunk()) winner = "Computer";
  else if (player2Board.allSunk()) winner = "Player";
  return winner;
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
};
