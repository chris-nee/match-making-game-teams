import DataJson from "./data.json";
import { Player, MatchMaker } from "#entities/index.js";

function randomNumInRange(min, max) {
  const range = Math.random() * (max - min);
  return Math.floor(range + min);
}

describe("Match making process", () => {
  test("Match making", () => {
    const matchMaker = new MatchMaker();

    const players = DataJson.map(
      ({ name, wins, losses }) => new Player(name, wins, losses)
    );
    players.forEach((player) => {
      matchMaker.enterMatchMaking(player);
    });

    expect(matchMaker.getNumOfPlayersInQueue()).toBe(DataJson.length);

    const teamSize = 4;
    const match = matchMaker.findMatch(teamSize);
    expect(match).toBeTruthy();

    const matchTeam1 = match.getTeam1();
    expect(matchTeam1.length).toBe(teamSize);

    const matchTeam2 = match.getTeam2();
    expect(matchTeam2.length).toBe(teamSize);

    /* First n players who entered match making will start a match first */
    const allPlayersInMatch = matchTeam1.concat(matchTeam2);
    expect(allPlayersInMatch).toEqual(players.slice(0, teamSize * 2));
  });
});
