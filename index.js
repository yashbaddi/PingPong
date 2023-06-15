import { isOverlapping, linearAnimate } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = createPingpongBar();

const ball = createDOMElement("div", ["ball"], [], {});

const intervalID = linearAnimate(ball);
// isOverlapping(bar, ball);
app.append(bar, ball);

function gameHandler(bar, ball, intervalID) {
  const bottom = parseInt(window.getComputedStyle(ball).bottom);
  if (bottom <= 10 && !isOverlapping(bar, ball)) {
    clearInterval(intervalID);
  }
  return true;
}
