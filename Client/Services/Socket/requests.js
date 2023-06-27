import wsClient from "./ws-connection.js";
import { clientID, gameID } from "./ws-connection.js";

export function createGame() {
  const payload = {
    type: "create",
    clientID: clientID,
    position: "560px",
  };
  wsClient.send(JSON.stringify(payload));
}

export function joinGame(id) {
  const payload = {
    type: "join",
    clientID: clientID,
    gameID: id,
    position: "560px",
  };
  wsClient.send(JSON.stringify(payload));
}

export function updatePos(paddlePos, ballPos) {
  const payload = {
    type: "updatePos",
    clientID: clientID,
    gameID: gameID,
    paddlePos: paddlePos,
    ballPos: ballPos,
  };
  wsClient.send(JSON.stringify(payload));
}
