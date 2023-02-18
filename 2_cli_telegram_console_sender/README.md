# Telegram Bot
This is a simple command-line application that allows you to interact with a Telegram bot through your terminal. The application is built using Node.js and the node-telegram-bot-api library.
## Installation
1. Clone the repository to your local machine.
2. Install the dependencies by running *npm install* in the project directory.
3. Obtain a token for your Telegram bot from the BotFather and replace the placeholder *USE_YOUR_TOKEN_HERE* in the app.js file with your actual token.
4. Run the application using *node app.js*

## Usage
The application provides the following commands:
- *get-chat-id (g)*: Retrieves the chat ID for the Telegram bot. To use this command, start a conversation with your bot on Telegram and send the */start* command to it. Then, run the *get-chat-id* command in your terminal. The chat ID will be printed in the console.
- *send-message <message> (m)*: Sends a message to the Telegram bot. The message should be passed as an argument to the command. You can also specify the chat ID of the recipient using the *-c or --chat-id* option.
- *send-photo <path> ( p)*: Sends a photo to the Telegram bot. The path to the photo file should be passed as an argument to the command. You can also specify the chat ID of the recipient using the *-c or --chat-id* option.

To run a command, use the following syntax:
>>node index.js *command* [options]

For example, to send a message to the bot with the chat ID 12345, you can run:
>>node index.js send-message "Hello, bot!" -c 12345
