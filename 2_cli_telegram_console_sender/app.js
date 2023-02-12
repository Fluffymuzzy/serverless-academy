const TelegramBot = require("node-telegram-bot-api");
const commander = require("commander");
// Use here the token you received in the BotFather
const token = "USE_YOUR_TOKEN_HERE";
const bot = new TelegramBot(token, { polling: true });

// Get Chat ID
function getChatId() {
  bot.onText(/\/start/, (msg) => {
    chatId = msg.chat.id;
    console.log(`Chat ID: ${chatId}`);
    process.exit();
  });
}

commander
  .command("get-chat-id")
  .alias("g")
  .description("Get the chat ID for the Telegram bot")
  .action(() => {
    getChatId();
  });

//  Sending a message to the Telegram bot.
commander
  .command("send-message <message>")
  .alias("m")
  .description("Send a message to the Telegram bot")
  .option("-c, --chat-id <value>", "Chat ID of the recipient")
  .action((message, options) => {
    bot
      .sendMessage(options.chatId, message)
      .then(() => {
        console.log("Message sent successfully!");
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });

// Sending a photo to the Telegram bot.
commander
  .command("send-photo <path>")
  .alias("p")
  .description("Send a photo to the Telegram bot")
  .option("-c, --chat-id <value>", "Chat ID of the recipient")
  .action((path, options) => {
    bot
      .sendPhoto(options.chatId, path)
      .then(() => {
        console.log("Photo sent successfully!");
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
