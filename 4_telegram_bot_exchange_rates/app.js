import TelegramBot from "node-telegram-bot-api";

import { handleStartCommand, handleCurrencyButton } from "./src/logic/handlers.js";
// Initialize the Telegram bot with your bot token
const TOKEN = "USE_YOUR_TOKEN_HERE";

export const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, handleStartCommand);
bot.onText(/USD|EUR/, handleCurrencyButton);

