import inquirer from "inquirer";
import fs from "fs";

let db = [];
//  A function that is asking the user to input information.
const addUser = (user) => {
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
      },
      {
        type: "input",
        name: "age",
        message: "Enter age:",
      },
    ])
    // Push (P) data from the user's input into the database.
    .then(({ name, gender, age }) => {
      if (name) {
        db.push({ name: name, gender: gender, age: age });
        addUser();
      } else {
        // Put data into database.
        fs.writeFileSync("./db.txt", JSON.stringify(db));
        console.log("All users:");
        console.log(db);
        // Ask the user if they want to search for a users in db.
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

const searchUserByName = () => {
  console.log("sup mate ?");
};

addUser();
