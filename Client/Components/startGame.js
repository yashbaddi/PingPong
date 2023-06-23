import { createDOMElement } from "../Services/createDOMElement.js";
import { gameClosoure } from "../index.js";
import { ballAnimate, resetBall } from "./pingpongBall.js";
import { resetBar } from "./pingpongBar.js";

export function startGame(app, bar, ball) {
  const gameMessage = createDOMElement(
    "p",
    ["message", "game-create__message"],
    [],
    {
      textContent: "Ping Pong",
    }
  );

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
      textContent: "Join Game",
    }
  );
  const popupBox = createDOMElement(
    "div",
    ["popup"],
    [gameMessage, gameCreateBtn, gameJoinButton]
  );

  gameCreateBtn.addEventListener(
    "click",
    setGame.bind(null, popupBox, app, bar, ball)
  );
  gameCreateBtn.addEventListener("click", joinGame.bind(null, app, bar, ball));

  return popupBox;
}

export function setGame(box, app, bar, ball) {
  box.remove();
  resetBar(bar);
  resetBall(ball);
  const bottomHandler = gameClosoure(app, bar, ball);
  ballAnimate(ball, bottomHandler);
}

function joinGame() {}
