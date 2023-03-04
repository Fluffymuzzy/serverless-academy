import TelegramBot from "node-telegram-bot-api";

const TOKEN = "USE_YOUR_TOKEN_HERE";
const bot = new TelegramBot(TOKEN, { polling: true });

export const getChatId = (callback) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    callback(chatId);
  });
};

export const sendTextMessage = (chatId, message) => {
  bot.sendMessage(chatId, message);
};

export const sendPhoto = (chatId, path) => {
  bot.sendPhoto(chatId, path);
};
