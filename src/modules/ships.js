function shipFactory(shipName, length) {
  let hits = 0;
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

module.exports = shipFactory;
