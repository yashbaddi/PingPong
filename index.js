import { linearAnimate } from "./Components/pingpongBall.js";
import { isOverlapping, pingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = pingpongBar();

const ball = createDOMElement("div", ["ball"], [], {});

const intervalID = linearAnimate(ball);
// isOverlapping(bar, ball);
app.append(bar, ball);

function isBallSmashed(bar, ball) {
  if (!isOverlapping(bar, ball)) {
    return false;
  }
  return true;
}
