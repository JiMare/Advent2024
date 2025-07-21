const getData = require("../index");

const data = getData("../data/day11.txt");

const stonesInput = data[0].split(" ");

const part1 = () => {
  let stones = [...stonesInput];

  for (let i = 0; i < 25; i++) {
    stones = stones.flat().map((stone) => {
      if (stone === "0") {
        return "1";
      }
      if (stone.length % 2 === 0) {
        const half = stone.length / 2;

        //removing leading zeros
        const end = stone.slice(half);
        const firstNotZeroChar = end.split('').find((char) => char !== "0");
        const firstNotZeroCharIndex = end.indexOf(firstNotZeroChar);

        return [
          stone.slice(0, half),
          stone.slice(half).slice(firstNotZeroCharIndex),
        ];
      }

      if (stone.length % 2 !== 0) {
        return (+stone * 2024).toString();
      }
    });
  }

  return stones.flat().length;
};

console.log(part1()); //194557
