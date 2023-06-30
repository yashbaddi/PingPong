// import WebSocket from "ws";

import { GameOverDOM } from "../../Components/gameOver.js";
import {
  animateBall,
  createPingpongBall,
  setBall,
  setInitalBallDirections,
} from "../../Components/pingpongBall.js";
import {
  createPingpongPaddle,
  setPaddle,
} from "../../Components/pingpongPaddle.js";
import { game } from "../../Store/gameStatus.js";
import { updatePaddlePos } from "./requests.js";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID, oppositePlayerID;

let firstPersonPaddle, secondPersonPaddle, ball;

wsClient.onopen = (ws) => {
  console.log("Connection Sucess");
};

wsClient.onmessage = (message) => {
  const response = JSON.parse(message.data.toString());
  console.log(response);

  if (response.method === "open") {
    clientID = response.clientID;
  }

  if (response.method === "create") {
    gameID = response.gameID;
    firstPersonPaddle = createPingpongPaddle();
    game.isMainPlayer = true;
  }

  if (response.method === "join") {
    gameID = response.gameID;
    firstPersonPaddle = createPingpongPaddle();
  }

  if (response.method === "play") {
    const app = document.getElementById("app");
    app.innerHTML = "";

    oppositePlayerID = Object.values(response.game.players).filter(
      (player) => player !== clientID
    );
    secondPersonPaddle = createPingpongPaddle("top");
    ball = createPingpongBall();
    app.append(firstPersonPaddle, secondPersonPaddle, ball);
    setInitalBallDirections();
    animateBall(ball);
    updatePaddlePos();
  }

  if (response.method === "updatePaddleState") {
    const responseGamePaddle = window.innerWidth - response.paddle;

    setPaddle(secondPersonPaddle, "secondPersonPaddlePos", responseGamePaddle);
  }

  if (response.method === "updateBallState") {
    // const responseGameBall = response.ball;
    const responseGameBall = {
      pos: {
        y: window.innerHeight - response.ball.pos.y,
        x: window.innerWidth - response.ball.pos.x,
      },
      direction: {
        vertical: response.ball.direction.vertical * -1,
        horizontal: response.ball.direction.horizontal * -1,
      },
    };
    if (game.isMainPlayer === false) setBall(ball, responseGameBall);
  }

  if (response.method === "gameOver") {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.append(GameOverDOM("You Have Won"));
  }
};

export default wsClient;
