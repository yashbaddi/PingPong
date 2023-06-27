import { createDOMElement } from "../Services/createDOMElement.js";
import { updateBarPos, updatePos } from "../Services/Socket/requests.js";
import { game } from "../store/gameStatus.js";

export function createPingpongBar(position = "bottom") {
  const bar = createDOMElement("div", ["bar", "bar-" + position], [], {});
  if (position == "bottom") {
    bar.tabIndex = 0;
    bar.autofocus = true;
    bar.addEventListener("keydown", barKeyEvent);
    bar.addEventListener("mousedown", barMouseEvent);
  }
  return bar;
}

function barKeyEvent(event) {
  const computedStyle = window.getComputedStyle(event.target);
  if (event.key === "ArrowLeft" && parseInt(computedStyle.left) >= 0) {
    game.paddle.mainPaddle = parseInt(computedStyle.left || 0) - 50;
    event.target.style.left = game.paddle.mainPaddle + "px";
    updatePos();
  }
  if (event.key === "ArrowRight" && parseInt(computedStyle.right) >= 0) {
    game.paddle.mainPaddle = parseInt(computedStyle.left || 0) + 50;
    event.target.style.left = game.paddle.mainPaddle + "px";
    updatePos();
  }
}

function barMouseEvent(event) {
  const bar = event.target;
  function onMouseMove(event) {
    game.paddle.mainPaddle = event.pageX;
    bar.style.left = game.paddle.mainPaddle + "px";
    updatePos();
  }
  document.addEventListener("mousemove", onMouseMove);
  bar.addEventListener("mouseup", (event) => {
    document.removeEventListener("mousemove", onMouseMove);
  });
}

export function resetBar(bar) {
  bar.style.left = "50%";
}

export function setBar(bar, player, positionX) {
  game.paddle[player] = positionX;
  bar.style.left = game.paddle[player] + "px";
}
