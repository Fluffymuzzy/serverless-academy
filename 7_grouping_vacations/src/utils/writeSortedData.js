import fs from "fs";

export function writeSortedData(sortedData) {
  const outputDir = "./src/output";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = `${outputDir}/sortedData.json`;

  fs.writeFileSync(filePath, JSON.stringify(sortedData, null, 2));
}
