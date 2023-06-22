import { createDOMElement } from "../Services/createDOMElement.js";
import { startGame } from "../index.js";

export function startGame(intervalID, app, bar, ball) {
  const gameMessage = createDOMElement("p", ["game-create__message"], [], {
    textContent: "Ping Pong",
  });

  const gameCreateBtn = createDOMElement(
    "button",
    ["button,game-create__button"],
    [],
    {
      textContent: "Create Game",
    }
  );
  const gameJoinButton = createDOMElement(
    "button",
    ["button,game-join__button"],
    [],
    {
      textContent: "Create Game",
    }
  );
  const popupBox = createDOMElement(
    "div",
    ["start-game"],
    [gameMessage, gameCreateBtn, gameJoinButton]
  );

  gameResetBtn.addEventListener("click", resetGame.bind(null, app, bar, ball));

  return popupBox;
}

export function setGame(app, bar, ball) {
  resetBar(bar);
  resetBall(ball);
  startGame(app, bar, ball);
}