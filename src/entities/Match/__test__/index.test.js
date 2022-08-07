import Match from "../index.js";

const team1 = [
  { name: "Chris", wins: 2, losses: 1 },
  {
    name: "John",
    wins: 4,
    losses: 5,
  },
];
const team2 = [
  { name: "Tom", wins: 2, losses: 1 },
  {
    name: "Charles",
    wins: 4,
    losses: 5,
  },
];

describe("Match class", () => {
  test("Match creation", () => {
    const match = new Match(team1, team2);
    expect(match).toBeInstanceOf(Match);
  });

  test("Match method - getTeam1()", () => {
    const match = new Match(team1, team2);
    expect(match.getTeam1()).toBe(team1);
    expect(match.getTeam1()).not.toBe(team2);
  });

  test("Match method - getTeam2()", () => {
    const match = new Match(team1, team2);
    expect(match.getTeam2()).toBe(team2);
    expect(match.getTeam2()).not.toBe(team1);
  });
});
