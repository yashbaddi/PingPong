import { createDOMElement } from "../Services/createDOMElement.js";
import { updatePos } from "../Services/Socket/requests.js";
import { game } from "../Store/gameStatus.js";

export function createPingpongPaddle(position = "bottom") {
  const paddleDOM = createDOMElement(
    "div",
    ["paddle", "paddle-" + position],
    [],
    {}
  );
  if (position == "bottom") {
    paddleDOM.tabIndex = 0;
    paddleDOM.autofocus = true;
    paddleDOM.addEventListener("keydown", paddleKeyEvent);
    paddleDOM.addEventListener("mousedown", paddleMouseEvent);
  }
  return paddleDOM;
}

function paddleKeyEvent(event) {
  const paddleDOM = window.getComputedStyle(event.target);
  if (event.key === "ArrowLeft" && parseInt(paddleDOM.left) >= 0) {
    setPaddle(
      paddleDOM,
      "firstPersonPaddlePos",
      parseInt(paddleDOM.left || 0) - 50
    );
    updatePos();
  }
  if (event.key === "ArrowRight" && parseInt(paddleDOM.right) >= 0) {
    setPaddle(
      paddleDOM,
      "firstPersonPaddlePos",
      parseInt(paddleDOM.left || 0) + 50
    );
    updatePos();
  }
}

function paddleMouseEvent(event) {
  const paddleDOM = event.target;
  function onMouseMove(event) {
    setPaddle(paddleDOM, "firstPersonPaddlePos", event.pageX);
    updatePos();
  }
  document.addEventListener("mousemove", onMouseMove);
  paddleDOM.addEventListener("mouseup", (event) => {
    document.removeEventListener("mousemove", onMouseMove);
  });
}

export function resetPaddle(paddle) {
  paddle.style.left = "50%";
}

export function setPaddle(paddleDOM, player, positionX) {
  game.paddle[player] = positionX;
  paddleDOM.style.left = game.paddle[player] + "px";
}
