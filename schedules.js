import cron from "node-cron";
import { getWeather } from "./utils/getWeather.js";
import { pingServer } from "./utils/pingServer.js";


export const schedules = (bot) => {
    cron.schedule(
        "0 9 * * *",
        async () => {
          await pingServer();
          const firstName = "Анюткa";
          const chatId = process.env.CHAT_ID;
          const greetingMessage = "Доброго ранку, моя люба! Як спалось?";
          const weather = await getWeather("Оберхаузен", "uk", firstName);
          bot.sendMessage(chatId, `${greetingMessage} \n${weather}`, {
            parse_mode: "Markdown",
          });
          console.log("Scheduled message about the weather sent to ", firstName);
        },
        {
          timezone: "Europe/Berlin",
        }
      );
  
      cron.schedule(
        "0 9 * * *",
        async () => {
          await pingServer();
          const firstName = "Євген";
          const chatId = process.env.CHAT_ID_IEV;
          const greetingMessage = "Доброго ранку, сонце! Як спалось?";
          const weather = await getWeather("Оберхаузен", "uk", firstName);
          bot.sendMessage(chatId, `${greetingMessage} \n${weather}`, {
            parse_mode: "Markdown",
          });
          console.log("Scheduled message about the weather sent to ", firstName);
        },
        {
          timezone: "Europe/Berlin",
        }
      );
  
      cron.schedule(
        "0 23 * * *",
        async () => {
          await pingServer();
          const firstName = "Євген";
          const chatId = process.env.CHAT_ID_IEV;
          const message = `${firstName}, вже пізня година. Може спати? Що скажеш?`;
          bot.sendMessage(chatId, message, {
            parse_mode: "Markdown",
          });
          console.log("Message-reminder sent to ", firstName);
        },
        {
          timezone: "Europe/Berlin",
        }
      );
  
      cron.schedule(
        "0 23 * * *",
        async () => {
          await pingServer();
          const firstName = "Aннa";
          const chatId = process.env.CHAT_ID;
          const message = `${firstName}, вже пізня година. Може спати? Що скажеш?`;
          bot.sendMessage(chatId, message, {
            parse_mode: "Markdown",
          }); 
          console.log("Message-reminder sent to ", firstName);
        },
        {
          timezone: "Europe/Berlin",
        }
      );
    }