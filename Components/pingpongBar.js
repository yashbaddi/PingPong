import { createDOMElement } from "../utils.js";

export function pingpongBar(position = "bottom") {
  const bar = createDOMElement("div", ["bar", "bar-" + position], [], {});
  if (position == "bottom") {
    bar.tabIndex = 0;
    bar.autofocus = true;
  }

  bar.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      console.log(event.target.style);

      //   event.target.style.left =
      //     parseInt(event.target.style.left || 0) + 1 + "rem";
    }
    if (event.key === "ArrowRight") {
    }
  });
  return bar;
}
