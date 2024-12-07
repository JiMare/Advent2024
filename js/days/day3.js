const fs = require("fs");

const content = fs.readFileSync("../data/day3.txt", "utf8");

const mul = (num1, num2) => num1 * num2;

const part1 = (input) => {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
  return input
    .match(pattern)
    .map((operation) => eval(operation))
    .reduce((acc, sum) => acc + sum, 0);
};

const part2 = (input) => {
  const pattern = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g;
  let countableArr = [];
  const filteredContent = input.match(pattern);
  let countable = true;
  for (let i = 0; i < filteredContent.length; i++) {
    if (countable && filteredContent[i].startsWith("mul")) {
      countableArr.push(filteredContent[i]);
    }
    if (filteredContent[i].startsWith("don")) {
      countable = false;
    } else if (filteredContent[i].startsWith("do")) {
      countable = true;
    }
  }

  return countableArr
    .map((operation) => eval(operation))
    .reduce((acc, sum) => acc + sum, 0);
};

console.log(part1(content)); //170807108
console.log(part2(content)); //74838033
