import inquirer from "inquirer";
import fs from "fs";

const addUser = (callback) => {
  let db = [];

  const askUser = () => {
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
      .then(({ name, gender, age }) => {
        if (name) {
          db.push({ name: name, gender: gender, age: age });
          askUser();
        } else {
          saveData(db);
          callback();
        }
      });
  };

  const saveData = (data) => {
    fs.writeFileSync("./db.txt", JSON.stringify(data));
    console.log("All users:");
    console.log(data);
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
export default addUser;
