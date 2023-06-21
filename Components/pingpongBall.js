import { createDOMElement } from "../Services/createDOMElement.js";

export function createBall() {
  const ball = createDOMElement("circle", ["ball"], [], {});
  ball.setAttribute("cx", "0");
  ball.setAttribute("cy", "0");
  ball.setAttribute("r", "30");
  return ball;
}
