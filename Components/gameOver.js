import { createDOMElement } from "../utils";

export function gameOver() {
  const gameResetBtn = createDOMElement("button", ["game-over__button"], [], {
    textContent: "Reset Game",
  });
  const gameMessage = createDOMElement("p", ["game-over__message"], [], {
    textContent: "GameOver",
  });
  const popupBox = createDOMElement(
    "div",
    ["game-over"],
    [gameMessage, gameResetBtn]
  );

  return popupBox;
}
