import Player from "../index.js";

const testPlayer = {
  name: "Chris",
  wins: 11,
  losses: 12,
};

describe("Player Class", () => {
  test("Player construction", () => {
    const { name, wins, losses } = testPlayer;
    const player = new Player(name, wins, losses);
    expect(player).toBeInstanceOf(Player);
  });

  test("Player Methods", () => {
    const { name, wins, losses } = testPlayer;
    const player = new Player(name, wins, losses);
    expect(player.getName()).toBe(testPlayer.name);
    expect(player.getWins()).toBe(testPlayer.wins);
    expect(player.getLosses()).toBe(testPlayer.losses);
    expect(player.getWinLoseRatio()).toBe(testPlayer.wins / testPlayer.losses);
  });

  test("Player static methods", () => {
    expect(Player.validName(1)).toBe(false);
    expect(Player.validCount("2")).toBe(false);
    expect(Player.validName("hello")).toBe(true);
    expect(Player.validName(null)).toBe(false);
    expect(Player.validName(undefined)).toBe(false);

    expect(Player.validCount(undefined)).toBe(false);
    expect(Player.validCount(0)).toBe(true);
    expect(Player.validCount(2)).toBe(true);
    expect(Player.validCount("2")).toBe(false);
  });
});