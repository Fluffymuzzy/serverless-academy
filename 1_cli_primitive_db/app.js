import inquirer from "inquirer";

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
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });
