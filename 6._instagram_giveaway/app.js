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

async function uniqueUsernames() {
  const counts = {};
  for (let i = 1; i <= 19; i++) {
    const filename = `words/out${i}.txt`;
    const fileCounts = await countUsernamesInFile(filename);
    for (const [username, count] of Object.entries(fileCounts)) {
      counts[username] = (counts[username] || 0) + 1;
    }
  }
  const uniqueCount = Object.keys(counts).length;
  console.log(
    `Found ${uniqueCount} unique usernames in 2 million word combinations.`
  );
  return uniqueCount;
}

async function main() {
  const uniqueCount = await uniqueUsernames();
}

main();
