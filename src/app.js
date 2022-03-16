import { v4 } from "uuid";
import express from "express";
var app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/tasks", (req, res) => {
  res.status(200).send([]);
});

app.post("/tasks", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    res.status(200).json({
      id: v4(),
      title,
      content,
    });
  } else {
    res.sendStatus(400)
  }
});

export default app;
