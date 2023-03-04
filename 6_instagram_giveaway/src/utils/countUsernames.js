import fs from "fs";
import readline from "readline";

export async function countUsernamesInFile(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const counts = new Map();
  for await (const line of rl) {
    const usernames = line.split(" ");
    for (const username of usernames) {
      counts.set(username, (counts.get(username) || 0) + 1);
    }
  }
  return counts;
}
