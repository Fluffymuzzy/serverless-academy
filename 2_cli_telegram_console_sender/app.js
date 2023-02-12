const TelegramBot = require("node-telegram-bot-api");
const commander = require("commander");
const token = "5507382020:AAH0D-SCqeZew2HSviewaxAnajbm7BuhOxA";
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
