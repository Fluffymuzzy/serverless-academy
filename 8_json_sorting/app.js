import { ENDPOINTS } from "./src/endpoints/endpoints.js";
import { getData } from "./src/utils/getData.js";

(async function () {
  const results = await Promise.all(ENDPOINTS.map(getData));
  const trueCount = results.filter((result) => result === true).length;
  const falseCount = results.filter((result) => result === false).length;
  console.log(`Found True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
  console.log(
    `Found Undefined values: ${results.length - trueCount - falseCount}`
  );
})();
