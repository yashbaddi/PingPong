import { createDOMElement } from "../Utils/createDOMElement.js";
import { updatePaddlePos } from "../Services/Socket/requests.js";
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
  paddleDOM.style.left = window.innerWidth / 2 + "px";
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
    updatePaddlePos();
  }
  if (event.key === "ArrowRight" && parseInt(paddleDOM.right) >= 0) {
    setPaddle(
      paddleDOM,
      "firstPersonPaddlePos",
      parseInt(paddleDOM.left || 0) + 50
    );
    updatePaddlePos();
  }
}

function paddleMouseEvent(event) {
  const paddleDOM = event.target;
  function onMouseMove(event) {
    setPaddle(paddleDOM, "firstPersonPaddlePos", event.pageX);
    updatePaddlePos();
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
