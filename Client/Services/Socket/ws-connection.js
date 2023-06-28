// import WebSocket from "ws";

import { GameOverDOM } from "../../Components/gameOver.js";
import {
  animateBall,
  createPingpongBall,
  setBall,
} from "../../Components/pingpongBall.js";
import {
  createPingpongPaddle,
  setPaddle,
} from "../../Components/pingpongPaddle.js";
import { game } from "../../Store/gameStatus.js";
import { updatePos } from "./requests.js";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID, oppositePlayerID;

let mainPlayerPaddle, oppositePlayerPaddle, ball;

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
    mainPlayerPaddle = createPingpongPaddle();
  }

  if (response.method === "join") {
    gameID = response.gameID;
    mainPlayerPaddle = createPingpongPaddle();
    game.isSecondPlayer = true;
  }

  if (response.method === "play") {
    const app = document.getElementById("app");
    app.innerHTML = "";

    oppositePlayerID = Object.values(response.game.players).filter(
      (player) => player !== clientID
    );
    oppositePlayerPaddle = createPingpongPaddle("top");
    ball = createPingpongBall();
    animateBall(ball);

    app.append(mainPlayerPaddle, oppositePlayerPaddle, ball);
  }

  if (response.method === "updateState") {
    const responseGameBar = window.innerWidth - response.game.paddlePos;

    setPaddle(oppositePlayerPaddle, "oppositePlayer", responseGameBar);

    const responseGameBall = response.game.ball;
    if (game.isSecondPlayer === true) setBall(ball, responseGameBall);
  }

  if (response.method === "gameOver") {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.append(GameOverDOM("You Have Won"));
  }
};

export default wsClient;
