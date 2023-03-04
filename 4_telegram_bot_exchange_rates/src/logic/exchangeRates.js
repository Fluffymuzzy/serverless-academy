import axios from "axios";

// Function to get the exchange rate from PrivatBank API
export async function getPrivatExchangeRate() {
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
export async function getMonoExchangeRate() {
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
