const { createInterface } = require("readline");
const {
  sortWords,
  sortNumbersAsc,
  sortNumbersDesc,
  sortWordsByLength,
  getUniqueWords,
  getUniqueValues,
} = require("./src/sort.js");
const { isValidInput } = require("./src/validation.js");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputArray = [];

const sort = (input) => {
  rl.question(
    "How would you like to sort the input?\n" +
      "1. Sort words alphabetically\n" +
      "2. Show numbers from lesser to greater\n" +
      "3. Show numbers from bigger to smaller\n" +
      "4. Display words in ascending order by number of letters in the word\n" +
      "5. Show only unique words\n" +
      "6. Display only unique values from the set of words and numbers entered by the user\n" +
      "7. To exit the program, enter 'exit'\n",
    (answer) => {
      switch (answer) {
        case "1":
          console.log(sortWords(input));
          break;
        case "2":
          console.log(sortNumbersAsc(input.filter((x) => !isNaN(x))));
          break;
        case "3":
          console.log(sortNumbersDesc(input.filter((x) => !isNaN(x))));
          break;
        case "4":
          console.log(sortWordsByLength(input.filter((x) => isNaN(x))));
          break;
        case "5":
          console.log(getUniqueWords(input));
          break;
        case "6":
          console.log(getUniqueValues(input));
          break;
        case "exit":
          rl.close;
          break;
        default:
          console.log("Invalid option");
      }
      if (answer !== "exit") {
        sort(inputArray);
      }
    }
  );
};

const letsStartAgain = () =>
  rl.question(
    "Enter a few words or numbers separated by a space:",
    (answer) => {
      inputArray = answer.split(" ");
      if (isValidInput(inputArray)) {
        sort(inputArray);
      } else {
        console.log(
          "Error: Please enter between 2 and 10 values separated by a space"
        );
        console.log("Do you want to try again? (yes/no)");
        rl.question("", (answer) => {
          if (answer === "yes") {
            letsStartAgain();
          } else {
            rl.close();
          }
        });
      }
    }
  );

letsStartAgain();
