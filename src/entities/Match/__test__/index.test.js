import Match from "../index.js";
import { Player } from "#entities/index.js";

const genPlayer = ({ name, wins, losses }) => new Player(name, wins, losses);
const team1 = [
  { name: "Chris", wins: 2, losses: 1 },
  {
    name: "John",
    wins: 4,
    losses: 5,
  },
].map(genPlayer);

const team2 = [
  { name: "Tom", wins: 2, losses: 1 },
  {
    name: "Charles",
    wins: 4,
    losses: 5,
  },
].map(genPlayer);

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

  test("Match method - getMatchDetails()", () => {
    const match = new Match(team1, team2);
    const t1Stats = match.getTeamStats(team1);
    const t2Stats = match.getTeamStats(team2);

    expect(match.getMatchDetails()).toBe(`
        ==========================
        Match Formed
        ==========================
        [Team] - 1 
        [Team Stats] - Total Wins: ${t1Stats.totalWins} , Total Losses: ${
      t1Stats.totalLosses
    } , Average Win / Loss Ratio: ${t1Stats.averageWinLossRatio}
        ${team1.map((player) => player.getPlayerStats()).join("")}
        --------------------------
        [Team] - 2 
        [Team Stats] - Total Wins: ${t2Stats.totalWins} , Total Losses: ${
      t2Stats.totalLosses
    } , Average Win / Loss Ratio: ${t2Stats.averageWinLossRatio}
        ${team2.map((player) => player.getPlayerStats()).join("")}
        ==========================
    `);
  });
});
