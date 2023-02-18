# Telegram Weather Bot
This is a simple Telegram bot that provides weather forecast for Kyiv city. The bot uses the OpenWeather API to retrieve weather information and sends a formatted message with the forecast to the user.

## Getting started:

1. Clone the repository
2. Install dependencies:
>>npm install
3. Set up the OpenWeather API key:
 >>You need to sign up for the OpenWeather API and get an API key. Then replace the *WEATHER_API_KEY* constant in the *constants.js* file with your API key.
4. Set up the Telegram bot:
>>You need to create a new bot and get the API token from the BotFather. Replace the API token in the *constants.js* file with your bot's API token.
5. Start the bot:
>> node app.js

## Usage

To start using the bot, send the "/start" command to the bot in Telegram. The bot will ask you to choose the forecast interval - either every 3 hours or every 6 hours. Once you select the interval, the bot will retrieve the weather forecast for Kyiv city and send it to you in a formatted message.

## Customization

You can customize the bot by modifying the getWeatherForecast function in the app.js file. The function retrieves the weather forecast for Kyiv city and formats it into a message. You can modify the formatting or even retrieve weather information for a different city by changing the API call in the function.