import { createDOMElement } from "../utils.js";

export function pingpongBar(position = "bottom") {
  const bar = createDOMElement("div", ["bar", "bar-" + position], [], {});
  if (position == "bottom") {
    bar.tabIndex = 0;
    bar.autofocus = true;
  }

  bar.addEventListener("keydown", barEventHandler);
  return bar;
}

function barEventHandler(event) {
  const computedStyle = window.getComputedStyle(event.target);
  if (event.key === "ArrowLeft" && parseInt(computedStyle.left) >= 0) {
    console.log(event.target.style);

    event.target.style.left = parseInt(computedStyle.left || 0) - 50 + "px";
  }
  if (event.key === "ArrowRight" && parseInt(computedStyle.right) >= 0) {
    event.target.style.left = parseInt(computedStyle.left || 0) + 50 + "px";
  }
}
export function isOverlapping(div1, div2) {
  const div1Computed = window.getComputedStyle(div1);
  const div2Computed = window.getComputedStyle(div2);
  return !(
    div1Computed.left > div2Computed.right ||
    div1Computed.right > div2Computed.left ||
    div1Computed.top > div2Computed.bottom ||
    div1Computed.bottom > div2Computed.top
  );
}
