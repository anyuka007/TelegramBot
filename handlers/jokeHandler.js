import { jokes } from "../variables.js";

export const jokeHandler = (bot, msg) => {
  // 'msg' is the received Message from Telegram
  // console.log("msg: ", msg);
  const messageText = msg.text.toString().toLowerCase();
  const systemLanguage = msg.from.language_code;
  let language = "en";
  if (messageText.startsWith("/")) {
    language = systemLanguage;
  } else {
    if (messageText.split(" ")[0] === "жарт") {
      language = "uk";
    } else if (messageText.split(" ")[0] === "witz") {
      language = "de";
    } else if (messageText.includes("joke")) {
      language = "en";
    }
  }

  const jokesArray = jokes[language] || jokes.en;
  const randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
  return randomJoke;
};
