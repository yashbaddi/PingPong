import { createDOMElement } from "../Services/createDOMElement.js";
import { setGame } from "./StartGame.js";

export function GameOverDOM(message) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.append(gameOverPopupBox(message));
}

function gameOverPopupBox(message) {
  // const gameResetBtn = createDOMElement(
  //   "button",
  //   ["button", "game-over__button"],
  //   [],
  //   {
  //     textContent: "Reset Game",
  //   }
  // );
  const gameMessage = createDOMElement(
    "p",
    ["message", "game-over__message"],
    [],
    {
      textContent: message,
    }
  );
  const popupBox = createDOMElement("div", ["popup"], [gameMessage]);

  // gameResetBtn.addEventListener(
  //   "click",
  //   resetGame.bind(null, popupBox, app, bar, ball)
  // );

  return popupBox;
}

function resetGame(box, app, bar, ball) {
  setGame(box, app, bar, ball);
}
