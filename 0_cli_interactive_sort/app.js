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

let inputArray = [];
const sort = (input) => {
  rl.question(
    "How would you like to sort the input?",
    "1. let's sort words",
    (answer) => {
      switch (answer) {
        case "1":
          console.log(sortWords(input));
          break;
      }
    }
  );
};

rl.question("enter a few words...", (answer) => {
  inputArray = answer.split(" ");
  sort(inputArray);
});
