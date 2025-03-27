export const greetingMessage = (language, firstName) => {
    switch (language) {
        case "uk":
        return `Привіт, *${firstName}*! Я бот, який допоможе тобі дізнатись погоду й не тільки.\n🌤️ Напиши *погода* та *назву міста*, де ти хочеш дізнатися погоду. Наприклад, *погода Львів*.\n🤣 Якщо ти хочеш почути жарт, напиши слово *жарт* або обери команду *\/joke* в меню.\n👋 Аби привітатись, напиши *привіт*. Якщо ти хочеш закінчити спілкування, напиши *бувай*.`;
      case "de":
        return `Hallo, *${firstName}*! Ich bin ein Bot, der dir Informationen über das Wetter und mehr bereitstellen kann.\n🌤️ Schreibe *Wetter* und den *Namen der Stadt*, über die du das Wetter erfahren möchtest. Zum Beispiel *Wetter Berlin*.\n🤣 Wenn du einen Witz hören möchtest, schreibe *witz* oder wähle *\/joke* im Menü.\n👋 Wenn du mich begrüßen möchtest, schreibe *hallo*. Um ein Gespräch zu beenden, schreibe *tschüss*.`;
      default:
        return `Hello, *${firstName}*! I am a bot that can provide you with information about the weather and more.\n🌤️ Write *weather* and the *name of the city* you want to know the weather for. For example, *weather London*.\n🤣 If you want to hear a joke, write *joke* or select *\/joke* in the menu.\n👋 If you want to greet me, write *hi*. To end the conversation, write *bye*.`;
      }
    }
