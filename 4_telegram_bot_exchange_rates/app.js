const NodeCache = require("node-cache");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Initialize the Telegram bot with your bot token
const TOKEN = '6201228619:AAEjpwLf4ymsP2bMXlm_ueUUFb7QJWIf08I';
const bot = new TelegramBot(TOKEN, { polling: true });

// Function to handle the /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const message = "Select the currency to get the exchange rate:";
  const options = {
    reply_markup: {
      keyboard: [["USD"], ["EUR"]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  };
  bot.sendMessage(chatId, message, options);
});