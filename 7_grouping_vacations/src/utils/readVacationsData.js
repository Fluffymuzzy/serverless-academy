import fs from "fs";

export function readVacationsData(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}
