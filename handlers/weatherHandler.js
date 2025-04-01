import { getWeather } from "../utils/getWeather.js";

export const weatherHandler = async (bot, msg, match) => {

  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content of the message
  //console.log("msg: ", msg);
  const chatId = msg.chat.id;
  const city = match[2]?.trim(); // the captured "city"
  //console.log("city: ", city);
  //console.log("match: ", match);
  
  const language =
    match[1].toLowerCase() === "погода"
      ? "uk"
      : match[1].toLowerCase() === "wetter"
      ? "de"
      : "en"; // &lang=${language} msg.from.language_code;
  
  // Check if the city name is provided
  if (!city) {
    const noCityMessage =
      language === "uk"
        ? "❓ Будь ласка, вкажіть назву міста після слова 'погода'. Наприклад: 'погода Львів'."
        : language === "de"
        ? "❓ Bitte geben Sie den Namen der Stadt nach dem Wort 'wetter' an. Zum Beispiel: 'wetter Berlin'."
        : "❓ Please provide the name of the city after the word 'weather'. For example: 'weather London'.";
    await bot.sendMessage(chatId, noCityMessage, { parse_mode: "Markdown" });
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
        const fetchErrorMessage =
          language === "uk"
            ? "🔍 Я не знайшов такого міста.\nСпробуй ще раз."
            : language === "de"
            ? "🔍 Ich habe eine solche Stadt nicht gefunden.\nVersuche es noch einmal."
            : "🔍 I didn't find such a city.\nTry again.";
        await bot.sendMessage(chatId, fetchErrorMessage, {
          parse_mode: "Markdown"
        });
      }
    }
  }

  await fetchData();
};
