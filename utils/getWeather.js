export async function getWeather(city, language, apiKey, firstName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${language}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cityNameCountry = `${data.name}, ${data.sys.country}`;
    const temperature = data.main.temp.toFixed();
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
        //hour12: false,
        hourCycle: "h23",
    });
    const message =
      language === "ua"
        ? `${firstName
          }, зараз ${temperature}°C, ${description} у ${cityNameCountry}. Схід сонечка о ${sunrise}, а захід о ${sunset}. Зараз у ${
            data.name
          } ${timeSearchedCity}, різниця у часі становить ${
            differenceTimezone / 60
          } годин(и/у).`
        : language === "de"
        ? `${firstName
          }, es sind jetzt ${temperature}°C, ${description} in ${cityNameCountry}. Sonnenaufgang um ${sunrise} Uhr, Sonnenuntergang um ${sunset} Uhr. In ${
            data.name
          } ist es jetzt ${timeSearchedCity} Uhr, der Zeitunterschied beträgt ${
            differenceTimezone / 60
          } Stunde(n).`
        : `${firstName
          }, it is now ${temperature}°C, ${description} in ${cityNameCountry}. Sunrise at ${sunrise}, sunset at ${sunset}. It is ${timeSearchedCity} in ${
            data.name
          } now, the time difference is ${differenceTimezone / 60} hour(s).`;
    return message;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
