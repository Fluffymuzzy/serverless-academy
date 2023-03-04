import { countUsernamesInFile } from "./src/utils/countUsernames.js";

async function uniqueValues() {
  const counts = new Map();
  for (let i = 0; i <= 19; i++) {
    const filename = `src/data/out${i}.txt`;
    const fileCounts = await countUsernamesInFile(filename);
    for (const [username, count] of fileCounts) {
      const totalCount = counts.get(username) || 0;
      counts.set(username, totalCount + 1);
    }
  }
  const uniqueCount = counts.size;
  console.log(
    `Found ${uniqueCount} unique usernames in 2 million word combinations.`
  );
  return uniqueCount;
}

async function existInAllFiles() {
  let allCounts = null;
  for (let i = 0; i <= 19; i++) {
    const filename = `src/data/out${i}.txt`;
    const fileCounts = await countUsernamesInFile(filename);
    if (!allCounts) {
      allCounts = new Set(fileCounts.keys());
    } else {
      const newCounts = new Set(fileCounts.keys());
      allCounts = new Set(
        [...allCounts].filter((username) => newCounts.has(username))
      );
    }
  }
  const allCount = allCounts.size;
  console.log(`Found ${allCount} usernames that exist in all 20 files.`);
  return allCount;
}

async function existInAtleastTen() {
  const counts = new Map();
  for (let i = 0; i <= 19; i++) {
    const filename = `src/data/out${i}.txt`;
    const fileCounts = await countUsernamesInFile(filename);
    for (const [username, count] of fileCounts) {
      counts.set(username, (counts.get(username) || 0) + 1);
    }
  }
  const atleastTenCount = [...counts.values()].filter((count) => count >= 10)
    .length;
  console.log(
    `Found ${atleastTenCount} usernames that exist in at least 10 files.`
  );
  return atleastTenCount;
}

async function main() {
  await uniqueValues();
  await existInAllFiles();
  await existInAtleastTen();
  console.log("That's it.");
}

main();
