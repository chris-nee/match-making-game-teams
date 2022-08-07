import DataJson from "./data.json";
import { Player } from "#entities/index.js";
import { MatchMaker } from "#entities/index.js";

describe("Match making process", () => {
  test("Match making", () => {
    const matchMaker = new MatchMaker();
    DataJson.forEach((playerData) => {
      const { name, wins, losses } = playerData;
      matchMaker.enterMatchMaking(new Player(name, wins, losses));
    });

    function randomNumInRange(min, max) {
      const range = Math.random() * (max - min);
      return Math.floor(range + min);
    }

    const match = matchMaker.findMatch(randomNumInRange(3, 5));
    expect(match).toBeTruthy();
  });
});
