//npm i node-telegram-bot-api
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { jokes, activeListeningPhrases } from "./variables.js";
import cron from "node-cron";
import { getWeather } from "./utils/getWeather.js";
import { pingServer } from "./utils/pingServer.js";
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
    bot.onText(/\/start/, (msg) => startHandler(bot, msg));
    
    // Message handler
    bot.on("message", (msg) => messageHandler(bot, msg));

    // Joke handler
    bot.onText(/\/joke/, (msg) => jokeHandler(bot, msg));

    // Weather handler
    bot.onText(/(погода|weather|wetter) (.+)/i, (msg, match) =>
      weatherHandler(bot, msg, match)
    );

    bot.on("channel_post", (msg) => {
      const chatId = msg.chat.id;
      console.log("msg: ", msg);
      const usersMessage = msg.text;
      const hi = "привіт";
      const bye = "бувай";
      if (usersMessage.toString().toLowerCase().includes("жарт")) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        bot.sendMessage(chatId, randomJoke);
      } else if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        const author = msg.author_signature;
        let answer = author ? `Привіт, ${msg.author_signature}` : "Привіт";
        bot.sendMessage(msg.chat.id, answer);
      } else if (msg.text.toString().toLowerCase().indexOf(bye) === 0) {
        const author = msg.author_signature;
        let answer = author
          ? `До зустрічі, ${msg.author_signature}`
          : "До зустрічі";
        bot.sendMessage(msg.chat.id, answer);
      } else {
        const randomAnswer =
          activeListeningPhrases[
            Math.floor(Math.random() * activeListeningPhrases.length)
          ];
        bot.sendMessage(chatId, randomAnswer);
      }
    });

    // Repeats the message of user. Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message
      console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"

      // send back the matched "whatever" to the chat
      bot.sendMessage(chatId, resp);
    });

   // Scheduled messages
    schedules(bot);
  }
  return bot;
};
