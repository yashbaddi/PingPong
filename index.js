import { gameOver } from "./Components/gameOver.js";
import { isOverlapping, linearAnimate } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = createPingpongBar();

const ball = createDOMElement("div", ["ball"], [], {});

const intervalID = linearAnimate(ball);
app.append(bar, ball);
// gameHandler(bar, ball, intervalID, app);

// function gameHandler(bar, ball, intervalID, app) {
//   const bottom = parseInt(window.getComputedStyle(ball).bottom);
//   if (bottom <= 10 && !isOverlapping(bar, ball)) {
//     clearInterval(intervalID);
//     app.append(gameOver());
//   }
//   return true;
// }
