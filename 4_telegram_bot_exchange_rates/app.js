const NodeCache = require("node-cache");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Initialize the Telegram bot with your bot token
const TOKEN = "6201228619:AAEjpwLf4ymsP2bMXlm_ueUUFb7QJWIf08I";
const bot = new TelegramBot(TOKEN, { polling: true });

// The cache
const cache = new NodeCache({ stdTTL: 60, checkperiod: 70 });

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

// Function to get the exchange rate from PrivatBank API
async function getPrivatExchangeRate() {
  try {
    const response = await axios.get(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
    );
    const usdRate = response.data.find((rate) => rate.ccy === "USD").buy;
    const eurRate = response.data.find((rate) => rate.ccy === "EUR").buy;
    return { usd: usdRate, eur: eurRate };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to get the exchange rate from Monobank API
async function getMonoExchangeRate() {
  try {
    const response = await axios.get("https://api.monobank.ua/bank/currency");
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid Monobank API response");
    }
    const usdRateObj = response.data.find(
      (rate) => rate.currencyCodeA === 840 && rate.currencyCodeB === 980
    );
    const eurRateObj = response.data.find(
      (rate) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980
    );
    if (!usdRateObj || !eurRateObj) {
      throw new Error("Missing exchange rate data in Monobank API response");
    }
    return { usd: usdRateObj.rateBuy, eur: eurRateObj.rateBuy };
  } catch (error) {
    console.error(error);
    return null;
  }
}

//  Round a number to the nearest kopeck value
function roundKopecks(number) {
  return Math.round(number * 100) / 100;
}

// Handle the currency button clicks
bot.onText(/USD|EUR/, async (msg, match) => {
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
});
