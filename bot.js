//npm i node-telegram-bot-api
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { jokes, activeListeningPhrases } from "./variables.js";
import express from "express";
import cron from "node-cron";
import { getWeather } from "./utils/getWeather.js";
import { pingServer } from "./utils/pingServer.js";

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

    bot.onText(/\/start/, (msg) => {
      //console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const language = msg.from.language_code; // &lang=${language};
      //console.log("language: ", language);
      const firstName = msg.from.first_name;
      let message;
      switch (language) {
        case "uk":
          message = `Привіт, ${firstName}! Я бот, який може показати тобі погоду. Напиши <погода> та <назву міста>, де ти хочеш дізнатися погоду. Наприклад, <погода Львів>. Якщо ти хочеш почути жарт, напиши /joke. Аби привітатись, напиши <привіт>. Якщо ти хочеш закінчити спілкування, напиши <бувай>.`;
          break;
        case "de":
          message = `Hallo, ${firstName}! Ich bin ein Bot, der dir das Wetter anzeigen kann. Schreibe Wetter und den Namen der Stadt, über die du das Wetter erfahren möchtest. Zum Beispiel, Wetter Berlin. Wenn du einen Witz hören möchtest, schreibe /joke. Wenn du ein Gespräch beginnen möchtest, schreibe Hallo. Wenn du das Gespräch beenden möchtest, schreibe Auf Wiedersehen.`;
          break;
        default:
          message = `Hello, ${firstName}! I'm a bot that can show you the weather. Write weather and the name of the city you want to know the weather. For example, weather London. If you want to hear a joke, write /joke. If you want to start a conversation, write hello. If you want to end the conversation, write bye.`;
          break;
      }
      bot.sendMessage(chatId, message);
      console.log("Start message sent to ", firstName);
    });

    bot.on("message", (msg) => {
      const hiUa = "привіт";
      const hiEn = "hi";
      const hiDe = "hallo";
      const byeUa = "бувай";
      const byeEn = "bye";
      const byeDe = "tschüss";

      const messageText = msg.text.toString().toLowerCase();

      if (messageText.indexOf(hiUa) === 0) {
        bot.sendMessage(msg.chat.id, "Привіт, мій любий друже");
      } else if (messageText.indexOf(hiEn) === 0) {
        bot.sendMessage(msg.chat.id, "Hello, my dear friend");
      } else if (messageText.indexOf(hiDe) === 0) {
        bot.sendMessage(msg.chat.id, "Hallo, mein lieber Freund");
      }

      if (messageText.indexOf(byeUa) === 0) {
        bot.sendMessage(msg.chat.id, "До зустрічі");
      } else if (messageText.indexOf(byeEn) === 0) {
        bot.sendMessage(msg.chat.id, "Goodbye");
      } else if (messageText.indexOf(byeDe) === 0) {
        bot.sendMessage(msg.chat.id, "Auf Wiedersehen");
      }
    });

    bot.onText(/\/joke/, (msg) => {
      // 'msg' is the received Message from Telegram
      // console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      bot.sendMessage(chatId, randomJoke);
    });

    bot.onText(/\/weather (.+)/, async (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content of the message
      //console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const city = match[1]; // the captured "whatever"
      const language = msg.from.language_code; // &lang=${language};
      const firstName = msg.from.first_name;

      async function fetchData() {
        try {
          console.log(`retrieving weather in ${city}`);
          const message = await getWeather(city, language, firstName);
          await bot.sendMessage(chatId, message);
          console.log(
            `Message about the weather in ${city} sent to ${firstName}`
          );
        } catch (error) {
          console.error("Error fetching weather data:", error);
          const fetchErrorMessage = "I didn't find such a city";
          await bot.sendMessage(chatId, fetchErrorMessage);
        }
      }

      await fetchData();
    });

    bot.onText(/(погода|weather|wetter) (.+)/i, async (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message
      // console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const city = match[2]; // the captured "city"
      // console.log("match: ", match);
      // console.log("match[1]: ", match[1]);
      const language =
        match[1].toLowerCase() === "погода"
          ? "uk"
          : match[1].toLowerCase() === "wetter"
          ? "de"
          : "en"; // &lang=${language} msg.from.language_code;
      const firstName = msg.from.first_name;

      async function fetchData() {
        try {
          const message = await getWeather(city, language, firstName);
          await bot.sendMessage(chatId, message);
          console.log(
            `Message about the weather in ${city} sent to ${firstName}`
          );
        } catch (error) {
          console.error("Error fetching weather data:", error);
          const fetchErrorMessage = "I didn't find such a city";
          await bot.sendMessage(chatId, fetchErrorMessage);
        }
      }

      await fetchData();
    });

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

    // Matches "/echo [whatever]"
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
    /*
// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, "Received your message");
});
 */

    cron.schedule("10 10 * * *", async () => {
        await pingServer()
      const firstName = "Анюткa";
      const chatId = process.env.CHAT_ID;
      const greetingMessage = "Доброго ранку, моя люба! Як спалось?";
      const weather = await getWeather("Оберхаузен", "uk", firstName);
      bot.sendMessage(chatId, `${greetingMessage} \n${weather}`);
      console.log("Message sent");
    });

    cron.schedule("0 9 * * *", async () => {
      const firstName = "Євген";
      const chatId = process.env.CHAT_ID_IEV;
      const greetingMessage = "Доброго ранку, сонце! Як спалось?";
      const weather = await getWeather("Оберхаузен", "uk", firstName);
      bot.sendMessage(chatId, `${greetingMessage} \n${weather}`);
      console.log("Message sent");
    });
    cron.schedule("40 23 * * *", async () => {
      const firstName = "Євген";
      const chatId = process.env.CHAT_ID_IEV;
      const message = `${firstName}, вже пізня година. Може спати? Що скажеш?`;
      bot.sendMessage(chatId, message);
      console.log("Message sent to ", firstName);
    });
    cron.schedule("50 22 * * *", async () => {
      const firstName = "Aннa";
      const chatId = process.env.CHAT_ID;
      const message = `${firstName}, вже пізня година. Може спати? Що скажеш?`;
      bot.sendMessage(chatId, message);
      console.log("Message sent to ", firstName);
    });
  }
  return bot;
};
