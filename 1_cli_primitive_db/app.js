import inquirer from "inquirer";
import fs from "fs";

let db = [];
//  A function that is asking the user to input information.
const addUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the user name (press Enter to stop adding users): ",
      },
      {
        type: "list",
        name: "gender",
        message: "Select gender:",
        choices: ["Male", "Female"],
        when: ({ name }) => name,
      },
      {
        type: "input",
        name: "age",
        message: "Enter age:",
        when: ({ name }) => name,
        validate: (age) => !isNaN(age),
      },
    ])
    // Push (P) data from the user's input into the database.
    .then(({ name, gender, age }) => {
      if (name) {
        db.push({ name: name, gender: gender, age: age });
        addUser();
      } else {
        fs.writeFileSync("./db.txt", JSON.stringify(db));
        console.log("All users:");
        console.log(db);
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "searchUser",
              message: "Do you want to search for a user?",
            },
          ])
          .then(({ searchUser }) => {
            if (searchUser) {
              searchUserByName();
            } else {
              console.log("Bye...");
            }
          });
      }
    });
};

// The function looks up the user in the database.
const searchUserByName = () => {
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
              searchUserByName();
            } else {
              console.log("Have a nice day!");
            }
          });
      } else {
        console.log("User not found.");
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
              searchUserByName();
            } else {
              console.log("Dopobachennya!");
            }
          });
      }
    });
};

//  Reading the database file.
fs.readFile("db.txt", (err, data) => {
  if (err) {
    console.log("Error reading database file.");
    process.exit();
  }
  if (data.length > 0) {
    db = JSON.parse(data);
  }
  addUser();
});
