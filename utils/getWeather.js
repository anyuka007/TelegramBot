import fetch from "node-fetch";

export async function getWeather(city, language, firstName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric&lang=${language}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cityNameCountry = `${data.name}, ${data.sys.country}`;
    const temperature = data.main.temp.toFixed();
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    const currentTimezoneOffset = new Date().getTimezoneOffset();
    const searchTimezone = data.timezone / 60; // in sec
    const differenceTimezone = searchTimezone - -currentTimezoneOffset; // in sec
    const newTime = new Date(
        new Date().getTime() + differenceTimezone * 60 * 1000
    );

    const sunrise = new Date(
        data.sys.sunrise * 1000 + differenceTimezone * 60 * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const sunset = new Date(
        data.sys.sunset * 1000 + differenceTimezone * 60 * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const timeSearchedCity = newTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    });
    const message =
      language === "uk"
        ? `${firstName
          }, зараз ${temperature}°C, ${description} у ${cityNameCountry}. Вологість повітря складає ${humidity}%. Схід сонечка о ${sunrise}, а захід о ${sunset}. Зараз у ${
            data.name
          } ${timeSearchedCity}.`
        : language === "de"
        ? `${firstName
          }, es sind jetzt ${temperature}°C, ${description} in ${cityNameCountry}. Die Luftfeuchtigkeit beträgt ${humidity}%. Sonnenaufgang um ${sunrise} Uhr, Sonnenuntergang um ${sunset} Uhr. In ${
            data.name
          } ist es jetzt ${timeSearchedCity} Uhr.`
        : `${firstName
          }, it is now ${temperature}°C, ${description} in ${cityNameCountry}. The air humidity is ${humidity}%. Sunrise at ${sunrise}, sunset at ${sunset}. It is ${timeSearchedCity} in ${
            data.name
          } now.`;
    return message;
  } catch (error) {
    throw new Error("ERROR_FETCH");
  }
}
