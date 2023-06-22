import { gameOver } from "./Components/gameOver.js";
import { ballAnimate, createPingpongBall } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { isOverlapping } from "./Services/isOverlapping.js";

const app = document.getElementById("app");

const mainBar = createPingpongBar();
const oppositePlayer = createPingpongBar("top");

const ball = createPingpongBall();
startGame(app, mainBar, ball);

export function startGame(app, mainBar, ball) {
  const bottomHandler = gameClosoure(app, mainBar, ball);
  ballAnimate(ball, bottomHandler);
}

app.append(mainBar, oppositePlayer, ball);

function gameClosoure(app, bar, ball) {
  return function (direction, intervalID) {
    if (!isOverlapping(bar, ball)) {
      console.log("GAME OVER");
      app.append(gameOver(intervalID, app, bar, ball));
    } else {
      direction.horizontal = -1;
    }
  };
}
