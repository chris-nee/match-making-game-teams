import {
  MatchMaker as MatchMakerClass,
  DefaultMaxTeamSize,
  DefaultMinTeamSize,
} from "../index.js";
import MatchMaker from "../index.js";
import { Player, Match } from "#entities/index.js";

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

  test("Construction", () => {
    const matchMaker = new MatchMakerClass();
    expect(matchMaker).toBeInstanceOf(MatchMakerClass);
  });

  test("Methods - getMinTeamSize", () => {
    expect(MatchMaker.getMinTeamSize()).toBe(DefaultMinTeamSize);
  });

  test("Methods - getMaxTeamSize", () => {
    expect(MatchMaker.getMaxTeamSize()).toBe(DefaultMaxTeamSize);
  });

  test("Methods - setMinMaxTeamSize", () => {
    expect(() => MatchMaker.setMinMaxTeamSize("", "")).toThrow();
    expect(() => MatchMaker.setMinMaxTeamSize(-1, 10)).toThrow();
    expect(() => MatchMaker.setMinMaxTeamSize(11, 10)).toThrow();

    const newMin = 2;
    const newMax = 9;
    MatchMaker.setMinMaxTeamSize(newMin, newMax);
    expect(MatchMaker.getMinTeamSize()).toBe(newMin);
    expect(MatchMaker.getMaxTeamSize()).toBe(newMax);
  });

  test("Methods - isNum", () => {
    expect(MatchMaker.isNum(1)).toBe(true);
    expect(MatchMaker.isNum("1")).toBe(false);
    expect(MatchMaker.isNum(null)).toBe(false);
    expect(MatchMaker.isNum(undefined)).toBe(false);
  });

  test("Methods - isValidTeamSize", () => {
    const newMin = 3;
    const newMax = 8;
    MatchMaker.setMinMaxTeamSize(newMin, newMax);

    expect(MatchMaker.isValidTeamSize(1)).toBe(false);
    expect(MatchMaker.isValidTeamSize(4)).toBe(true);
    expect(MatchMaker.isValidTeamSize(9)).toBe(false);
    expect(MatchMaker.isValidTeamSize(8)).toBe(true);
  });

  test("Methods - enterMatchMaking", () => {
    expect(MatchMaker.getNumOfPlayersInQueue()).toBe(0);
    expect(MatchMaker.getPlayers()).toEqual([]);

    players.forEach(({ name, wins, losses }) => {
      MatchMaker.enterMatchMaking(new Player(name, wins, losses));
    });
    expect(MatchMaker.getNumOfPlayersInQueue()).toBe(players.length);
  });

  test("Methods - findMatch", () => {
    const newMinTeamSize = 2;
    const newMaxTeamSize = 100;
    const newMatchMakeInstance = new MatchMakerClass();
    players.forEach(({ name, wins, losses }) => {
      newMatchMakeInstance.enterMatchMaking(new Player(name, wins, losses));
    });

    newMatchMakeInstance.setMinMaxTeamSize(newMinTeamSize, newMaxTeamSize);
    expect(newMatchMakeInstance.findMatch("")).toBe(null);
    expect(newMatchMakeInstance.findMatch(0)).toBe(null);
    expect(newMatchMakeInstance.findMatch(2)).toBeInstanceOf(Match);
    expect(newMatchMakeInstance.findMatch(100)).toBe(null);
  });

  test("Methods - clearQueue", () => {
    const newMatchMakeInstance = new MatchMakerClass();
    players.forEach(({ name, wins, losses }) => {
      newMatchMakeInstance.enterMatchMaking(new Player(name, wins, losses));
    });

    expect(newMatchMakeInstance.getNumOfPlayersInQueue()).toBe(players.length);
    newMatchMakeInstance.clearQueue();
    expect(newMatchMakeInstance.getNumOfPlayersInQueue()).toBe(0);
  });
});
