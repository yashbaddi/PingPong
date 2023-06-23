import wsClient from "./ws-connection.js";
import { clientID, gameID } from "./ws-connection.js";
export function createGame() {
  const payload = {
    type: "create",
    clientID: clientID,
  };
  wsClient.send(JSON.stringify(payload));
  return gameID;
}

export function joinGame(id) {
  const payload = {
    type: "join",
    gameID: id,
  };
  wsClient.send(JSON.stringify(payload));
}

export function updateBarPos(left) {
  const payload = {
    type: "updatePos",
    clientID: clientID,
    gameID: gameID,
    position: left,
  };
  wsClient.send(JSON.stringify(payload));
}
