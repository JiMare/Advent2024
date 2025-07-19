const getData = require("../index");

const data = getData("../data/day6.txt");

const matrix = data.map((row) => row.split(""));

const guard = "^";

const guardStartRow = matrix.find((row) => row.indexOf("^") !== -1);
const guardStartRowIndex = matrix.indexOf(guardStartRow);
const guardStartIndex = guardStartRow.indexOf(guard);
const directions = ["up", "right", "down", "left"];
const startGuardDirection = directions[0];

const part1 = () => {
  const positions = new Map();
  let newGuardRowIndex = guardStartRowIndex;
  let newGuardIndex = guardStartIndex;
  let newGuardDirection = startGuardDirection;
  while (matrix[newGuardRowIndex] && matrix[newGuardRowIndex][newGuardIndex]) {
    const key = `${newGuardRowIndex},${newGuardIndex}`;
    const count = positions.get(key) ?? 0;
    positions.set(key, count + 1);
    let isFreeWay = true;
    //look for free way
    if (newGuardDirection === "up") {
      const row = matrix[newGuardRowIndex - 1];
      isFreeWay = !row || row[newGuardIndex] !== "#";
    } else if (newGuardDirection === "down") {
      const row = matrix[newGuardRowIndex + 1];
      isFreeWay = !row || row[newGuardIndex] !== "#";
    } else if (newGuardDirection === "left") {
      isFreeWay =
        !matrix[newGuardRowIndex][newGuardIndex - 1] ||
        matrix[newGuardRowIndex][newGuardIndex - 1] !== "#";
    } else {
      isFreeWay =
        !matrix[newGuardRowIndex][newGuardIndex + 1] ||
        matrix[newGuardRowIndex][newGuardIndex + 1] !== "#";
    }
    //if not free way turn
    if (!isFreeWay) {
      newGuardDirection =
        directions[(directions.indexOf(newGuardDirection) + 1) % 4];
    }
    //move
    if (newGuardDirection === "up") {
      newGuardRowIndex--;
    } else if (newGuardDirection === "down") {
      newGuardRowIndex++;
    } else if (newGuardDirection === "left") {
      newGuardIndex--;
    } else {
      newGuardIndex++;
    }
  }

  return positions.size;
};

console.log(part1()); //4696
