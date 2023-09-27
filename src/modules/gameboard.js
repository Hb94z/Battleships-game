const shipFactoryy = require("./ships");

const gameBoard = () => {
  //array of a grid 10x10. so 100 large

  let board = Array(10)
    .fill()
    .map(() =>
      Array(10)
        .fill()
        .map(() => ({ ship: null, attackedStatus: false }))
    );
  let ships = [];

  const placeShipRandomly = function placeShipRandomly(ship) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let coordinate = [x, y];
    let axis = Math.random() < 0.5 ? "x" : "y";
    return placeShip(ship, coordinate, axis);
  };

  const placeShip = function placeShip(ship, coordinate, axis = "x") {
    let x = coordinate[0];
    let y = coordinate[1];

    //Return if the coordinate is beyond the board and not empty
    if (axis === "x") {
      if (y + ship.length - 1 > 9) return false;

      let tempY = y;
      for (let i = 0; i < ship.length; i++) {
        if (board[x][tempY].ship !== null) return false;
        tempY++;
      }
    } else {
      if (x + ship.length - 1 > 9) return false;

      let tempX = x;
      for (let i = 0; i < ship.length; i++) {
        if (board[tempX][y].ship !== null) return false;
        tempX++;
      }
    }

    //Place the ships according to the axis
    if (axis === "x") {
      for (let i = 0; i < ship.length; i++) {
        board[x][y].ship = ship;

        y++;
      }
    } else if (axis === "y") {
      for (let i = 0; i < ship.length; i++) {
        board[x][y].ship = ship;

        x++;
      }
    }
    ships.push(ship);
    return true;
  };

  const receiveAttack = function receiveAttack(coordinate) {
    //this takes coordinates. it may have to change to taking x and y once dom and gameloop are attempted with player object too.
    let x = coordinate[0];
    let y = coordinate[1];
    if (board[x][y].attackedStatus) return false;

    board[x][y].attackedStatus = true;

    if (board[x][y].ship !== null) {
      board[x][y].ship.hit();

      return "hit";
    }
    return "miss";
  };
  const allSunk = function allSunk() {
    return ships.every((ship) => ship.isSunk() === true);
  };

  return {
    board,
    ships,
    placeShip,
    placeShipRandomly,
    receiveAttack,
    allSunk,
  };
};

module.exports = gameBoard;
