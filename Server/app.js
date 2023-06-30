import { WebSocketServer } from "ws";
import {
  wsCreateMethod,
  wsGameOverMethod,
  wsJoinMethod,
  wsUpdateBallPosMethod,
  wsUpdatePaddlePosMethod,
} from "./Socket/socketMessageHandlers.js";

const wsServer = new WebSocketServer({ port: 8080 });
const clientConnections = {};
const games = {};

wsServer.on("connection", (connection) => {
  const id = Date.now();
  clientConnections[id] = connection;
  const payload = {
    method: "open",
    clientID: id,
  };
  connection.send(JSON.stringify(payload));

  connection.on("message", (data) => {
    const wsRequest = JSON.parse(data);
    console.log(wsRequest);

    if (wsRequest.method === "create")
      wsCreateMethod(clientConnections, games, wsRequest, connection);

    if (wsRequest.method === "join")
      wsJoinMethod(clientConnections, games, wsRequest, connection);

    if (wsRequest.method === "updateBallPos")
      wsUpdateBallPosMethod(clientConnections, games, wsRequest, connection);

    if (wsRequest.method === "updatePaddlePos")
      wsUpdatePaddlePosMethod(clientConnections, games, wsRequest, connection);

    if (wsRequest.method === "gameOver")
      wsGameOverMethod(clientConnections, games, wsRequest, connection);
  });
});
