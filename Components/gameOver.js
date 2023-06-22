import { createDOMElement } from "../Services/createDOMElement.js";
import { startGame } from "../index.js";
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
  const gameMessage = createDOMElement("p", ["game-over__message"], [], {
    textContent: "Game Over",
  });
  const popupBox = createDOMElement(
    "div",
    ["game-over"],
    [gameMessage, gameResetBtn]
  );

  gameResetBtn.addEventListener(
    "click",
    resetGame.bind(null, popupBox, app, bar, ball)
  );

  return popupBox;
}

function resetGame(box, app, bar, ball) {
  box.remove();
  resetBar(bar);
  resetBall(ball);
  startGame(app, bar, ball);
}
