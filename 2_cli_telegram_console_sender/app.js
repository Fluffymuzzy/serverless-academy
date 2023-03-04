import { Command } from "commander";
import { getChatId, sendTextMessage, sendPhoto } from "./src/bot.js";

const commander = new Command();

commander
  .command("get-chat-id")
  .alias("g")
  .description("Get the chat ID for the Telegram bot")
  .action(() => {
    getChatId((chatId) => {
      console.log(`Chat ID: ${chatId}`);
    });
  });

commander
  .command("send-message <message>")
  .alias("m")
  .description("Send a message to the Telegram bot")
  .option("-c, --chat-id <value>", "Chat ID of the recipient")
  .action((message, options) => {
    const chatId = options.chatId;
    sendTextMessage(chatId, message);
    console.log("Message sent successfully!");
  });

commander
  .command("send-photo <path>")
  .alias("p")
  .description("Send a photo to the Telegram bot")
  .option("-c, --chat-id <value>", "Chat ID of the recipient")
  .action((path, options) => {
    const chatId = options.chatId;
    sendPhoto(chatId, path);
    console.log("Photo sent successfully!");
  });

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
