import express, { Router } from "express";
import expressWs from "express-ws";

import wsRouter from "./Socket/socket.js";

const app = express();
expressWs(app);

app.use(express.static("../Client"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/ws", wsRouter);

app.listen(8080, () => {
  console.log("connected to port 8080");
});
