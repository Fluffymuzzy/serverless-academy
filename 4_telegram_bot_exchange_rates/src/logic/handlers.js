import NodeCache from "node-cache";
import { roundKopecks } from "../utils/roundKopecks.js";
import { getPrivatExchangeRate, getMonoExchangeRate } from "./exchangeRates.js";
import { bot } from "../../app.js";

// The cache
const cache = new NodeCache({ stdTTL: 65, checkperiod: 70 });

// Function to handle the /start command
export async function handleStartCommand(msg) {
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
}

// Handle the currency button clicks
export async function handleCurrencyButton(msg, match) {
  const chatId = msg.chat.id;
  const currency = match[0];
  const cacheKey = `exchange_rate_${currency}`;
  let exchangeRate = cache.get(cacheKey);
  if (exchangeRate) {
    bot.sendMessage(
      chatId,
      `1 ${currency} = ${roundKopecks(exchangeRate)} UAH`
    );
  } else {
    const getExchangeRate =
      currency === "USD" ? getPrivatExchangeRate : getMonoExchangeRate;
    exchangeRate = await getExchangeRate();
    if (exchangeRate) {
      exchangeRate.usd = Math.round(exchangeRate.usd * 100) / 100;
      exchangeRate.eur = Math.round(exchangeRate.eur * 100) / 100;
      cache.set(cacheKey, exchangeRate);
      bot.sendMessage(
        chatId,
        `1 ${currency} = ${roundKopecks(
          exchangeRate[currency.toLowerCase()]
        )} UAH`
      );
    } else {
      bot.sendMessage(chatId, "Failed to get the exchange rate");
    }
  }
}
