import axios from "axios";
import { getWeatherEmoji } from "../utils/getWeatherEmoji.js";
import { WEATHER_API } from "../utils/constants.js";

export async function getWeatherForecast(interval) {
  const response = await axios.get(WEATHER_API);
  const forecasts = response.data.list.filter((item) => {
    const hour = new Date(item.dt_txt).getHours();
    return interval === 3 ? hour % 3 === 0 : hour % 6 === 0;
  });
  const dayToForecasts = new Map();
  forecasts.forEach((forecast) => {
    const dateTime = new Date(forecast.dt_txt);
    const day = dateTime.toLocaleString("en-US", { weekday: "long" });
    if (!dayToForecasts.has(day)) {
      dayToForecasts.set(day, []);
    }
    dayToForecasts.get(day).push(forecast);
  });
  const messages = [];
  dayToForecasts.forEach((forecasts, day) => {
    const dayOfWeek = `👉🏽${day}👈🏽`;
    const forecastMessages = forecasts.map((forecast) => {
      const dateTime = new Date(forecast.dt_txt);
      const time = dateTime.toLocaleTimeString([], { timeStyle: "short" });
      const temp = Math.round(forecast.main.temp);
      const description = forecast.weather[0].description;
      const emoji = getWeatherEmoji(forecast.weather[0].icon);
      return `${time}: ${emoji} ${temp}°C, ${description} ${emoji}`;
    });
    messages.push(dayOfWeek, ...forecastMessages);
  });
  return messages.join("\n\n");
}
