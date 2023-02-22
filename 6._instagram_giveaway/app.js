const fs = require("fs");
const readline = require("readline");


async function countUsernamesInFile(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const counts = {};
  for await (const line of rl) {
    const usernames = line.split(" ");
    for (const username of usernames) {
      counts[username] = (counts[username] || 0) + 1;
    }
  }
  return counts;
}


async function uniqueValue() {
  console.time("uniqueValues");
  for (let i = 1; i <= 20; i++) {
    const filename = `words/out${i}.txt`;
    const fileCounts = await countUsernamesInFile(filename);
    console.log(fileCounts);
  }
}

async function main() {
  const uniqueCount = await uniqueValue();
}

main();
