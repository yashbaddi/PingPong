// import WebSocket from "ws";

import { GameOverDOM } from "../../Components/gameOver.js";
import {
  animateBall,
  createPingpongBall,
  setBall,
} from "../../Components/pingpongBall.js";
import { createPingpongBar, setBar } from "../../Components/pingpongBar.js";
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
    game.isSecondPlayer = true;
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
    const responseGameBar = window.innerWidth - response.game.paddlePos;

    setBar(oppositePlayerPaddle, "oppositePlayer", responseGameBar);

    // const responseGameBall = {
    //   // pos: {
    //   //   y: window.innerHeight - response.game.ball.pos.y,
    //   //   x: window.innerWidth - response.game.ball.pos.x,
    //   // },
    //   pos: response.game.ball.pos,
    //   direction: {
    //     vertical: response.game.ball.direction.vertical * -1,
    //     horizontal: response.game.ball.direction.horizontal * -1,
    //   },
    // };
    const responseGameBall = response.game.ball;
    setBall(ball, responseGameBall);
  }

  if (response.type === "gameOver") {
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.append(GameOverDOM("You Have Won"));
  }
};

export default wsClient;
