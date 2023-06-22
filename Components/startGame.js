import { createDOMElement } from "../Services/createDOMElement.js";
import { gameClosoure } from "../index.js";

export function startGame(app, bar, ball) {
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
    [gameMessage, gameCreateBtn, gameCreateBtn]
  );

  gameCreateBtn.addEventListener("click", setGame.bind(null, app, bar, ball));
  gameCreateBtn.addEventListener("click", joinGame.bind(null, app, bar, ball));

  return popupBox;
}

export function setGame(app, bar, ball) {
  resetBar(bar);
  resetBall(ball);
  const bottomHandler = gameClosoure(app, mainBar, ball);
  ballAnimate(ball, bottomHandler);
}

function joinGame() {}
