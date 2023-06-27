// import WebSocket from "ws";

import {
  animateBall,
  createPingpongBall,
  setBall,
} from "../../Components/pingpongBall.js";
import { createPingpongBar, setBar } from "../../Components/pingpongBar.js";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID, oppositePlayerID;

let mainPlayerPaddle, oppositePlayerPaddle, ballDOM;

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
    ballDOM = createPingpongBall();
    app.append(mainPlayerPaddle, oppositePlayerPaddle, ballDOM);
  }

  if (response.type === "updateState") {
    const game = response.game;

    setBar(oppositePlayerPaddle, game[oppositePlayerID]);
    setBall(ballDOM, game.ball);
    animateBall(ballDOM);
  }

  if (response.type === "over") {
  }
};

export default wsClient;
