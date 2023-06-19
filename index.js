import { gameOver } from "./Components/gameOver.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./Services/createDOMElement.js";
import { isOverlapping } from "./Services/isOverlapping.js";
import { linearAnimate } from "./Services/linearAnimate.js";

const app = document.getElementById("app");

const bar = createPingpongBar();

const ball = createDOMElement("div", ["ball"], [], {});

const gameHandler = gameClosoure(app, bar, ball);
linearAnimate(ball, gameHandler);

app.append(bar, ball);

function gameClosoure(app, bar, ball) {
  return function (direction, intervalID) {
    if (!isOverlapping(bar, ball)) {
      console.log("GAME OVER");
      clearInterval(intervalID);
      app.append(gameOver());
    } else {
      direction.horizontal = -1;
    }
  };
}
