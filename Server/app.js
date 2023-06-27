import { WebSocketServer } from "ws";
import { ballAnimate } from "./Services/ballAnimation.js";

const wsServer = new WebSocketServer({ port: 8080 });
const clientConnections = {};
const games = {};

wsServer.on("connection", (connection) => {
  const id = Date.now();
  clientConnections[id] = connection;
  const payload = {
    type: "open",
    clientID: id,
  };
  connection.send(JSON.stringify(payload));

  connection.on("message", (data) => {
    const request = JSON.parse(data);
    console.log(request);

    if (request.type === "create") {
      const id = Date.now() + request.clientID;

      const game = {
        players: [request.clientID],
        ball: {
          paddlePos: {
            top: "560px",
            left: "560px",
          },
          direction: {
            horizontal: 1,
            vertical: 1,
          },
        },
      };

      game[request.clientID] = request.paddlePos;
      games[id] = game;

      const payload = {
        type: "create",
        gameID: id,
      };

      connection.send(JSON.stringify(payload));
    }

    if (request.type === "join") {
      const game = games[request.gameID];

      game.players.push(request.clientID);
      game[request.clientID] = request.paddlePos;
      const payloadJoin = {
        type: "join",
        clientID: request.clientID,
        gameID: request.gameID,
      };
      connection.send(JSON.stringify(payloadJoin));
      const payloadPlay = {
        type: "play",
        game: game,
      };
      Object.values(clientConnections).forEach((ws) =>
        ws.send(JSON.stringify(payloadPlay))
      );
      broadcastState();
    }

    if (request.type === "updatePos") {
      games[request.gameID][request.clientID] = request.paddlePos;
      games[request.gameID]["ball"] = request.ballPos;

      const payload = {
        type: "updateState",
        game: game,
      };
      const oppositePlayerID = game.players.filter(
        (player) => player !== request.clientID
      )[0];
      clientConnections[oppositePlayerID].send(JSON.stringify(payload));
    }
  });
});
