import shipFactory from "../modules/ships";

describe("Test ship factory", () => {
  let bigBoat;
  beforeEach(() => {
    bigBoat = shipFactory("bigBoat", 5);
  });

  test("ship name", () => {
    expect(bigBoat.shipName).toBe("bigBoat");
  });

  test("tests the returned isSunk method with true", () => {
    bigBoat.hit();
    bigBoat.hit();
    bigBoat.hit();
    bigBoat.hit();
    bigBoat.hit();
    expect(bigBoat.isSunk()).toBe(true);
  });
  test("hit ship", () => {
    bigBoat.hit();
    bigBoat.hit();
    expect(bigBoat.hits).toEqual(2);
  });
});
