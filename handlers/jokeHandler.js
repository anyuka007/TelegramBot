import { jokes } from "../variables.js";

export const jokeHandler = (bot, msg, lang) => {
  // 'msg' is the received Message from Telegram
  // console.log("msg: ", msg);
  const messageText = msg.text.toString().toLowerCase();
  const systemLanguage = msg.from.language_code;
  let language;
  if (messageText.startsWith("/")) {
    language = systemLanguage;
  } else {
      language = lang;
    }
  console.log("language: ", language);

  const jokesArray = jokes[language] || jokes.en;
  const randomJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
  return randomJoke;
};
