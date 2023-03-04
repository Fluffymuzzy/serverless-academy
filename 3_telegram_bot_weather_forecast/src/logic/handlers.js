import { getWeatherForecast } from "./weather.js";
import { bot } from "../../app.js";

export async function handleStartCommand(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! To get the weather forecast for Kyiv, please choose the forecast interval:",
    {
      reply_markup: {
        keyboard: [["at intervals of 3 hours"], ["at intervals of 6 hours"]],
        one_time_keyboard: true,
      },
    }
  );
}

export async function handleIntervalSelection(msg, match) {
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
}
