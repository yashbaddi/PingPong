import { linearAnimate } from "./Components/pingpongBall.js";
import { pingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = pingpongBar();
// bar.focus();

const ball = createDOMElement("div", ["ball"], [], {});

// changeAngle(ball, 35);
linearAnimate(ball);

app.append(bar, ball);
