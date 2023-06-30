import { GameOverDOM } from "../../Components/gameOver.js";
import { game } from "../../Store/gameStatus.js";
import wsClient from "./ws-connection.js";
import { clientID, gameID } from "./ws-connection.js";

export function createGame() {
  const payload = {
    method: "create",
    clientID: clientID,
  };
  wsClient.send(JSON.stringify(payload));
}

export function joinGame(id) {
  const payload = {
    method: "join",
    clientID: clientID,
    gameID: id,
  };
  wsClient.send(JSON.stringify(payload));
}

export function updatePaddlePos() {
  const payload = {
    method: "updatePaddlePos",
    clientID: clientID,
    gameID: gameID,
    paddle: game.paddle.firstPersonPaddlePos,
  };
  wsClient.send(JSON.stringify(payload));
}

export function updateBallPos() {
  const payload = {
    method: "updateBallPos",
    clientID: clientID,
    gameID: gameID,
    ball: game.ball,
  };
  wsClient.send(JSON.stringify(payload));
}

export function gameOver() {
  GameOverDOM("You Have Lost");
  game.isGameOver = true;
  const payload = {
    method: "gameOver",
    clientID: clientID,
    gameID: gameID,
  };
  wsClient.send(JSON.stringify(payload));
}
