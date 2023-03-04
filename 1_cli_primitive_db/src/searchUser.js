import inquirer from "inquirer";
import fs from "fs";

const searchUserByName = () => {
  let db = [];

  const askUser = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter user name to search: ",
        },
      ])
      .then(({ name }) => {
        const foundUser = db.find((user) => user.name === name);
        if (foundUser) {
          console.log(`User found: ${JSON.stringify(foundUser)}`);
        } else {
          console.log("User not found.");
        }
        askSearchAgain();
      });
  };

  const askSearchAgain = () => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "searchAgain",
          message: "Do you want to search for another user?",
        },
      ])
      .then(({ searchAgain }) => {
        if (searchAgain) {
          askUser();
        } else {
          console.log("Have a nice day!");
        }
      });
  };

  fs.readFile("db.txt", (err, data) => {
    if (err) {
      console.log("Error reading database file.");
      process.exit();
    }
    if (data.length > 0) {
      db = JSON.parse(data);
    }
    askUser();
  });
};

export default searchUserByName;
