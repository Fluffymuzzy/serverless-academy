const TelegramBot = require("node-telegram-bot-api");
const commander = require("commander");
const token = "5507382020:AAH0D-SCqeZew2HSviewaxAnajbm7BuhOxA";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  console.log(`Chat ID: ${chatId}`);
  process.exit();
});