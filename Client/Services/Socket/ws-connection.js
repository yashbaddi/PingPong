// import WebSocket from "ws";

import { GameOverDOM, gameOverDOM } from "../../Components/gameOver.js";
import {
  animateBall,
  createPingpongBall,
  setBall,
} from "../../Components/pingpongBall.js";
import { createPingpongBar, setBar } from "../../Components/pingpongBar.js";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID, oppositePlayerID;

let mainPlayerPaddle, oppositePlayerPaddle, ball;

wsClient.onopen = (ws) => {
  console.log("Connection Sucess");
};

wsClient.onmessage = (message) => {
  const response = JSON.parse(message.data.toString());
  console.log(response);
  if (response.type === "open") {
    clientID = response.clientID;
  }
  if (response.type === "create") {
    gameID = response.gameID;
    mainPlayerPaddle = createPingpongBar();
  }

  if (response.type === "join") {
    gameID = response.gameID;
    mainPlayerPaddle = createPingpongBar();
  }

  if (response.type === "play") {
    const app = document.getElementById("app");
    app.innerHTML = "";

    oppositePlayerID = Object.values(response.game.players).filter(
      (player) => player !== clientID
    );
    oppositePlayerPaddle = createPingpongBar("top");
    ball = createPingpongBall();
    animateBall(ball);

    app.append(mainPlayerPaddle, oppositePlayerPaddle, ball);
  }

  if (response.type === "updateState") {
    const responseGame = response.game;

    setBar(oppositePlayerPaddle, "oppositePlayer", responseGame.paddlePos);
    setBall(ball, responseGame.ball);
  }

  if (response.type === "gameOver") {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.append(GameOverDOM("You Have Won"));
  }
};

export default wsClient;
