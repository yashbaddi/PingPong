import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");
let clientID, gameID;

ws.on("open", (ws) => {
  console.log("Connection Sucess");
});

ws.on("message", (data) => {
  const response = JSON.parse(data.toString());
  if ((response.type = "open")) {
    clientID = response.clientID;
  }
  if ((response.type = "create")) {
    gameID = response.gameID;
  }

  if ((response.type = "play")) {
  }

  if ((response.type = "updateState")) {
  }

  if ((response.type = "over")) {
  }
});
