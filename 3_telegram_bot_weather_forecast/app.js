import TelegramBot from "node-telegram-bot-api";
import {
  handleStartCommand,
  handleIntervalSelection,
} from "./src/logic/handlers.js";
import { TOKEN } from "./src/utils/constants.js";

export const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, handleStartCommand);
bot.onText(/at intervals of (\d+) hours/, handleIntervalSelection);
