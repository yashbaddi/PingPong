import ws from "./ws-connection";

function createGame(clientID) {
  const payload = {
    type: "create",
    clientID: clientID,
  };
  ws.send(JSON.stringify(payload));
}

function updateBarPos(left) {
  const payload = {
    type: "updatePos",
    position: left,
  };
  ws.send(JSON.stringify(payload));
}
