const getData = require("../index");

const data = getData("../data/day4.txt");

const getColumns = (rows) => {
  let columnStrings = Array(rows[0].length).fill("");
  rows.forEach((row) => {
    row.split("").forEach((char, colIndex) => {
      columnStrings[colIndex] += char;
    });
  });
  return columnStrings;
};

const getDiagonals = (rows) => {
  const numRows = rows.length;
  const numCols = rows[0].length;

  let diagonals = [];

  for (let startCol = 0; startCol < numCols; startCol++) {
    let diagonal = "";
    for (
      let row = 0, col = startCol;
      row < numRows && col < numCols;
      row++, col++
    ) {
      diagonal += rows[row][col];
    }
    diagonals.push(diagonal);
  }

  for (let startRow = 1; startRow < numRows; startRow++) {
    let diagonal = "";
    for (
      let row = startRow, col = 0;
      row < numRows && col < numCols;
      row++, col++
    ) {
      diagonal += rows[row][col];
    }
    diagonals.push(diagonal);
  }

  let reverseDiagonals = [];

  for (let startCol = numCols - 1; startCol >= 0; startCol--) {
    let diagonal = "";
    for (let row = 0, col = startCol; row < numRows && col >= 0; row++, col--) {
      diagonal += rows[row][col];
    }
    reverseDiagonals.push(diagonal);
  }

  for (let startRow = 1; startRow < numRows; startRow++) {
    let diagonal = "";
    for (
      let row = startRow, col = numCols - 1;
      row < numRows && col >= 0;
      row++, col--
    ) {
      diagonal += rows[row][col];
    }
    reverseDiagonals.push(diagonal);
  }
  return [...diagonals, ...reverseDiagonals];
};

const countMatchesInRows = (rows) => {
  return rows
    .map((row) => {
      const xmas = row.match(/XMAS/g) ?? [];
      const smax = row.match(/SAMX/g) ?? [];
      return xmas.length + smax.length;
    })
    .reduce((acc, sum) => acc + sum, 0);
};

const part1 = (input) => {
  const matchesInLines = countMatchesInRows(input);
  const matchesInColumns = countMatchesInRows(getColumns(input));
  const matchesInDiagonals = countMatchesInRows(getDiagonals(input));

  return matchesInLines + matchesInColumns + matchesInDiagonals;
};

console.log(part1(data)); //2504
