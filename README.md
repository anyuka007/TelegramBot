# TelegramBot
DE: 
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
- `погода|weather|wetter` + `<city>`: gibt eine Nachricht zurück, die den Namen des Benutzers, die aktuelle Temperatur, die Wetterbeschreibung, die Stadt, die Sonnenaufgangs- und Sonnenuntergangszeiten sowie die aktuelle Uhrzeit und die Zeitdifferenz in der entsprechenden Sprache enthält.
- `привіт` oder `бувай`: Begrüßt den Benutzer und verabschiedet sich auf Ukrainisch.
- `/echo` `<message>`: Wiederholt die angegebene Nachricht.