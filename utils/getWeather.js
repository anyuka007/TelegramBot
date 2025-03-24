import fetch from "node-fetch";

export async function getWeather(city, language, firstName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric&lang=${language}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cityCapitalized = city[0].toUpperCase() + city.slice(1);
    const country = data.sys.country;
    const temperature = data.main.temp.toFixed();
    const feelsLike = data.main.feels_like.toFixed();
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
          }, зараз ${temperature}°C, відчувається як ${feelsLike}°C, ${description} у ${cityCapitalized}, ${country}.\nВологість повітря складає ${humidity}%.\nСхід сонечка о ${sunrise}, а захід о ${sunset}.\nЗараз у місті ${cityCapitalized} ${timeSearchedCity}.`
        : language === "de"
        ? `${firstName
          }, es sind jetzt ${temperature}°C, es fühlt sich wie ${feelsLike}°C an, ${description.toLowerCase()} in ${cityCapitalized}, ${country}.\nDie Luftfeuchtigkeit beträgt ${humidity}%.\nSonnenaufgang um ${sunrise} Uhr, Sonnenuntergang um ${sunset} Uhr.\nIn ${
            cityCapitalized
          } ist es jetzt ${timeSearchedCity} Uhr.`
        : `${firstName
          }, it is now ${temperature}°C, it feels like ${feelsLike}°C, ${description} in ${cityCapitalized}, ${country}.\nThe air humidity is ${humidity}%.\nSunrise at ${sunrise}, sunset at ${sunset}.\nIt is ${timeSearchedCity} in ${cityCapitalized} now.`;
    return message;
  } catch (error) {
    throw new Error("ERROR_FETCH");
  }
}
