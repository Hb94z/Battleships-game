function shipFactory(shipName, length) {
  let hits = 0; //send coordinates here from hit function
  return {
    get shipName() {
      return shipName;
    },
    get length() {
      return length;
    },
    get hits() {
      return hits;
    },

    isSunk: () => {
      if (hits === length) return true;
      return false;
    },
    hit: () => {
      hits++;
    },
  };
}

//hit function. take a position on the board for the click. push the hit coordinates into hits array. can then display that.
//when hits array = ship.length issunk can return,
//include
module.exports = shipFactory;
