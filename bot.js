//npm i node-telegram-bot-api
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { startHandler } from "./handlers/startHandler.js";
import { messageHandler } from "./handlers/messageHandler.js";
import { jokeHandler } from "./handlers/jokeHandler.js";
import { weatherHandler } from "./handlers/weatherHandler.js";
import { schedules } from "./schedules.js";

/* export const bot = new TelegramBot(process.env.TELEGRAM_BOT, { polling: true }); */

/* export const bot = new TelegramBot(process.env.TELEGRAM_BOT, { webHook: true });
const url = process.env.APP_URL 
bot.setWebHook(`${url}/bot${process.env.TELEGRAM_BOT}`); */

// ** Initializing the Telegram Bot Instance based on the environment in which the application is running
/* export let bot;
if (process.env.NODE_ENV === "production") {
    bot = new TelegramBot(process.env.TELEGRAM_BOT);
    bot.setWebHook(`${process.env.APP_URL}/bot${process.env.TELEGRAM_BOT}`);
    console.log("production");
} else {
    bot = new TelegramBot(process.env.TELEGRAM_BOT, { polling: true });
    console.log("development");
} */

let bot;
export const botInstance = () => {
  if (!bot) {
    if (process.env.NODE_ENV === "production") {
      bot = new TelegramBot(process.env.TELEGRAM_BOT);
      bot.setWebHook(`${process.env.APP_URL}/bot${process.env.TELEGRAM_BOT}`);
      console.log("production");
    } else {
      bot = new TelegramBot(process.env.TELEGRAM_BOT, { polling: true });
      console.log("development");
    }
    // Handlers

    // Start command
    //bot.onText(/\/start/, (msg) => startHandler(bot, msg));
    
    // Message handler
    bot.on("message", (msg) => messageHandler(bot, msg));

    // Joke handler
    //bot.onText(/\/joke/, (msg) => jokeHandler(bot, msg));

    // Weather handler
    bot.onText(/(погода|weather|wetter) (.+)/i, (msg, match) =>
      weatherHandler(bot, msg, match)
    );

    // Scheduled messages
    schedules(bot);
  }
  return bot;
};
