import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import { getWeatherEmoji } from "./getWeatherEmoji.js";
import { TOKEN, WEATHER_API } from "./constants.js";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

// Handle the "/start" command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! To get the weather forecast for Kyiv, please choose the forecast interval:",
    {
      reply_markup: {
        keyboard: [
          [{ text: "at intervals of 3 hours" }],
          [{ text: "at intervals of 6 hours" }],
        ],
        one_time_keyboard: true,
      },
    }
  );
});

// Function that gets the weather forecast using OpenWeather API
async function getWeatherForecast(interval) {
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

// The forecast interval selection
bot.onText(/at intervals of (\d+) hours/, async (msg, match) => {
  const chatId = msg.chat.id;
  const interval = parseInt(match[1], 10);
  try {
    const forecast = await getWeatherForecast(interval);
    bot.sendMessage(chatId, forecast);
  } catch (error) {
    console.error(error);
    bot.sendMessage(
      chatId,
      "Sorry, an error occurred while getting the weather forecast."
    );
  }
});
