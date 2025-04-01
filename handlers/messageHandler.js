import { jokeHandler } from "./jokeHandler.js";
import { startHandler } from "./startHandler.js";
import { answers, keywords } from "../variables.js";
import { getActionAndLanguage } from "../utils/getActionLanguage.js";

export const messageHandler = (bot, msg) => {
  
  const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

  const messageText = msg.text.toString().toLowerCase();
  const systemLanguage = msg.from.language_code;

  const { action, language } = getActionAndLanguage(messageText, keywords, systemLanguage);
  // console.log("action: ", action);
  // console.log("language: ", language);
  // console.log("messageText: ", messageText);

  if (action === "start") {
    const lan = language || systemLanguage;
    startHandler(bot, msg, language);} 

  else if (action === "greetings") {
    const greetings = answers.greetings[language] || ["Hello!"];
    const greeting = greetings[randomIndex(greetings)];
    bot.sendMessage(msg.chat.id, greeting);
  } else if (action === "goodbyes") {
    const goodbyes = answers.goodbyes[language] || ["Goodbye!"];
    const goodbye = goodbyes[randomIndex(goodbyes)];
    bot.sendMessage(msg.chat.id, goodbye);
  } else if (action === "thanks") {
    const thanks = answers.thanks[language] || ["You're welcome!"];
    const thankYouMessage = thanks[randomIndex(thanks)];
    bot.sendMessage(msg.chat.id, thankYouMessage);
  } else if (action === "jokes") {
    const joke = jokeHandler(bot, msg, language);
    if (joke) {
      bot.sendMessage(msg.chat.id, joke);
    } else {
      bot.sendMessage(msg.chat.id, answers.jokes[language][0]);
    }
  } else if (action === "unknown") {
    randomIndex(answers.unknown[language]);
    const unknownMessage =
      answers.unknown[language][randomIndex(answers.unknown[language])];
    bot.sendMessage(msg.chat.id, unknownMessage);
  }
};
