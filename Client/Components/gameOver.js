import { createDOMElement } from "../Services/createDOMElement.js";
import { setGame } from "./StartGame.js";
import { resetBall } from "./pingpongBall.js";
import { resetBar } from "./pingpongBar.js";

export function gameOver(intervalID, app, bar, ball) {
  clearInterval(intervalID);
  const gameResetBtn = createDOMElement(
    "button",
    ["button", "game-over__button"],
    [],
    {
      textContent: "Reset Game",
    }
  );
  const gameMessage = createDOMElement(
    "p",
    ["message", "game-over__message"],
    [],
    {
      textContent: "Game Over",
    }
  );
  const popupBox = createDOMElement(
    "div",
    ["popup"],
    [gameMessage, gameResetBtn]
  );

  gameResetBtn.addEventListener(
    "click",
    resetGame.bind(null, popupBox, app, bar, ball)
  );

  return popupBox;
}

function resetGame(box, app, bar, ball) {
  setGame(box, app, bar, ball);
}
