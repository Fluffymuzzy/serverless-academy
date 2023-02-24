# Grouping Vacations
This is a Node.js application that transforms vacation data in a JSON file into a more convenient and universal form. It takes a JSON file with a list of developers, where each developer has a unique id, name, and different vacation periods, and converts it into a new JSON file with each user occurring once, an array of their vacations, and only three keys: userId, userName, and vacations.
## Usage
To use the application, follow these steps:
1. Install Node.js on your computer if you haven't already done so.
2. Clone or download this repository to your local machine.
3. Open a terminal window and navigate to the directory where you saved the repository.
4. Install the required dependencies by running the following command:
>> npm install
5. Put your input file in the data directory.
6. Run the following command in the terminal to transform the data:
>> npm start
7. The transformed data will be saved in the new file.