const getData = require("../index");

const data = getData("../data/day1.txt");

const getLists = (data) => {
  const listOne = data.map((element) => element.split("   ")[0]);
  const listTwo = data.map((element) => element.split("   ")[1]);

  return {
    listOne,
    listTwo,
  };
};

const countDistance = (num1, num2) => Math.abs(num1 - num2);

const getDistanceList = (arr1, arr2) => {
  return arr1.map((item, index) => countDistance(item, arr2[index]));
};

const getSimilarityList = (arr1, arr2) => {
  return arr1.map((item) => arr2.filter((el) => item === el).length * item);
};

const part1 = (input) => {
  const { listOne, listTwo } = getLists(input);
  return getDistanceList(listOne.sort(), listTwo.sort()).reduce(
    (acc, sum) => sum + acc,
    0
  );
};

const part2 = (input) => {
  const { listOne, listTwo } = getLists(input);
  return getSimilarityList(listOne, listTwo).reduce((acc, sum) => acc + sum, 0);
};

console.log(part1(data));
console.log(part2(data));
