const getData = require("../index");

const data = getData("../data/day7.txt");

const getParsedData = (line) => {
  const [calibrationResult, equations] = line.split(":");
  return { calibrationResult, equations: equations.trim().split(" ") };
};

function generateOperatorCombos(length, concat) {
  const results = [];

  const helper = (current) => {
    if (current.length === length) {
      results.push(current);
      return;
    }

    // Add +
    helper([...current, "+"]);

    // Add *
    helper([...current, "*"]);

    // Add ||
    if (concat) {
      helper([...current, "||"]);
    }
  };

  helper([]);
  return results;
}

const evaluateLeftToRight = (operands, operators) => {
  let result = Number(operands[0]);

  for (let i = 0; i < operators.length; i++) {
    const next = Number(operands[i + 1]);
    const operator = operators[i];

    if (operator === "+") {
      result += next;
    } else if (operator === "*") {
      result *= next;
    } else if (operator === "||") {
      result = Number(`${result}${next}`);
    }
  }

  return result;
};

const findResultMatch = (total, operands, concat) => {
  const operationsCount = operands.length - 1;
  const combinations = generateOperatorCombos(operationsCount, concat);
  for (const combo of combinations) {
    if (evaluateLeftToRight(operands, combo) === +total) return total;
  }
};

const part1 = () => {
  let successfulCalibrations = [];
  data.forEach((line) => {
    const { calibrationResult, equations } = getParsedData(line);
    const result = findResultMatch(calibrationResult, equations, false);
    if (result) {
      successfulCalibrations.push(result);
    }
  });
  return successfulCalibrations.reduce((acc, sum) => +sum + +acc, 0);
};

const part2 = () => {
  let successfulCalibrations = [];
  data.forEach((line) => {
    const { calibrationResult, equations } = getParsedData(line);
    const result = findResultMatch(calibrationResult, equations, true);
    if (result) {
      successfulCalibrations.push(result);
    }
  });
  return successfulCalibrations.reduce((acc, sum) => +sum + +acc, 0);
};

console.log(part1()); //3245122495150
console.log(part2()); //105517128211543
