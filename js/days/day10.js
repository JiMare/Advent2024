const getData = require("../index");

const data = getData("../data/day10.txt");
const matrix = data.map((row) => row.split(""));

const getTrailheadCoords = () => {
  const coords = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === "0") {
        coords.push(`${rowIndex},${columnIndex}`);
      }
    });
  });

  return coords;
};

const lookForStep = (coords, step) => {
  const [rowIndex, columnIndex] = coords.split(",");
  const row = parseInt(rowIndex);
  const column = parseInt(columnIndex);

  const findings = [];
  //same row
  if (matrix[row][column - 1] && matrix[row][column - 1] === step) {
    findings.push(`${row},${column - 1}`);
  }
  if (matrix[row][column + 1] && matrix[row][column + 1] === step) {
    findings.push(`${row},${column + 1}`);
  }

  //row above
  if (
    matrix[row - 1] &&
    matrix[row - 1][column] &&
    matrix[row - 1][column] === step
  ) {
    findings.push(`${row - 1},${column}`);
  }

  //row below
  if (
    matrix[row + 1] &&
    matrix[row + 1][column] &&
    matrix[row + 1][column] === step
  ) {
    findings.push(`${row + 1},${column}`);
  }

  return findings;
};

const getTrailheadScore = (trailheadCoords) => {
  const stepCoords1 = lookForStep(trailheadCoords, "1");
  const stepCoords2 = [
    ...new Set(stepCoords1.map((coords) => lookForStep(coords, "2")).flat()),
  ];
  const stepCoords3 = [
    ...new Set(stepCoords2.map((coords) => lookForStep(coords, "3")).flat()),
  ];
  const stepCoords4 = [
    ...new Set(stepCoords3.map((coords) => lookForStep(coords, "4")).flat()),
  ];
  const stepCoords5 = [
    ...new Set(stepCoords4.map((coords) => lookForStep(coords, "5")).flat()),
  ];
  const stepCoords6 = [
    ...new Set(stepCoords5.map((coords) => lookForStep(coords, "6")).flat()),
  ];
  const stepCoords7 = [
    ...new Set(stepCoords6.map((coords) => lookForStep(coords, "7")).flat()),
  ];
  const stepCoords8 = [
    ...new Set(stepCoords7.map((coords) => lookForStep(coords, "8")).flat()),
  ];
  const stepCoords9 = [
    ...new Set(stepCoords8.map((coords) => lookForStep(coords, "9")).flat()),
  ];

  return stepCoords9.length;
};

const getTrailheadRating = (trailheadCoords) => {
  const stepCoords1 = lookForStep(trailheadCoords, "1");
  const stepCoords2 = stepCoords1
    .map((coords) => lookForStep(coords, "2"))
    .flat();
  const stepCoords3 = stepCoords2
    .map((coords) => lookForStep(coords, "3"))
    .flat();
  const stepCoords4 = stepCoords3
    .map((coords) => lookForStep(coords, "4"))
    .flat();
  const stepCoords5 = stepCoords4
    .map((coords) => lookForStep(coords, "5"))
    .flat();
  const stepCoords6 = stepCoords5
    .map((coords) => lookForStep(coords, "6"))
    .flat();
  const stepCoords7 = stepCoords6
    .map((coords) => lookForStep(coords, "7"))
    .flat();
  const stepCoords8 = stepCoords7
    .map((coords) => lookForStep(coords, "8"))
    .flat();
  const stepCoords9 = stepCoords8
    .map((coords) => lookForStep(coords, "9"))
    .flat();

  return stepCoords9.length;
};

const part1 = () => {
  const trailheadCoords = getTrailheadCoords();

  return trailheadCoords
    .map((coords) => getTrailheadScore(coords))
    .reduce((acc, value) => acc + value, 0);
};

const part2 = () => {
  const trailheadCoords = getTrailheadCoords();

  return trailheadCoords
    .map((coords) => getTrailheadRating(coords))
    .reduce((acc, value) => acc + value, 0);
};

console.log(part1()); //746
console.log(part2()); //1541
