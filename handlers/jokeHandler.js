
import { jokes } from "../variables.js";

export const jokeHandler = (bot, msg) => {
      // 'msg' is the received Message from Telegram
      // console.log("msg: ", msg);
      const chatId = msg.chat.id;
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      bot.sendMessage(chatId, randomJoke);
    }