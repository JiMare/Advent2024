const getData = require("../index");

const data = getData("../data/day6.txt");

const baseMatrix = data.map((row) => row.split(""));

const guard = "^";

const guardStartRow = baseMatrix.find((row) => row.indexOf(guard) !== -1);
const guardStartRowIndex = baseMatrix.indexOf(guardStartRow);
const guardStartIndex = guardStartRow.indexOf(guard);

const directions = ["up", "right", "down", "left"];
const startGuardDirection = directions[0];

const getIsFreeWay = (matrix, currentDirection, rowIndex, guardIndex) => {
  if (currentDirection === "up") {
    const row = matrix[rowIndex - 1];
    return !row || row[guardIndex] !== "#";
  } else if (currentDirection === "down") {
    const row = matrix[rowIndex + 1];
    return !row || row[guardIndex] !== "#";
  } else if (currentDirection === "left") {
    return (
      !matrix[rowIndex][guardIndex - 1] ||
      matrix[rowIndex][guardIndex - 1] !== "#"
    );
  } else {
    return (
      !matrix[rowIndex][guardIndex + 1] ||
      matrix[rowIndex][guardIndex + 1] !== "#"
    );
  }
};

const getPositions = (matrix) => {
  const positions = new Map();
  let newGuardRowIndex = guardStartRowIndex;
  let newGuardIndex = guardStartIndex;
  let newGuardDirection = startGuardDirection;

  while (matrix[newGuardRowIndex] && matrix[newGuardRowIndex][newGuardIndex]) {
    const key = `${newGuardRowIndex},${newGuardIndex}`;
    const positionDirections = positions.get(key);
    if (positionDirections && positionDirections.includes(newGuardDirection)) {
      return;
    }
    positions.set(
      key,
      positionDirections
        ? [...positionDirections, newGuardDirection]
        : [newGuardDirection]
    );

    //look for free way
    let isFreeWay = false;
    while (!isFreeWay) {
      const resultIsFreeWay = getIsFreeWay(
        matrix,
        newGuardDirection,
        newGuardRowIndex,
        newGuardIndex
      );
      //if not free way turn
      if (!resultIsFreeWay) {
        newGuardDirection =
          directions[(directions.indexOf(newGuardDirection) + 1) % 4];
      } else {
        isFreeWay = true;
      }
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
  return positions;
};

const part1 = () => {
  const positions = getPositions(baseMatrix);
  return positions.size;
};

const part2 = () => {
  const positions = getPositions(baseMatrix);

  let infiniteLoop = 0;

  const matrixWithObstacleArr = [];

  for (const key of positions.keys()) {
    const [row, col] = key.split(",");
    const copyMatrix = baseMatrix.map((row) => [...row]);
    if (copyMatrix[row][col] !== guard) {
      copyMatrix[row][col] = "#";
      matrixWithObstacleArr.push(copyMatrix);
    }
  }

  matrixWithObstacleArr.forEach((matrixWithObstacle) => {
    const result = getPositions(matrixWithObstacle);
    if (!result) {
      infiniteLoop++;
    }
  });

  return infiniteLoop;
};

console.log(part1()); //4696
console.log(part2()); //1443
