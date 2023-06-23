import { ballAnimate, createPingpongBall } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { startGameElement } from "./Components/StartGame.js";

const app = document.getElementById("app");

const mainBar = createPingpongBar();
const oppositePlayer = createPingpongBar("top");

const ball = createPingpongBall();
const start = startGameElement();

// export function startGame(app, mainBar, ball) {
//   const bottomHandler = gameClosoure(app, mainBar, ball);
//   ballAnimate(ball, bottomHandler);
// }

app.append(mainBar, start, oppositePlayer);

// export function gameClosoure(app, bar, ball) {
//   return function (direction, intervalID) {
//     if (!isOverlapping(bar, ball)) {
//       console.log("GAME OVER");
//       app.append(gameOver(intervalID, app, bar, ball));
//     } else {
//       direction.horizontal = -1;
//     }
//   };
// }
