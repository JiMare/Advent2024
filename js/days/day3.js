const fs = require("fs");

const content = fs.readFileSync("../data/day3.txt", "utf8");

const part1 = (input) => {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const mul = (num1, num2) => num1 * num2;
  return input
    .match(pattern)
    .map((operation) => eval(operation))
    .reduce((acc, sum) => acc + sum, 0);
};

console.log(part1(content)); //170807108
