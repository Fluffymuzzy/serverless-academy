const fs = require("fs");

const filename = process.argv[2];
const data = fs.readFileSync(filename);
const vacationsData = JSON.parse(data);

const sortedData = [];

// Loop through each vacation record
vacationsData.forEach((vacation) => {
  const { user, startDate, endDate } = vacation;

  console.log(`Processing vacation record for user: ${user.name}`);

  const userIndex = sortedData.findIndex(
    (userObj) => userObj.userId === user._id
  );

  if (userIndex === -1) {
    console.log(
      `User ${user.name} does not exist in sorted data. Adding them with their first vacation.`
    );

    sortedData.push({
      userId: user._id,
      userName: user.name,
      vacations: [{ startDate, endDate }],
    });
  } else {
    console.log(
      `User ${user.name} already exists in sorted data. Adding their vacation.`
    );
    sortedData[userIndex].vacations.push({ startDate, endDate });
  }
});

// Write the sorted data to a new JSON file
fs.writeFileSync("sortedData.json", JSON.stringify(sortedData, null, 2));

console.log("Data has been sorted successfully!");
