import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

// const WEATHER_API_KEY = "3a0c7ecb3067b5a3642dc54fa97ccc13";
const TOKEN = "6174038904:AAHxlxPPpyOZqWt511_zGSwlyBm_XHV7v1I";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome!", {
    reply_markup: {
      keyboard: [
        { text: "at intervals of 3 hours" },
        { text: "at intervals of 6 hours" },
      ],
    },
  });
});
