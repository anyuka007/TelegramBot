export function getActionAndLanguage(messageText, keywords, systemLanguage) {
    for (const [action, languages] of Object.entries(keywords)) {
      for (const [language, words] of Object.entries(languages)) {
        if (words.some((word) => messageText.startsWith(word))) {
          return { action, language };
        }
      }
    }
    // If no action is found, return "unknown"
    return { action: "unknown", language: systemLanguage };
  }