import { greetingMessage } from "../utils/greetingMessage.js";
export const startHandler = (bot, msg, lang) => {
  //console.log("msg: ", msg);
  const chatId = msg.chat.id;
  const messageText = msg.text.toString().toLowerCase();
  const systemLanguage = msg.from.language_code;
  let language;
  if (messageText.startsWith("/")) {
    language = systemLanguage;
  } else {
      language = lang;
    }
  const firstName = msg.from.first_name;
  const message = greetingMessage(language, firstName);

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
  console.log("Start message sent to ", firstName);
};
