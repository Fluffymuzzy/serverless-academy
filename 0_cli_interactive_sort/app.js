const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("let's start here.", (answer) => {
  console.log(`${answer}`);
  rl.close();
});
