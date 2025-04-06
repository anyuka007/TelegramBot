import fetch from "node-fetch";
import getWeatherIcon from "./getWeatherIcon.js";

export async function getWeather(city, language) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric&lang=${language}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data: ", data);
    const cityCapitalized = city[0].toUpperCase() + city.slice(1);
    const country = data.sys.country;
    const temperature = data.main.temp.toFixed();
    const feelsLike = data.main.feels_like.toFixed();
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const dataIcon = data.weather[0].icon;
    const descriptionIcon = getWeatherIcon(dataIcon);
    const windSpeed = data.wind.speed.toFixed();
    const gusts = data.wind.gust ? data.wind.gust.toFixed() : null;
    const gustsEmoji = gusts
  ? gusts < 5
    ? "🍃" // light wind
    : gusts < 10
    ? "🌬️" // middle
    : gusts < 20
    ? "🌬️🍃🚩" // strong
    : "🌪️⚠️" // very strong
  : null;
    //const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

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
        ? `Поточна погода у місті *${cityCapitalized}, ${country}*:\n\n${descriptionIcon} *${description[0].toUpperCase()+description.slice(1)}*\n🌡️ *Температура:* ${temperature}°C\n🤔 *Відчувається як:* ${feelsLike}°C\n💧 *Вологість:* ${humidity}%\n💨 *Швидкість вітру*: ${windSpeed} м/с${gusts ? `\n${gustsEmoji} *Пориви вітру:* до ${gusts} м/с` : ""}\n\n🌅 *Схід сонця:* ${sunrise}\n🌇 *Захід сонця:* ${sunset}\n🕒 *Час у місті:* ${timeSearchedCity}`   
        : language === "de"
        ? `Aktuelles Wetter in *${cityCapitalized}, ${country}*:\n\n*${descriptionIcon} ${description[0].toUpperCase()+description.slice(1)}*\n🌡️ *Temperatur:* ${temperature}°C\n🤔 *Gefühlt wie:* ${feelsLike}°C\n💧 *Luftfeuchtigkeit:* ${humidity}%\n💨 *Windgeschwindigkeit*: ${windSpeed} m/s${gusts ? `\n${gustsEmoji} *Windböen:* bis zu ${gusts} m/s` : ""}\n\n🌅 *Sonnenaufgang:* ${sunrise}\n🌇 *Sonnenuntergang:* ${sunset}\n🕒 *Aktuelle Zeit:* ${timeSearchedCity}`
        : `Current weather in *${cityCapitalized}, ${country}*:\n\n*${descriptionIcon} ${description[0].toUpperCase()+description.slice(1)}*\n🌡️ *Temperature:* ${temperature}°C\n🤔 *Feels like:* ${feelsLike}°C\n💧 *Humidity:* ${humidity}%\n💨 *Wind speed*: ${windSpeed} m/s${gusts ? `\n${gustsEmoji} *Wind gusts:* up to ${gusts} m/s` : ""}\n\n🌅 *Sunrise:* ${sunrise}\n🌇 *Sunset:* ${sunset}\n🕒 *Current time:* ${timeSearchedCity}`;  
    return message;
  } catch (error) {
    throw new Error("ERROR_FETCH");
  }
}
