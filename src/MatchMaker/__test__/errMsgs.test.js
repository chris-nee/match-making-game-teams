import {
  numTypeErrMsg,
  invalidTeamSizeErrMsg,
  notEnoughPlayersErrMsg,
  invalidTeamSizeRangeErrMsg,
  invalidMinTeamSizeErrMsg,
} from "../errMsgs.js";

describe("Error Messages for MatchMake class", () => {
  test("numTypeErrMsg", () => {
    expect(numTypeErrMsg()).toBe("Number expected");
  });

  test("invalidTeamSizeErrMsg", () => {
    const min = 1,
      max = 10;

    expect(invalidTeamSizeErrMsg()).toBe(
      `Team size must be between ${min} and ${max}`
    );
  });

  test("notEnoughPlayersErrMsg", () => {
    const diff = 12;
    expect(notEnoughPlayersErrMsg(12)).toBe(
      `Not enough players, ${diff} more players needed`
    );
  });

  test("invalidTeamSizeRangeErrMsg", () => {
    expect(invalidTeamSizeRangeErrMsg()).toBe(
      `Min team size must be smaller than max team size`
    );
  });

  test("invalidMinTeamSizeErrMsg", () => {
    expect(invalidMinTeamSizeErrMsg()).toBe(
      `Min team size must be larger than 0`
    );
  });
});
