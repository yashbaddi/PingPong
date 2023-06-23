import express from "express";

const app = express();
const PORT = 4500;

app.use(express.static("Client"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
