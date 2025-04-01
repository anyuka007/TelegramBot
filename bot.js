//npm i node-telegram-bot-api
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { messageHandler } from "./handlers/messageHandler.js";
import { weatherHandler } from "./handlers/weatherHandler.js";
import { schedules } from "./schedules.js";
import { keywords } from "./variables.js";

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
    // *** Handlers

    // Message handler
    bot.on("message", (msg) => messageHandler(bot, msg));

    // Weather handler
    const weatherKeywords = Object.values(keywords.weather)
      .flat() // combines all arrays into one
      .join("|"); // joins the array elements into a string separated by "|"
    const weatherRegex = new RegExp(`(${weatherKeywords})(?:\\s+(.+))?`, "i");

    // (?:\s+(.+))?: Matches one or more spaces (\s+) followed by any text (.+), capturing the text as the city name
    bot.onText(weatherRegex, (msg, match) => weatherHandler(bot, msg, match));

    // Scheduled messages
    schedules(bot);
  }
  return bot;
};
