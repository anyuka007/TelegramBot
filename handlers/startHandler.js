export const startHandler = (msg) => {
    //console.log("msg: ", msg);
    const chatId = msg.chat.id;
    const language = msg.from.language_code; // &lang=${language};
    const firstName = msg.from.first_name;
    message = greetingMessage(language, firstName);
    
    bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    console.log("Start message sent to ", firstName);
  }