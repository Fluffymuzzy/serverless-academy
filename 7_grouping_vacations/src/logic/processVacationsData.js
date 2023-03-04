export function processVacationsData(vacationsData) {
  const sortedData = [];

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

  return sortedData;
}
