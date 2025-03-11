import express from "express";
import { bot } from "./bot.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/favicon.ico", (req, res) => { res.status(204).end(); });

app.post(`/bot${process.env.TELEGRAM_BOT}`, async(req, res) => {
    res.sendStatus(200);
    await bot.processUpdate(req.body);
    
}
);

app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});