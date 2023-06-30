export function wsCreateMethod(clientConnections, games, data, connection) {
  const id = Date.now() + data.clientID;

  const game = {
    players: [data.clientID],
    ball: {},
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

export function wsUpdatePaddlePosMethod(
  clientConnections,
  games,
  data,
  connection
) {
  const game = games[data.gameID];
  game.paddle[data.clientID] = data.paddle;

  const payload = {
    method: "updatePaddleState",
    paddle: data.paddle,
  };

  const oppositePlayerID = game.players.filter(
    (player) => player !== data.clientID
  )[0];
  clientConnections[oppositePlayerID].send(JSON.stringify(payload));
}

export function wsUpdateBallPosMethod(
  clientConnections,
  games,
  data,
  connection
) {
  const game = games[data.gameID];
  game.ball = data.ball;

  const payload = {
    method: "updateBallState",
    ball: data.ball,
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
