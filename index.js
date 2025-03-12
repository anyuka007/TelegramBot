import express from "express";
import { botInstance } from "./bot.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const bot = botInstance();

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.get("/ping", (req, res) => {
    res.send("pong");
  });

app.post(`/bot${process.env.TELEGRAM_BOT}`, async (req, res) => {
  console.log("received request from TG:", req.body.message.text);
  await bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
