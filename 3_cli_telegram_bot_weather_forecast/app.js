import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const WEATHER_API_KEY = "3a0c7ecb3067b5a3642dc54fa97ccc13";
const TOKEN = "6174038904:AAHxlxPPpyOZqWt511_zGSwlyBm_XHV7v1I";
const UNITS = `&units=metric`;
const CITY = `&q=Kyiv`;
const API = `https://api.openweathermap.org/data/2.5/forecast?appid=`;
const WEATHER_API = API + WEATHER_API_KEY + CITY + UNITS;
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
    console.log(day);
    if (!dayToForecasts.has(day)) {
      dayToForecasts.set(day, []);
    }
    dayToForecasts.get(day).push(forecast);
  });
  const messages = [];
  dayToForecasts.forEach((forecasts, day) => {
    const dayOfWeek = `👉🏽${day}:👈🏽\n`;
    console.log(dayOfWeek);
    const forecastMessages = forecasts.map((forecast) => {
      const dateTime = new Date(forecast.dt_txt);
      const time = dateTime.toLocaleTimeString([], { timeStyle: "short" });
      console.log(time);
      const temp = Math.round(forecast.main.temp);
      const description = forecast.weather[0].description;
      return `${time}: ${temp}°C, ${description}`;
    });
    messages.push(dayOfWeek, ...forecastMessages);
  });
  console.log(messages.join("\n\n"));
}

getWeatherForecast();
