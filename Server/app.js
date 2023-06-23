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
    connection.send(JSON.stringify(payload));
  });

  connection.on("messsage", (data) => {
    const request = JSON.parse(data.toString());
    console.log(request);

    if ((request.type = "create")) {
      const id = Date.now() + request.clientID;
      games[id] = {
        players: [request.clientID],
      };

      game[request.clientID] = request.position;

      const payload = {
        type: "create",
        gameID: id,
      };

      connection.send(JSON.stringify(payload));
    }

    if ((request.type = "join")) {
      const game = games[request.gameID];
      game.players.push(request.clientID);
      game[request.clientID] = request.position;

      const payload = {
        type: "play",
        game: games[request.gameID],
      };

      connection.send(JSON.stringify(payload));
      broadcastState();
    }

    if ((request.type = "updatePos")) {
      games[request.gameID][request.clientID] = request.position;
    }
  });

  function broadcastState() {
    for (let game of games) {
      const plyload = {
        type: "updateState",
        game: game,
      };
      game.players.forEach((clientID) => {
        clientConnections[clientID].send(JSON.stringify(payload));
      });
    }
    setTimeout(broadcastState, 500);
  }
});
