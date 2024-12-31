const getData = require("../index");

const data = getData("../data/day5.txt");

const [rules, pages] = [
  data.slice(0, data.indexOf("")),
  data.slice(data.indexOf("") + 1),
];

const getRelevantRules = (rowArr, rules) => {
  return rules.filter((rule) => {
    const [ruleX, ruleY] = rule.split("|");
    return rowArr.includes(ruleX) || rowArr.includes(ruleY);
  });
};

const isRowInOrder = (row) => {
  const rowArr = row.split(",");
  const rowRelevantRules = getRelevantRules(rowArr, rules);
  let inOrder = true;
  rowArr.forEach((page) => {
    const pageRelevantRules = getRelevantRules([page], rowRelevantRules);
    pageRelevantRules.forEach((rule) => {
      const [ruleX, ruleY] = rule.split("|");
      if (
        (ruleX === page &&
          rowArr.includes(ruleY) &&
          rowArr.indexOf(page) > rowArr.indexOf(ruleY)) ||
        (ruleY === page &&
          rowArr.includes(ruleX) &&
          rowArr.indexOf(page) < rowArr.indexOf(ruleY))
      ) {
        inOrder = false;
        return;
      }
    });
  });
  return inOrder;
};

const getMiddlePage = (row) => {
  const rowArr = row.split(",");
  const middleIndex = Math.floor(rowArr.length / 2);
  return rowArr[middleIndex];
};

const part1 = () => {
  return pages
    .filter((row) => isRowInOrder(row))
    .map((row) => getMiddlePage(row))
    .reduce((acc, sum) => acc + +sum, 0);
};

const part2 = (input) => {};

console.log(part1()); //5747
//console.log(part2(data)); //
