import { createDOMElement } from "../Services/createDOMElement.js";
import { updateBarPos } from "../Services/Socket/requests.js";

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
    console.log(event.target.style);

    event.target.style.left = parseInt(computedStyle.left || 0) - 50 + "px";
    updateBarPos(event.target.style.left);
  }
  if (event.key === "ArrowRight" && parseInt(computedStyle.right) >= 0) {
    event.target.style.left = parseInt(computedStyle.left || 0) + 50 + "px";
    updateBarPos(event.target.style.left);
  }
}

function barMouseEvent(event) {
  const bar = event.target;
  function onMouseMove(event) {
    bar.style.left = event.pageX + "px";
    console.log(bar.style.left);
    updateBarPos(bar.style.left);
  }
  document.addEventListener("mousemove", onMouseMove);
  bar.addEventListener("mouseup", (event) => {
    document.removeEventListener("mousemove", onMouseMove);
  });
}

export function resetBar(bar) {
  bar.style.left = "50%";
}

export function setBar(bar, positionX) {
  bar.style.left = positionX;
}
