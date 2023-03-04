const sortWords = (arr) => {
  return arr.sort((a, b) => a.localeCompare(b));
};

const sortNumbersAsc = (arr) => {
  return arr.sort((a, b) => a - b);
};

const sortNumbersDesc = (arr) => {
  return arr.sort((a, b) => b - a);
};

const sortWordsByLength = (arr) => {
  return arr.sort((a, b) => a.length - b.length);
};

const getUniqueWords = (arr) => {
  return [...new Set(arr)];
};

const getUniqueValues = (arr) => {
  return [...new Set(arr.map((x) => (isNaN(x) ? x : +x)))];
};

module.exports = {
  sortWords,
  sortNumbersAsc,
  sortNumbersDesc,
  sortWordsByLength,
  getUniqueWords,
  getUniqueValues,
};
