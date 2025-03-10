# TelegramBot
#### EN:
A Telegram bot that offers various functions, including sending greeting messages, telling jokes, and retrieving weather information. The bot uses the `node-telegram-bot-api` library and is written in JavaScript.

## Features

- **Greeting Message**: Sends a greeting message when the user enters the `/start` command.
- **Telling Jokes**: Sends a random joke when the user enters the `/joke` command.
- **Weather Information**: Sends current weather information for a specified city when the user enters the `/weather <city>` command.
- **Echoes**: Repeats the entered message when the user enters the `/echo <message>` command.
- **Scheduled Messages**: Sends scheduled messages at specific times, including weather information and personalized messages.
- **Multilingual Support**: The bot supports multiple languages (Ukrainian, German, and English) and sends messages in the user's language.

## Commands

- `/start`: Greets the user.
- `/joke`: Tells a random joke.
- `/weather <city>`: Returns the current weather for the specified city.
- `погода|weather|wetter <city>`: Returns a message that includes the user's name, current temperature, weather description, city, sunrise and sunset times, current time in the corresponding language.
- `привіт` or `бувай`: Greets the user and says goodbye in Ukrainian.
- `/echo <message>`: Repeats the entered message.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd TelegramBot
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a [.env](http://_vscodecontentref_/0) file in the root directory of the project and add your Telegram bot API and OpenWeatherMap API keys:
    ```env
    TELEGRAM_BOT=<your-telegram-bot-api-key>
    KEY=<your-openweathermap-api-key>
    APP_URL=<your-app-url>
    PORT=3000
    NODE_ENV=development
    CHAT_ID=<your-chat-id>
    CHAT_ID_IEV=<your-another-chat-id(iev)>
    ```

## Usage

Start the bot:
```sh
node bot.js
```


#### DE: 
Ein Telegram-Bot, der verschiedene Funktionen bietet, darunter das Senden von Begrüßungsnachrichten, das Erzählen von Witzen und das Abrufen von Wetterinformationen. Der Bot verwendet die node-telegram-bot-api-Bibliothek und ist in JavaScript geschrieben.

# Funktionen
- **Begrüßungsnachricht**: Sendet eine Begrüßungsnachricht, wenn der Benutzer den Befehl /start eingibt.
- **Witze erzählen**: Sendet einen zufälligen Witz, wenn der Benutzer den Befehl /joke eingibt.
- **Wetterinformationen**: Sendet aktuelle Wetterinformationen für eine angegebene Stadt, wenn der Benutzer den Befehl weather und `<city>` eingibt.
- **Echos**: Wiederholt die eingegebene Nachricht, wenn der Benutzer den Befehl /echo `<message>` eingibt.
- **Geplante Nachrichten**: Sendet geplante Nachrichten zu bestimmten Zeiten, einschließlich Wetterinformationen und personalisierten Nachrichten.
- **Mehrsprachige Unterstützung**: Der Bot unterstützt mehrere Sprachen (Ukrainisch, Deutsch und Englisch) und sendet Nachrichten in der Sprache des Benutzers.
  
# Befehle
- `/start`: Begrüßt den Benutzer.
- `/joke`: Erzählt einen zufälligen Witz.
- `/weather` `<city>`: Gibt das aktuelle Wetter für die angegebene Stadt zurück.
- `погода|weather|wetter` + `<city>`: gibt eine Nachricht zurück, die den Namen des Benutzers, die aktuelle Temperatur, die Wetterbeschreibung, die Stadt, die Sonnenaufgangs- und Sonnenuntergangszeiten sowie die aktuelle Uhrzeit in der entsprechenden Sprache enthält.
- `привіт` oder `бувай`: Begrüßt den Benutzer und verabschiedet sich auf Ukrainisch.
- `/echo` `<message>`: Wiederholt die angegebene Nachricht.