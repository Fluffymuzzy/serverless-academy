const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Sort words alphabetically
const sortWords = (arr) => {
  return arr.sort((a, b) => a.localeCompare(b));
};

// Show numbers from lesser to greater
const sortNumbersAsc = (arr) => {
  return arr.sort((a, b) => a - b);
};

// Show numbers from bigger to smaller
const sortNumbersDesc = (arr) => {
  return arr.sort((a, b) => b - a);
};

// Display words in ascending order by number of letters in the word
const sortWordsByLength = (arr) => {
  return arr.sort((a, b) => a.length - b.length);
};

// Show only unique words
const getUniqueWords = (arr) => {
  return [...new Set(arr)];
};

// Display only unique values from the set of words and numbers entered by the user
const getUniqueValues = (arr) => {
  return [...new Set(arr.map((x) => (isNaN(x) ? x : +x)))];
};

// our response
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
          console.log(sortNumbersAsc(input));
        case "3":
          console.log(sortNumbersDesc(input));
          break;
        case "4":
          console.log(sortWordsByLength(input));
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
    }
  );
};

rl.question("enter a few words...", (answer) => {
  inputArray = answer.split(" ");
  sort(inputArray);
});
