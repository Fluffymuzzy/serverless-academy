# Exchange Rate Telegram Bot
This is a Telegram bot that allows users to get the current exchange rate of USD and EUR in UAH (Ukrainian hryvnia) currency. The bot uses two APIs - PrivatBank and Monobank - to get the exchange rates and caches the results for 60 seconds to avoid sending too many requests to the APIs.

## Getting started

To use this bot, you need to have a Telegram bot token. You can get one by following the instructions on the Telegram Bot API documentation.

After obtaining a token, replace *USE_YOUR_TOKEN_HERE* with your token in the TOKEN constant in the app.js file.

You also need to have Node.js and npm installed on your machine.
To install the required packages, run the following command in the project directory:
>> npm install

To start the bot, run the following command:
>> npm start

## Usage

To start using the bot, simply send the /start command to the bot in a Telegram chat. This will display a keyboard with two options - USD and EUR. Select one of the options to get the exchange rate of the selected currency.

The bot will then send a message with the exchange rate in UAH. If the exchange rate has been fetched within the last 60 seconds, the bot will use the cached result, otherwise it will fetch the exchange rate from the APIs and cache the result.

## Caching

The bot uses the *node-cache* library to cache the exchange rate results for 60 seconds. The cache is checked every 70 seconds, and any expired items are automatically deleted.
The cache is implemented as a key-value store, where the keys are strings that include the currency code (USD or EUR) and the values are objects with the exchange rate values for USD and EUR.