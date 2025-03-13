export const greetingMessage = (language, firstName) => {
    switch (language) {
        case "uk":
          return `Привіт, <b>${firstName}</b>! Я бот, який може показати тобі погоду. Напиши <i>погода</i> та <i>назву міста</i>, де ти хочеш дізнатися погоду. Наприклад, <i>погода Львів</i>. Якщо ти хочеш почути жарт, напиши <i>/joke</i>. Аби привітатись, напиши <i>привіт</i>. Якщо ти хочеш закінчити спілкування, напиши <i>бувай</i>.`;
        case "de":
          return `Hallo, <b>${firstName}</b>! Ich bin ein Bot, der dir das Wetter anzeigen kann. Schreibe <i>Wetter</i> und den <i>Namen der Stadt</i>, über die du das Wetter erfahren möchtest. Zum Beispiel, <i>Wetter Berlin</i>. Wenn du einen Witz hören möchtest, schreibe <i>/joke</i>. Wenn du ein Gespräch beginnen möchtest, schreibe <i>hallo</i>. Wenn du das Gespräch beenden möchtest, schreibe <i>tschüss</i>.`;
        default:
          return `Hello, <b>${firstName}</b>! I'm a bot that can show you the weather. Write <i>weather</i> and the <i>name of the city</i> you want to know the weather. For example, <i>weather London</i>. If you want to hear a joke, write <i>/joke</i>. If you want to start a conversation, write <i>hi</i>. If you want to end the conversation, write <i>bye</i>.`;
      }
    }