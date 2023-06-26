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
          top: "560px",
          left: "560px",
        },
      };

      game[request.clientID] = request.position;
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
      game[request.clientID] = request.position;
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
      games[request.gameID][request.clientID] = request.position;
    }
  });

  function broadcastState() {
    for (let game of Object.values(games)) {
      ballAnimate(game);
      const payload = {
        type: "updateState",
        game: game,
      };
      game.players.forEach((clientID) => {
        clientConnections[clientID].send(JSON.stringify(payload));
      });
    }
    if (connection.readyState === 1) {
      setTimeout(broadcastState, 50);
    }
  }
});
