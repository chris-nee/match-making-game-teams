import { METRICS, DefaultMaxTeamSize, DefaultMinTeamSize } from "../index.js";
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
  });

  test("Construction", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker).toBeInstanceOf(MatchMaker);
  });

  test("Methods - Get/Set metrics", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker.getMetrics()).toBe(METRICS.WIN_LOSS_RATIO);
    matchMaker.setMetrics(METRICS.WINS);

    expect(matchMaker.getMetrics()).toBe(METRICS.WINS);
    matchMaker.setMetrics(-1);

    expect(matchMaker.getMetrics()).toBe(METRICS.WINS);
  });

  test("Methods - isValidTeamSize ", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker.isValidTeamSize(null)).toBe(false);
    expect(matchMaker.isValidTeamSize(1)).toBe(true);
    expect(matchMaker.isValidTeamSize(3)).toBe(true);
    expect(matchMaker.isValidTeamSize(10)).toBe(true);
    expect(matchMaker.isValidTeamSize(11)).toBe(false);
  });

  test("Methods - getMinTeamSize", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker.getMinTeamSize()).toBe(DefaultMinTeamSize);
  });

  test("Methods - getMaxTeamSize", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker.getMaxTeamSize()).toBe(DefaultMaxTeamSize);
  });

  test("Methods - setMinMaxTeamSize", () => {
    const matchMaker = new MatchMaker();
    expect(() => matchMaker.setMinMaxTeamSize("", "")).toThrow();
    expect(() => matchMaker.setMinMaxTeamSize(-1, 10)).toThrow();
    expect(() => matchMaker.setMinMaxTeamSize(11, 10)).toThrow();

    const newMin = 2;
    const newMax = 9;
    matchMaker.setMinMaxTeamSize(newMin, newMax);
    expect(matchMaker.getMinTeamSize()).toBe(newMin);
    expect(matchMaker.getMaxTeamSize()).toBe(newMax);
  });

  test("Methods - isValidTeamSize", () => {
    const newMin = 3;
    const newMax = 8;
    const matchMaker = new MatchMaker();
    matchMaker.setMinMaxTeamSize(newMin, newMax);

    expect(matchMaker.isValidTeamSize(1)).toBe(false);
    expect(matchMaker.isValidTeamSize(4)).toBe(true);
    expect(matchMaker.isValidTeamSize(9)).toBe(false);
    expect(matchMaker.isValidTeamSize(8)).toBe(true);
  });

  test("Methods - getAllMatches", () => {
    const matchMaker = new MatchMaker();
    players.forEach(({ name, wins, losses }) => {
      matchMaker.enterMatchMaking(new Player(name, wins, losses));
    });
    const match = matchMaker.findMatch(3);
    expect(matchMaker.getAllMatches()).toEqual([match]);
  });

  test("Methods - enterMatchMaking", () => {
    const matchMaker = new MatchMaker();
    expect(matchMaker.getNumOfPlayersInQueue()).toBe(0);
    expect(matchMaker.getPlayers()).toEqual([]);

    players.forEach(({ name, wins, losses }) => {
      matchMaker.enterMatchMaking(new Player(name, wins, losses));
    });
    expect(matchMaker.getNumOfPlayersInQueue()).toBe(players.length);
  });

  test("Methods - findMatch", () => {
    const newMinTeamSize = 2;
    const newMaxTeamSize = 100;

    const matchMaker = new MatchMaker();
    players.forEach(({ name, wins, losses }) => {
      matchMaker.enterMatchMaking(new Player(name, wins, losses));
    });

    matchMaker.setMinMaxTeamSize(newMinTeamSize, newMaxTeamSize);
    expect(matchMaker.findMatch("")).toBe(null);
    expect(matchMaker.findMatch(0)).toBe(null);
    expect(matchMaker.findMatch(2)).toBeInstanceOf(Match);
    expect(matchMaker.findMatch(100)).toBe(null);
  });

  test("Methods - clearQueue", () => {
    const matchMaker = new MatchMaker();
    players.forEach(({ name, wins, losses }) => {
      matchMaker.enterMatchMaking(new Player(name, wins, losses));
    });

    expect(matchMaker.getNumOfPlayersInQueue()).toBe(players.length);
    matchMaker.clearQueue();
    expect(matchMaker.getNumOfPlayersInQueue()).toBe(0);
  });
});
