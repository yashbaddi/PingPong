import { WebSocketServer } from "ws";
import {
  wsCreateMethod,
  wsGameOverMethod,
  wsJoinMethod,
  wsUpdateBallPosMethod,
  wsUpdatePaddlePosMethod,
} from "./socketMessageHandlers.js";

import express from "express";
import expressWs from "express-ws";

const wsRouter = express.Router();
expressWs(wsRouter);

const clientConnections = {};
const games = {};

wsRouter.ws("/", (ws, req) => {
  console.log("inside ws");
  const id = Date.now();
  clientConnections[id] = ws;
  const payload = {
    method: "open",
    clientID: id,
  };
  ws.send(JSON.stringify(payload));

  ws.on("message", (data) => {
    const wsRequest = JSON.parse(data);
    console.log(wsRequest);

    if (wsRequest.method === "create")
      wsCreateMethod(clientConnections, games, wsRequest, ws);

    if (wsRequest.method === "join")
      wsJoinMethod(clientConnections, games, wsRequest, ws);

    if (wsRequest.method === "updateBallPos")
      wsUpdateBallPosMethod(clientConnections, games, wsRequest, ws);

    if (wsRequest.method === "updatePaddlePos")
      wsUpdatePaddlePosMethod(clientConnections, games, wsRequest, ws);

    if (wsRequest.method === "gameOver")
      wsGameOverMethod(clientConnections, games, wsRequest, ws);
  });
});

export default wsRouter;
