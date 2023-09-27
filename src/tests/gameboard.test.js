//const gameBoardMockd = require("./gameBoardMock");
import gameBoard from "../modules/gameboard";
import shipFactory from "../modules/ships";
//const shipFactoryy = require("./ships");

describe("gameBoardMock tests", () => {
  let bigBoat;
  let smallBoat;
  let gameBoardMock;
  let fakeBoard;
  beforeEach(() => {
    gameBoardMock = gameBoard();
    bigBoat = shipFactory("bigBoat", 5);
    smallBoat = shipFactory("smallBoat", 2);
  });
  test("test the width of the board", () => {
    expect(gameBoardMock.board.length).toBe(10);
  });

  test("test the height of the board", () => {
    expect(gameBoardMock.board[0].length).toBe(10);
  });

  test("place ship", () => {
    gameBoardMock.placeShip(bigBoat, [1, 2]);
    console.log(gameBoardMock.board[1][2]);
    expect(gameBoardMock.board[1][6].ship).toBe(bigBoat);
    expect(gameBoardMock.board[1][7].ship).not.toBe(bigBoat);
  });

  test("hitt ship", () => {
    gameBoardMock.placeShip(bigBoat, [1, 1]);
    gameBoardMock.receiveAttack([1, 1]);

    expect(bigBoat.hits).toEqual(1);
  });

  test("hit nothing", () => {
    gameBoardMock.placeShip(bigBoat, [1, 1]);
    gameBoardMock.receiveAttack([1, 9]);

    expect(gameBoardMock.board[1][9].attackedStatus).toBe(true);
  });

  test("sink ship", () => {
    gameBoardMock.placeShip(bigBoat, [1, 4]);
    gameBoardMock.receiveAttack([1, 8]);
    gameBoardMock.receiveAttack([1, 7]);
    gameBoardMock.receiveAttack([1, 6]);
    gameBoardMock.receiveAttack([1, 5]);
    gameBoardMock.receiveAttack([1, 4]);
    expect(bigBoat.isSunk()).toBe(true);
  });
  test("ship storage", () => {
    gameBoardMock.placeShip(bigBoat, [1, 2]);
    gameBoardMock.placeShip(smallBoat, [4, 2]);
    console.log(gameBoardMock.ships);
    expect(gameBoardMock.ships[1].shipName).toBe("smallBoat");
  });
  test("all ships sunk", () => {
    gameBoardMock.placeShip(bigBoat, [1, 4]);
    gameBoardMock.placeShip(smallBoat, [4, 2]);
    gameBoardMock.receiveAttack([1, 8]);
    gameBoardMock.receiveAttack([1, 7]);
    gameBoardMock.receiveAttack([1, 6]);
    gameBoardMock.receiveAttack([1, 5]);
    gameBoardMock.receiveAttack([1, 4]);
    gameBoardMock.receiveAttack([4, 2]);
    gameBoardMock.receiveAttack([4, 3]);

    expect(gameBoardMock.allSunk()).toBe(true);
  });
});
