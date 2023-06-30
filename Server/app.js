import express, { Router } from "express";
import expressWs from "express-ws";

import wsRouter from "./Socket/socket.js";

const app = express();
expressWs(app);

app.use("/ws", wsRouter);

app.listen(8080, () => {
  console.log("connected to port 8080");
});
