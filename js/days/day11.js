const getData = require("../index");

const data = getData("../data/day11.txt");

const stonesInput = data[0].split(" ");

const getStones = (blink) => {
  let stoneCounts = new Map();

  for (const stone of stonesInput) {
    stoneCounts.set(stone, (stoneCounts.get(stone) ?? 0) + 1);
  }

  for (let i = 0; i < blink; i++) {
    const next = new Map();

    for (const [stone, count] of stoneCounts.entries()) {
      if (stone === "0") {
        next.set("1", (next.get("1") ?? 0) + count);
      } else if (stone.length % 2 === 0) {
        const half = stone.length / 2;

        const left = stone.slice(0, half);
        const end = stone.slice(half);

        //removing leading zeros
        const right = end.replace(/^0+/, "") || "0";

        next.set(left, (next.get(left) ?? 0) + count);
        next.set(right, (next.get(right) ?? 0) + count);
      } else {
        const multiplied = (BigInt(stone) * 2024n).toString();
        next.set(multiplied, (next.get(multiplied) ?? 0) + count);
      }
    }

    stoneCounts = next;
  }

  let total = 0;
  for (const count of stoneCounts.values()) {
    total += count;
  }

  return total;
};

const part1 = () => {
  return getStones(25);
};

const part2 = () => {
  return getStones(75);
};

console.log(part1()); //194557
console.log(part2()); //231532558973909
