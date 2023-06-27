import { WebSocketServer } from "ws";

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
          pos: {
            top: 560,
            left: 560,
          },
          direction: {
            horizontal: 1,
            vertical: 1,
          },
        },
        paddle: {},
        gameOver: false,
      };

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
    }

    if (request.type === "updatePos") {
      const game = games[request.gameID];
      game.paddle[request.clientID] = request.game.paddlePos;
      game.ball = request.game.ball;

      const payload = {
        type: "updateState",
        game: {
          ball: request.game.ball,
          paddlePos: request.game.paddlePos,
        },
      };

      const oppositePlayerID = game.players.filter(
        (player) => player !== request.clientID
      )[0];
      clientConnections[oppositePlayerID].send(JSON.stringify(payload));
    }

    if (request.type === "gameOver") {
      const game = games[request.gameID];

      const payload = {
        type: "gameOver",
      };
      game.gameOver = true;
      const oppositePlayerID = game.players.filter(
        (player) => player !== request.clientID
      )[0];
      clientConnections[oppositePlayerID].send(JSON.stringify(payload));
    }
  });
});
