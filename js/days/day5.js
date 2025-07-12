const getData = require("../index");

const data = getData("../data/day5.txt");

const [rules, pages] = [
  data.slice(0, data.indexOf("")),
  data.slice(data.indexOf("") + 1),
];

const getRelevantRules = (rowArr, rules, isForPage) => {
  return rules.filter((rule) => {
    const [ruleX, ruleY] = rule.split("|");
    return isForPage
      ? rowArr.includes(ruleX) || rowArr.includes(ruleY)
      : rowArr.includes(ruleX) && rowArr.includes(ruleY);
  });
};

const isRowInOrder = (row) => {
  const rowArr = row.split(",");
  const rowRelevantRules = getRelevantRules(rowArr, rules, false);
  let inOrder = true;
  rowArr.forEach((page) => {
    const pageRelevantRules = getRelevantRules([page], rowRelevantRules, true);
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

// computing unreal
const reordered = (row) => {
  const rowArr = row.split(",");
  let rightOrderedRow;

  const permute = (current, remaining) => {
    if (rightOrderedRow) return;
    if (remaining.length === 0) {
      const candidate = current.join(",");
      if (isRowInOrder(candidate)) {
        rightOrderedRow = current;
      }
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      permute(
        [...current, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      );
    }
  };

  permute([], rowArr);

  return rightOrderedRow.join(",");
};

const reorderedTopologically = (row) => {
  const rowArr = row.split(",");
  const graph = new Map();
  const inDegree = new Map();

  // graph init
  rowArr.forEach((el) => {
    graph.set(el, []);
    inDegree.set(el, 0);
  });

  const relevantRules = getRelevantRules(rowArr, rules, false);

  // create dependencies
  for (const rule of relevantRules) {
    const [from, to] = rule.split("|");
    graph.get(from).push(to);
    inDegree.set(to, inDegree.get(to) + 1);
  }

  // topologic sorting (Kahn's algorithm)
  const queue = [];
  // find nodes without dependencies
  for (const [node, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(node);
  }

  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph.get(node)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.join(",");
};

const part1 = () => {
  return pages
    .filter((row) => isRowInOrder(row))
    .map((row) => getMiddlePage(row))
    .reduce((acc, sum) => acc + +sum, 0);
};

const part2 = () => {
  return pages
    .filter((row) => !isRowInOrder(row))
    .map((row) => getMiddlePage(reorderedTopologically(row)))
    .reduce((acc, sum) => acc + +sum, 0);
};

console.log(part1()); //5747
console.log(part2()); //5502
