//npm i node-telegram-bot-api
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { jokes, activeListeningPhrases } from "./variables.js";
import express from "express";

/* const bot = new TelegramBot(process.env.TELEGRAM_BOT, { polling: true }); */

const bot = new TelegramBot(process.env.TELEGRAM_BOT, { webHook: true });
const url = process.env.APP_URL 
const port = process.env.PORT;

bot.setWebHook(`${url}/bot${process.env.TELEGRAM_BOT}`);

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Привіт! Розпочнемо?");
});

bot.on("message", (msg) => {
    const hi = "привіт";
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        bot.sendMessage(msg.chat.id, "Привіт, мій любий друже");
    }

    const bye = "бувай";
    if (msg.text.toString().toLowerCase().indexOf(bye) === 0) {
        bot.sendMessage(msg.chat.id, "До зустрічі");
    }
});
bot.onText(/\/joke/, (msg) => {
    // 'msg' is the received Message from Telegram
    // console.log("msg: ", msg);
    const chatId = msg.chat.id;
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    bot.sendMessage(chatId, randomJoke);
});

bot.onText(/\/weather (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log("msg: ", msg);
    const chatId = msg.chat.id;
    const city = match[1]; // the captured "whatever"
    const language = msg.from.language_code; // &lang=${language}
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric&lang=${language}`;

    async function fetchData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data: ", data);
            const cityNameCountry = `${data.name}, ${data.sys.country}`;
            let temperature = data.main.temp.toFixed();
            //let celsius = Math.round(temperature - 273);
            let description = data.weather[0].description;
            const message = `${msg.from.first_name}, it is now ${temperature}°C, ${description} in ${cityNameCountry}`;
            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error("Error fetching data:", error);
            const fetchErrorMessage = "I didn't find such a city";
            bot.sendMessage(chatId, fetchErrorMessage);
        }
    }

    fetchData();
    // send back the matched "whatever" to the chat
});

bot.onText(/(погода|weather|wetter) (.+)/i, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log("msg: ", msg);
    const chatId = msg.chat.id;
    const city = match[2]; // the captured "city"
    console.log("match: ", match);
    console.log("match[1]: ", match[1]);
    const language =
        match[1].toLowerCase() === "погода"
            ? "ua"
            : match[1].toLowerCase() === "wetter"
            ? "de"
            : "en"; // &lang=${language} msg.from.language_code;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric&lang=${language}`;

    async function fetchData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("data: ", data);
            const currentTimezoneOffset = new Date().getTimezoneOffset();
            const searchTimezone = data.timezone / 60; // in sec
            const differenceTimezone = searchTimezone - -currentTimezoneOffset;
            console.log("currentTimezoneOffset: ", currentTimezoneOffset);
            console.log("searchTimezone: ", searchTimezone);
            console.log("differenceTimezone", differenceTimezone);
            console.log(
                "sunrise searched Timezone:",
                new Date(
                    data.sys.sunrise * 1000 + differenceTimezone * 60 * 1000
                ).toTimeString()
            );
            console.log(
                "time here: ",
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
            let currentTime = new Date();
            let newTime = new Date(
                currentTime.getTime() + differenceTimezone * 60 * 1000
            );
            const timeSearchedCity = newTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                //hour12: false,
                hourCycle: "h23",
            });
            console.log("time in searched city: ", timeSearchedCity);
            const sunrise = new Date(
                data.sys.sunrise * 1000 + differenceTimezone * 60 * 1000
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            const sunset = new Date(
                data.sys.sunset * 1000 + differenceTimezone * 60 * 1000
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            const cityNameCountry = `${data.name}, ${data.sys.country}`;
            let temperature = data.main.temp.toFixed();
            //let celsius = Math.round(temperature - 273);
            let description = data.weather[0].description;
            const message =
                language === "ua"
                    ? `${
                          msg.from.first_name
                      }, зараз ${temperature}°C, ${description} у ${cityNameCountry}. Схід сонечка о ${sunrise}, а захід о ${sunset}. Зараз у ${
                          data.name
                      } ${timeSearchedCity}, різниця у часі становить ${
                          differenceTimezone / 60
                      } годин(и/у).`
                    : language === "de"
                    ? `${
                          msg.from.first_name
                      }, es sind jetzt ${temperature}°C, ${description} in ${cityNameCountry}. Sonnenaufgang um ${sunrise} Uhr, Sonnenuntergang um ${sunset} Uhr. In ${
                          data.name
                      } ist es jetzt ${timeSearchedCity} Uhr, der Zeitunterschied beträgt ${
                          differenceTimezone / 60
                      } Stunde(n).`
                    : `${
                          msg.from.first_name
                      }, it is now ${temperature}°C, ${description} in ${cityNameCountry}. Sunrise at ${sunrise}, sunset at ${sunset}. It is ${timeSearchedCity} in ${
                          data.name
                      } now, the time difference is ${
                          differenceTimezone / 60
                      } hour(s).`;
            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error("Error fetching data:", error);
            const fetchErrorMessage = "I didn't find such a city";
            bot.sendMessage(chatId, fetchErrorMessage);
        }
    }

    fetchData();

    // send back the matched "whatever" to the chat
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

const app = express();
app.use(express.json());

app.post(`/bot${process.env.TELEGRAM_BOT}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
}
);

app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});