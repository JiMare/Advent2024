const getData = require("../index");

const data = getData("../data/day9.txt");
const input = data[0];

const part1 = () => {
  const inputArr = input.split("");
  const baseLine = [];
  let fileId = 0;
  inputArr.forEach((value, index) => {
    if (index % 2 === 0) {
      for (let i = 0; i < value; i++) {
        baseLine.push(fileId);
      }
      fileId++;
    } else {
      for (let i = 0; i < value; i++) {
        baseLine.push(".");
      }
    }
  });

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
    .reduce((acc, value, index) => acc + value * index);

  return count;
};

console.log(part1()); //6241633730082