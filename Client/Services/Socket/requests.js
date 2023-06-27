import { game } from "../../store/gameStatus.js";
import wsClient from "./ws-connection.js";
import { clientID, gameID } from "./ws-connection.js";

export function createGame() {
  const payload = {
    type: "create",
    clientID: clientID,
  };
  wsClient.send(JSON.stringify(payload));
}

export function joinGame(id) {
  const payload = {
    type: "join",
    clientID: clientID,
    gameID: id,
  };
  wsClient.send(JSON.stringify(payload));
}

export function updatePos() {
  const payload = {
    type: "updatePos",
    clientID: clientID,
    gameID: gameID,
    game: {
      ball: game.ball,
      paddlePos: game.paddle.mainPaddle,
    },
  };
  wsClient.send(JSON.stringify(payload));
}
