import { createDOMElement } from "../Services/createDOMElement.js";
import { resetBall } from "./pingpongBall.js";
import { resetBar } from "./pingpongBar.js";

export function gameOver(intervalID, bar, ball) {
  clearInterval(intervalID);
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

  gameResetBtn.addEventListener(
    "click",
    resetGame.bind(null, popupBox, bar, ball)
  );

  return popupBox;
}

function resetGame(box, bar, ball) {
  box.remove();
  resetBar(bar);
  resetBall(ball);
}
