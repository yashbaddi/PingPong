import { createPingpongBall } from "./Components/pingpongBall.js";
import { createPingpongBar } from "./Components/pingpongBar.js";
import { startGameElement } from "./Components/StartGame.js";

const app = document.getElementById("app");

const start = startGameElement();

app.append(start);
