import { createDOMElement } from "../Utils/createDOMElement.js";
import { setGame } from "./StartGame.js";

export function GameOverDOM(message) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.append(gameOverPopupBox(message));
}

function gameOverPopupBox(message) {
  const gameMessage = createDOMElement(
    "p",
    ["message", "game-over__message"],
    [],
    {
      textContent: message,
    }
  );
  const popupBox = createDOMElement("div", ["popup"], [gameMessage]);

  return popupBox;
}
