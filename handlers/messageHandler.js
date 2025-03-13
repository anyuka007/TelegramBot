export const messageHandler = (msg)=> {
      const hiUa = "привіт";
      const hiEn = "hi";
      const hiDe = "hallo";
      const byeUa = "бувай";
      const byeEn = "bye";
      const byeDe = "tschüss";

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
    }