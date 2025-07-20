const getData = require("../index");

const data = getData("../data/day8.txt");

const matrix = data.map((row) => row.split(""));

const getCharPositions = () => {
  const charPositions = new Map();
  matrix.forEach((row, rowIndex) => {
    row.forEach((char, columnIndex) => {
      if (char !== ".") {
        const charPosition = charPositions.get(char);
        charPositions.set(
          char,
          charPosition
            ? [...charPosition, `${rowIndex},${columnIndex}`]
            : [`${rowIndex},${columnIndex}`]
        );
      }
    });
  });
  return charPositions;
};

const getCombinations = (positions) => {
  const combinations = [];
  for (let i = 0; i < positions.length - 1; i++) {
    for (j = i + 1; j < positions.length; j++) {
      combinations.push(`${positions[i]}:${positions[j]}`);
    }
  }
  return combinations;
};

const getAntinodes = (coords) => {
  const [ant1, ant2] = coords.split(":");
  const [rowIndex1, columnIndex1] = ant1.split(",");
  const [rowIndex2, columnIndex2] = ant2.split(",");

  const rowDistance = +rowIndex1 - +rowIndex2;
  const columnDistance = +columnIndex1 - +columnIndex2;

  return [
    `${+rowIndex1 + rowDistance},${+columnIndex1 + columnDistance}`,
    `${+rowIndex2 - rowDistance},${+columnIndex2 - columnDistance}`,
  ];
};

const isAntinodeValid = (antinode, rowsLength, columnLength) => {
  const [rowIndex, columnIndex] = antinode.split(",");
  return (
    rowIndex >= 0 &&
    rowIndex < rowsLength &&
    columnIndex >= 0 &&
    columnIndex < columnLength
  );
};

const part1 = () => {
  const charPositions = getCharPositions();
  const combinations = [];
  for (const key of charPositions.keys()) {
    combinations.push(...getCombinations(charPositions.get(key)));
  }
  const antinodes = new Set();
  combinations.forEach((combo) => {
    const [antinode1, antinode2] = getAntinodes(combo);
    if (isAntinodeValid(antinode1, matrix.length, matrix[0].length)) {
      antinodes.add(antinode1);
    }
    if (isAntinodeValid(antinode2, matrix.length, matrix[0].length)) {
      antinodes.add(antinode2);
    }
  });

  return antinodes.size;
};

const part2 = () => {
  const charPositions = getCharPositions();
  const combinations = [];
  const antinodes = new Set();

  for (const key of charPositions.keys()) {
    combinations.push(...getCombinations(charPositions.get(key)));
    const values = charPositions.get(key);
    values.forEach((value) => antinodes.add(value));
  }

  combinations.forEach((combo) => {
    let firstNode = combo.split(":")[0];
    let secondNode = combo.split(":")[1];
    while (isAntinodeValid(firstNode, matrix.length, matrix[0].length)) {
      if (firstNode !== combo.split(":")[0]) {
        antinodes.add(firstNode);
      }
      const [node1, _] = getAntinodes(`${firstNode}:${secondNode}`);
      secondNode = firstNode;
      firstNode = node1;
    }

    firstNode = combo.split(":")[0];
    secondNode = combo.split(":")[1];
    while (isAntinodeValid(secondNode, matrix.length, matrix[0].length)) {
      if (secondNode !== combo.split(":")[1]) {
        antinodes.add(secondNode);
      }
      const [, node2] = getAntinodes(`${firstNode}:${secondNode}`);
      firstNode = secondNode;
      secondNode = node2;
    }
  });

  return antinodes.size;
};

console.log(part1()); //214
console.log(part2()); //809
