// import WebSocket from "ws";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID;

wsClient.onopen = (ws) => {
  console.log("Connection Sucess");
};

wsClient.onmessage = (message) => {
  const response = JSON.parse(message.data.toString());
  console.log(response);
  if (response.type === "open") {
    clientID = response.clientID;
  }
  if (response.type === "create") {
    gameID = response.gameID;
  }

  if (response.type === "play") {
  }

  if (response.type === "updateState") {
  }

  if (response.type === "over") {
  }
};

export default wsClient;
