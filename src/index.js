import "./style.css";
import {
  player1,
  player2,
  placeships,
  player1ships,
  player2ships,
  player1board,
  player2board,
} from "./modules/gameloop";
import { display, displayGrid, displayShip } from "./modules/dom";

//may have to refactor my placeships function

displayGrid(player1);
displayGrid(player2);
placeships(player1ships, player1board);
placeships(player2ships, player2board);
displayShip();
//console.log(player2board);
console.log(player1board);
