const getData = require("../index");

const data = getData("../data/day1.txt");

const getLists = (data) => {
  const listOne = [];
  const listTwo = [];
  data.forEach((element) => {
    const [elOne, elTwo] = element.split("   ");
    listOne.push(elOne);
    listTwo.push(elTwo);
  });

  return {
    listOne,
    listTwo,
  };
};

const countDistance = (num1, num2) => Math.abs(num1 - num2);

const getDistanceList = (arr1, arr2) => {
  const listDistance = [];
  for (let i = 0; i < arr1.length; i++) {
    const distance = countDistance(arr1[i], arr2[i]);
    listDistance.push(distance);
  }
  return listDistance;
};

const getSimilarityList = (arr1, arr2) => {
  const listSimilarity = [];
  for (let i = 0; i < arr1.length; i++) {
    const occurrenceNumber = arr2.filter((item) => item === arr1[i]).length;
    listSimilarity.push(occurrenceNumber * arr1[i]);
  }
  return listSimilarity;
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
