import { getActionAndLanguage } from "../utils/getActionLanguage.js";
import { getWeather } from "../utils/getWeather.js";
import { answers, keywords } from "../variables.js";

export const weatherHandler = async (bot, msg, match) => {

  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content of the message
  //console.log("msg: ", msg);
  const chatId = msg.chat.id;
  const city = match[2]?.trim(); // the captured "city"
  //console.log("city: ", city);
  //console.log("match: ", match);
  
  const messageText = msg.text.toString().toLowerCase();
  const systemLanguage = msg.from.language_code;

  const { action, language } = getActionAndLanguage(messageText, keywords, systemLanguage);
    
  // Check if the city name is provided
  if (!city) {
    const noCityMessage = answers.weather[language][0]
    await bot.sendMessage(chatId, noCityMessage);
    console.error("City name not provided.");
    return;
  }
  
  
  const firstName = msg.from.first_name;

  async function fetchData() {
    try {
      const message = await getWeather(city, language);
      await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
      console.log(
        `Message about the weather in ${city} sent to ${firstName}`
      );
    } catch (error) {
      if (error.message !== "ERROR_FETCH") {
        console.error("Error sending message:", error.message);
      } else {
        console.error("Error fetching weather data:", error.message);
        const fetchErrorMessage = answers.weather[language][1];
        await bot.sendMessage(chatId, fetchErrorMessage, {
          parse_mode: "Markdown"
        });
      }
    }
  }

  await fetchData();
};
