import { WebSocketServer } from "ws";

const wsServer = WebSocketServer({ port: 8080 });
const clientConnections = {};
const games = {};

wsServer.on("connection", (connection) => {
  connection.on("open", () => {
    const id = Date.now();
    clientConnections[clientID] = connection;
    const payload = {
      type: "open",
      clientID: id,
    };
    ws.send(JSON.stringify(payload));
  });

  connection.on("messsage", (data) => {
    const request = JSON.parse(data.toString());
    console.log(request);

    if ((request.type = "create")) {
      const id = Date.now() + request.clientID;
      games[id] = {
        player1: request.clientID,
      };

      game[request.clientID] = request.position;

      const payLoad = {
        type: "create",
        gameID: id,
      };

      ws.send(JSON.stringify(payload));
    }

    if ((request.type = "join")) {
      const game = games[request.gameID];
      game.player2 = request.clientID;
      game[request.clientID] = request.position;

      const payLoad = {
        type: "play",
        game: games[request.gameID],
      };

      ws.send(JSON.stringify(payload));
    }

    if ((request.type = "updatePos")) {
      games[request.gameID][request.clientID] = request.position;
    }
  });
});
