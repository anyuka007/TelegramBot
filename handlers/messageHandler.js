import { jokeHandler } from "./jokeHandler.js";

export const messageHandler = (bot, msg)=> {
      const hiUa = "привіт";
      const hiEn = "hi";
      const hiDe = "hallo";
      const byeUa = "бувай";
      const byeEn = "bye";
      const byeDe = "tschüss";
      const jokeUa = "жарт";
      const jokeEn = "joke";  
      const jokeDe = "witz";

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

      if(messageText[0] === jokeEn || jokeUa || jokeDe) {
        const joke = jokeHandler(bot, msg);
        if (joke) {
          bot.sendMessage(msg.chat.id, joke);
        } else {
          bot.sendMessage(msg.chat.id, "Sorry, I couldn't find a joke.");
        }
      }
    }