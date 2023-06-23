// import WebSocket from "ws";

import { createPingpongBar } from "../../Components/pingpongBar";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID;

const barLists = {};

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
    barLists["mainPlayer"] = createPingpongBar();
  }

  if (response.type === "play") {
    barLists["oppositePlayer"] = createPingpongBar("top");
    const app = document.getElementById("app");
    app.innerHTML = "";
    Object.values().forEach((bar) => {
      app.append(bar);
    });
  }

  if (response.type === "updateState") {
  }

  if (response.type === "over") {
  }
};

export default wsClient;
