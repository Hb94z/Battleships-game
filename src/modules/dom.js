import shipFactory from "./ships";
import gameBoard from "./gameboard";
import player from "./player";
import {
  player1,
  player2,
  player1board,
  player2board,
  player1ships,
  player2ships,
  placeships,
  checkWinner,
  resetWinner,
  resetGameboards,
} from "./gameloop";

const p1BoardDiv = document.querySelector(".player1-grid");
const p2BoardDiv = document.querySelector(".player2-grid");
const messageBox = document.querySelector(".info-box");
const button = document.getElementById("action-button");
const filler = document.querySelectorAll(".overlay");
const restartButton = document.getElementById("restart-button");

const displayGrid = (player) => {
  let boardDiv = player.playerName === "player1" ? p1BoardDiv : p2BoardDiv;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const boardGrid = document.createElement("div");
      if (player.playerName === "player2") {
        boardGrid.className = "grid-cell";
      } else {
        boardGrid.className = "grid-cell";
      }
      boardGrid.setAttribute("data-row", x);
      boardGrid.setAttribute("data-col", y);
      if (player.playerName === "player2") {
        boardGrid.addEventListener("click", () => {
          attackShip(player1, [x, y]);

          setTimeout(() => {
            attackShip(player2);
          }, 500);
        });
      }
      boardDiv.appendChild(boardGrid);
    }
  }
};

const displayShip = () => {
  let boardToDisplay = p1BoardDiv;
  let gameboard = player1board;

  for (let x = 0; x < gameboard.board.length; x++) {
    for (let y = 0; y < gameboard.board.length; y++) {
      if (gameboard.board[x][y].ship !== null) {
        const coordinateDisplay = boardToDisplay.querySelector(
          `[data-row="${x}"][data-col="${y}"]`
        );
        coordinateDisplay.classList.add("ship");
      }
    }
  }
};

const attackShip = (player, coordinate) => {
  let boardDiv, attackedBoard;

  if (player.playerName === "player1") {
    boardDiv = p2BoardDiv;
    attackedBoard = player2board;
  } else if (player.playerName === "player2") {
    boardDiv = p1BoardDiv;
    attackedBoard = player1board;
  }
  if (checkWinner()) return;
  console.log(checkWinner());

  let attackStatus, message;
  if (player.playerName === "player1") {
    attackStatus = player.attack(coordinate, attackedBoard);
    console.log(attackStatus); //reports false if hit twice on same
    message = "Computer Turn";
  } else if (player.playerName === "player2") {
    let comAttack = player.computerAttack(attackedBoard);
    //error should be handled here for computer
    attackStatus = comAttack.resultOfAttack;
    coordinate = comAttack.coordinate;
    console.log(attackStatus + "after returning" + coordinate);

    message = "Your Turn";
  }

  displayAttackedCoordinate(boardDiv, coordinate, attackStatus);
  updateMessage(message);

  let winner = checkWinner();
  if (winner) {
    updateMessage(winner);
  }
};

const displayAttackedCoordinate = (boardDiv, coordinate, attackStatus) => {
  let x = coordinate[0];
  let y = coordinate[1];

  let coordinateDiv = boardDiv.querySelector(
    `[data-row="${x}"][data-col="${y}"]`
  );
  let bulletDiv = document.createElement("div");
  bulletDiv.className = "bullet";
  coordinateDiv.appendChild(bulletDiv);

  if (attackStatus === "hit") {
    coordinateDiv.classList.add("hit");
    coordinateDiv.classList.remove("ship");
  }
  coordinateDiv.classList.add("remove-pointer");
};
const updateMessage = (message) => {
  messageBox.innerHTML = message;
};
const startGame = () => {
  filler.forEach((element) => {
    element.remove();
  });
  button.remove();
  restartButton.addEventListener("click", restart);
  updateMessage("Your Turn");
};
const restart = () => {
  p1BoardDiv.innerHTML = "";
  p2BoardDiv.innerHTML = "";
  updateMessage("Your Turn");
  resetGameboards();
  resetWinner();
  displayGrid(player1);
  displayGrid(player2);
  placeships(player1ships, player1board);
  placeships(player2ships, player2board);
  displayShip();
};
button.addEventListener("click", startGame);

export { displayGrid, displayShip };
