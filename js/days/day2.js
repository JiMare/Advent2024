const getData = require("../index");

const data = getData("../data/day2.txt");

const getLevelValues = (row) => {
  return row.split(" ").map((value) => +value);
};

const isIntervalSafe = (level) => {
  for (let i = 0; i < level.length - 1; i++) {
    if (
      Math.abs(level[i] - level[i + 1]) < 1 ||
      Math.abs(level[i] - level[i + 1]) > 3
    ) {
      return false;
    }
  }
  return true;
};

const isAllIncrease = (level) => {
  for (let i = 0; i < level.length - 1; i++) {
    if (level[i] - level[i + 1] <= 0) {
      return false;
    }
  }
  return true;
};

const isAllDecrease = (level) => {
  for (let i = 0; i < level.length - 1; i++) {
    if (level[i] - level[i + 1] > 0) {
      return false;
    }
  }
  return true;
};

const isLevelSafe = (level) => {
  //check interval between numbers
  if (!isIntervalSafe(level)) return false;

  //check all numbers increase or decrease in row
  if (level[0] - level[1] > 0) {
    if (!isAllIncrease(level)) return false;
  } else {
    if (!isAllDecrease(level)) {
      return false;
    }
  }

  return true;
};

const isTolerateLevelSafe = (level) => {
  if (isLevelSafe(level)) {
    return true;
  }

  for (let i = 0; i < level.length; i++) {
    const copyLevel = [...level];
    copyLevel.splice(i, 1);
    if (isLevelSafe(copyLevel)) {
      return true;
    }
  }
  return false;
};

const part1 = (input) => {
  return input
    .map((row) => isLevelSafe(getLevelValues(row)))
    .filter((level) => level).length;
};

const part2 = (input) => {
  return input
    .map((row) => isTolerateLevelSafe(getLevelValues(row)))
    .filter((level) => level).length;
};

console.log(part1(data)); //287
console.log(part2(data)); //354
