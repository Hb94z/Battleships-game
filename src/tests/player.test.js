import player from "../modules/player";
import shipFactory from "../modules/ships";
import gameBoard from "../modules/gameboard";

describe("player tests", () => {
  let bigBoat;
  let smallBoat;
  let playerBoard;
  let compBoard;
  let player1;
  let computerPlayer;
  beforeEach(() => {
    playerBoard = gameBoard();
    compBoard = gameBoard();
    player1 = player("player1");
    computerPlayer = player("computer");

    bigBoat = shipFactory("bigBoat", 5);
    smallBoat = shipFactory("smallBoat", 2);
  });

  test("attack ship", () => {
    playerBoard.placeShip(bigBoat, [1, 4]);
    computerPlayer.attack([1, 4], playerBoard);

    expect(playerBoard.board[1][4].attackedStatus).toBe(true);
  });
  test("name call ", () => {
    expect(player1.playerName).toBe("player1");
  });

  test("hit twice same place ", () => {
    playerBoard.placeShip(bigBoat, [1, 4]);
    computerPlayer.attack([1, 4], playerBoard);

    expect(computerPlayer.attack([1, 4], playerBoard)).toBe(false);
  });
  test("attack ship randomly", () => {
    // add some ships here to test for a hit, otherwise a miss will always occur. player object arguments modified to get
    //this test working.

    expect(computerPlayer.computerAttack(playerBoard).resultOfAttack).toBe(
      "miss"
    );
  });
});
