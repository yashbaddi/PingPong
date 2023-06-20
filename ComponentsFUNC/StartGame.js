import { createPingpongBar } from "./Components/pingpongBar.js";
import { linearAnimate } from "./Services/linearAnimate.js";
import { createDOMElement } from "../Services/createDOMElement.js";

export function startGameComponent() {
  const gameStartBtn = createDOMElement("button", ["game-over__button"], [], {
    textContent: "Start Game",
  });
  const gameMessage = createDOMElement("p", ["game-over__message"], [], {
    textContent: "Ping Pong",
  });
  const popupBox = createDOMElement(
    "div",
    ["game-over"],
    [gameMessage, gameResetBtn]
  );

  gameResetBtn.addEventListener("click", startGame.bind(null, popupBox));

  return popupBox;
}

function startGame(box, bar, ball) {
  box.remove();
}
