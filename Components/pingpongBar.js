import { createDOMElement } from "../Services/createDOMElement.js";

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
  }
  if (event.key === "ArrowRight" && parseInt(computedStyle.right) >= 0) {
    event.target.style.left = parseInt(computedStyle.left || 0) + 50 + "px";
  }
}

function barMouseEvent(event) {
  const bar = event.target;
  function onMouseMove(event) {
    bar.style.left = event.pageX + "px";
    console.log(event.target);
  }
  document.addEventListener("mousemove", onMouseMove);
  bar.addEventListener("mouseup", (event) => {
    document.removeEventListener("mousemove", onMouseMove);
  });
}

export function resetBar(bar) {
  bar.style.left = "50%";
}
