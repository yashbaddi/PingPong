import { gameOver } from "./Components/gameOver.js";
import { ballAnimate, createPingpongBall } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { isOverlapping } from "./Services/isOverlapping.js";

const app = document.getElementById("app");

const bar = createPingpongBar();

const ball = createPingpongBall();

const gameHandler = gameClosoure(app, bar, ball);
ballAnimate(ball, gameHandler);

app.append(bar, ball);

function gameClosoure(app, bar, ball) {
  return function (direction, intervalID) {
    if (!isOverlapping(bar, ball)) {
      console.log("GAME OVER");
      app.append(gameOver(intervalID, bar, ball));
    } else {
      direction.horizontal = -1;
    }
  };
}
