import MatchMaker from "../index.js";
import { Player } from "#src/entities/index.js";

const players = [
  {
    name: "Chris",
    wins: 11,
    losses: 11,
  },
  {
    name: "John",
    wins: 1,
    losses: 19,
  },
  {
    name: "Tom",
    wins: 19,
    losses: 21,
  },
  {
    name: "James",
    wins: 14,
    losses: 31,
  },
  {
    name: "Harry",
    wins: 10,
    losses: 39,
  },
  {
    name: "Jack",
    wins: 111,
    losses: 11,
  },
  {
    name: "Tim",
    wins: 11,
    losses: 13,
  },
  {
    name: "Mike",
    wins: 15,
    losses: 71,
  },
  {
    name: "Harris",
    wins: 18,
    losses: 41,
  },
];

describe("MatchMaker Singleton", () => {
  test("Static", () => {
    expect(MatchMaker.isNum(1)).toBe(true);
    expect(MatchMaker.isNum("1")).toBe(false);
    expect(MatchMaker.isNum("hello")).toBe(false);
    expect(MatchMaker.isNum(undefined)).toBe(false);
    expect(MatchMaker.isNum(null)).toBe(false);

    expect(MatchMaker.isValidTeamSize(null)).toBe(false);
    expect(MatchMaker.isValidTeamSize(1)).toBe(true);
    expect(MatchMaker.isValidTeamSize(3)).toBe(true);
    expect(MatchMaker.isValidTeamSize(10)).toBe(true);
    expect(MatchMaker.isValidTeamSize(11)).toBe(false);
  });

  test("Methods", () => {
    expect(MatchMaker.getNumOfPlayersInQueue()).toBe(0);
    expect(MatchMaker.getPlayers()).toEqual([]);

    players.forEach((player) => {
      const { name, wins, losses } = player;
      MatchMaker.enterMatchMaking(new Player(name, wins, losses));
    });
    expect(MatchMaker.getNumOfPlayersInQueue()).toBe(players.length);
  });
});
