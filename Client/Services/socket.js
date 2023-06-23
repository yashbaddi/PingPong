import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", (ws) => {
  console.log("Connection Sucess");
});

ws.on("message", (data) => {
  const response = JSON.parse(data.toString());
  if ((response.type = "open")) {
  }
  if ((response.type = "create")) {
  }

  if ((response.type = "play")) {
  }

  if ((response.type = "updateState")) {
  }

  if ((response.type = "over")) {
  }
});
