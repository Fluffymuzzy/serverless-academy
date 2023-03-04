// validation of incoming data
const isValidInput = (inputArr) => {
  return inputArr.length >= 2 && inputArr.length <= 10;
};

module.exports = { isValidInput };
