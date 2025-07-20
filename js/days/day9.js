const getData = require("../index");

const data = getData("../data/day9.txt");
const input = data[0];

const getBaselineAndBlocks = () => {
  const inputArr = input.split("");
  const baseLine = [];
  const fileBlocks = new Map(); // fileId -> { start, length }

  let fileId = 0;
  let index = 0;

  inputArr.forEach((value, i) => {
    const count = parseInt(value);
    if (i % 2 === 0) {
      // file block
      fileBlocks.set(fileId, { start: index, length: count });
      for (let j = 0; j < count; j++) {
        baseLine.push(fileId);
        index++;
      }
      fileId++;
    } else {
      // free space
      for (let j = 0; j < count; j++) {
        baseLine.push(".");
        index++;
      }
    }
  });

  return { baseLine, fileBlocks };
};

const part1 = () => {
  const { baseLine } = getBaselineAndBlocks();

  const dotCountLength = baseLine.filter((item) => item === ".").length;

  let j = baseLine.length - 1;

  while (
    !baseLine.join("").endsWith(Array(dotCountLength).fill(".").join(""))
  ) {
    const fileToMove = baseLine[j];
    let firstDotIndex = baseLine.indexOf(".");
    baseLine[firstDotIndex] = fileToMove;
    baseLine[j] = ".";
    j--;
  }

  const count = baseLine
    .filter((value) => value !== ".")
    .reduce((acc, value, index) => acc + value * index, 0);

  return count;
};

const part2 = () => {
  const { baseLine, fileBlocks } = getBaselineAndBlocks();

  const fileIds = Array.from(fileBlocks.keys()).sort((a, b) => b - a);

  for (const fileId of fileIds) {
    const { start, length } = fileBlocks.get(fileId);

    //find leftmost dots same minimum length
    let dotsStartIndex = -1;
    let count = 0;

    for (let i = 0; i < start; i++) {
      if (baseLine[i] === ".") {
        count++;
        if (count === length) {
          dotsStartIndex = i - length + 1;
          break;
        }
      } else {
        dotsStartIndex = -1;
        count = 0;
      }
    }

    //remove block
    if (dotsStartIndex !== -1) {
      for (let y = 0; y < length; y++) {
        baseLine[dotsStartIndex + y] = fileId;
        baseLine[start + y] = ".";
      }
    }
  }

  const sum = baseLine.reduce(
    (acc, value, index) => (value === "." ? acc : acc + value * index),
    0
  );

  return sum;
};

console.log(part1()); //6241633730082
console.log(part2()); //6265268809555
