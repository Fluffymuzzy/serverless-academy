import { readVacationsData } from "./src/utils/readVacationsData.js";
import { writeSortedData } from "./src/utils/writeSortedData.js";
import { processVacationsData } from "./src/logic/processVacationsData.js";

const filename = process.argv[2];
const vacationsData = readVacationsData(filename);
const sortedData = processVacationsData(vacationsData);
writeSortedData(sortedData);
