import { createDOMElement } from "../Services/createDOMElement.js";

export function gameOver() {
  const gameResetBtn = createDOMElement("button", ["game-over__button"], [], {
    textContent: "Reset Game",
  });
  const gameMessage = createDOMElement("p", ["game-over__message"], [], {
    textContent: "Game Over",
  });
  const popupBox = createDOMElement(
    "div",
    ["game-over"],
    [gameMessage, gameResetBtn]
  );

  gameResetBtn.addEventListener("click", resetGame.bind(null, popupBox));

  return popupBox;
}

function resetGame(box) {
  box.remove();
}
