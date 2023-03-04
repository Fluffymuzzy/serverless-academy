# User Management App
This is a command-line application for managing user data. It allows the user to add new users, save them to a database file, and search for existing users in the database. The application is written in JavaScript and uses the Inquirer.js library for user input and interaction.

## Getting Started
To use this application, you will need to have Node.js and npm installed on your system. Once you have these installed, you can follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the root directory of the application in your terminal.
3. Run the following command to install the required dependencies:  
>>npm install

Start the application by running the following command:
>>npm start

Follow the prompts to add new users to the database or search for existing users.

## Usage
### Adding Users
To add a new user, follow these steps:

1. Enter the user's name when prompted. If you want to stop adding users, press Enter without entering a name.
2. Select the user's gender from the list of options.
3. Enter the user's age. This field will only be prompted if a name is provided and the entered value is a number.

Once you have entered all the information for a user, you can choose to add another user by repeating these steps or press *Enter* without entering a name to stop adding users.

## Searching for Users
To search for a user in the database, follow these steps:
1. Choose to search for a user when prompted.
2. Enter the name of the user you want to search for.
3. If the user is found in the database, their information will be displayed. You will then be prompted to search for another user or exit the application.

If the user is not found in the database, you will be prompted to search again or exit the application.
## Database
The user data is stored in a file named db.txt.