// import WebSocket from "ws";

import { createPingpongBar, setBar } from "../../Components/pingpongBar.js";

const wsClient = new WebSocket("ws://localhost:8080");
export let clientID, gameID, oppositePlayerID;

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

  if (response.type === "join") {
    gameID = response.gameID;
    barLists["mainPlayer"] = createPingpongBar();
  }

  if (response.type === "play") {
    const app = document.getElementById("app");
    app.innerHTML = "";

    oppositePlayerID = Object.values(response.game.players).filter(
      (player) => player !== clientID
    );
    barLists["oppositePlayer"] = createPingpongBar("top");
    Object.values(barLists).forEach((bar) => {
      app.append(bar);
    });
  }

  if (response.type === "updateState") {
    const game = response.game;

    setBar(barLists["oppositePlayer"], game[oppositePlayerID]);
  }

  if (response.type === "over") {
  }
};

export default wsClient;
