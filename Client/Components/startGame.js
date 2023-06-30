import { createGame, joinGame } from "../Services/Socket/requests.js";
import { createDOMElement } from "../Utils/createDOMElement.js";
import { resetPaddle } from "./pingpongPaddle.js";

export function startGameElement() {
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
    ["button", "game-create__button"],
    [],
    {
      textContent: "Create Game",
    }
  );
  const gameJoinBtn = createDOMElement(
    "button",
    ["button", "game-join__button"],
    [],
    {
      textContent: "Join Game",
    }
  );
  const popupBox = createDOMElement(
    "div",
    ["popup"],
    [gameMessage, gameCreateBtn, gameJoinBtn]
  );

  gameCreateBtn.addEventListener(
    "click",
    createGameElement.bind(null, popupBox)
  );
  gameJoinBtn.addEventListener("click", joinGameElement.bind(null, popupBox));

  return popupBox;
}

export function setGame(box, app, paddle) {
  box.remove();
  resetPaddle(paddle);
}

function joinGameElement(box) {
  box.innerHTML = "";
  const inputGameID = createDOMElement("input", ["input", "input__join"], [], {
    type: "text",
  });
  const gameJoinBtn = createDOMElement(
    "button",
    ["button,game-join__button"],
    [],
    {
      textContent: "Join Game",
    }
  );
  box.append(inputGameID, gameJoinBtn);
  gameJoinBtn.addEventListener(
    "click",
    joinGameHandler.bind(null, box, inputGameID)
  );
}

function joinGameHandler(box, input) {
  box.remove();
  joinGame(input.value);
}

function createGameElement(box) {
  box.innerHTML = "";
  const id = createGame();
  const message = createDOMElement(
    "p",
    ["message", "game-create__message"],
    [],
    {
      textContent: "Game Join ID:" + id.toString(),
    }
  );
  box.append(message);
}
