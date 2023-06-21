import { createSVGElement } from "../Services/createSVGElement.js";

export function createPingpongBar(position = "bottom") {
  const bar = createSVGElement("rect", ["bar"], [], {});

  if (position == "bottom") {
    bar.tabIndex = 0;
    bar.setAttribute("x", "50%");
    bar.setAttribute("y", "93%");
    bar.autofocus = true;
    bar.addEventListener("keydown", barEventHandler);
  }
  return bar;
}

function barEventHandler(event) {
  const element = event.target;
  if (event.key === "ArrowLeft" && parseInt(element.x) >= 0) {
    console.log(event.target.style);

    event.target.style.left = parseInt(element.x || 0) - 50 + "px";
  }
  if (event.key === "ArrowRight" && parseInt(element.x) >= 0) {
    event.target.style.left = parseInt(element.x || 0) + 50 + "px";
  }
}
