const icons = {
  '01d': '☀️', // clear sky (day)
  '01n': '🌙', // clear sky (night)
  '02d': '🌤️', // few clouds (day)
  '02n': '☁️', // few clouds (night)
  '03d': '☁️', // scattered clouds
  '03n': '☁️', // scattered clouds
  '04d': '☁️', // broken clouds
  '04n': '☁️', // broken clouds
  '09d': '🌧️', // shower rain
  '09n': '🌧️', // shower rain
  '10d': '☔', // rain (day, umbrella with rain drops)
  '10n': '☔', // rain (night, umbrella with rain drops)
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️', // thunderstorm
  '13d': '❄️', // snow
  '13n': '❄️', // snow
  '50d': '🌫️', // mist
  '50n': '🌫️', // mist
}

export default function getWeatherIcon(icon) {
  return icons[icon];
}