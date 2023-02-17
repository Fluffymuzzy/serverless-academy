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

async function getWeatherForecast(interval) {
  const response = await axios.get(WEATHER_API);
  console.log(response);
}

getWeatherForecast()