export function wsCreateMethod(clientConnections, games, data, connection) {
  const id = Date.now() + data.clientID;

  const game = {
    players: [data.clientID],
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
    method: "create",
    gameID: id,
  };

  connection.send(JSON.stringify(payload));
}

export function wsJoinMethod(clientConnections, games, data, connection) {
  const game = games[data.gameID];

  game.players.push(data.clientID);

  const payloadJoin = {
    method: "join",
    clientID: data.clientID,
    gameID: data.gameID,
  };
  connection.send(JSON.stringify(payloadJoin));

  const payloadPlay = {
    method: "play",
    game: game,
  };

  game.players.forEach((playerID) => {
    clientConnections[playerID].send(JSON.stringify(payloadPlay));
  });
}

export function wsUpdatePosMethod(clientConnections, games, data, connection) {
  const game = games[data.gameID];
  game.paddle[data.clientID] = data.game.paddlePos;
  game.ball = data.game.ball;

  const payload = {
    method: "updateState",
    game: {
      ball: data.game.ball,
      paddlePos: data.game.paddlePos,
    },
  };

  const oppositePlayerID = game.players.filter(
    (player) => player !== data.clientID
  )[0];
  clientConnections[oppositePlayerID].send(JSON.stringify(payload));
}

export function wsGameOverMethod(clientConnections, games, data, connection) {
  const game = games[data.gameID];

  const payload = {
    method: "gameOver",
  };
  game.gameOver = true;
  const oppositePlayerID = game.players.filter(
    (player) => player !== data.clientID
  )[0];
  clientConnections[oppositePlayerID].send(JSON.stringify(payload));
}
