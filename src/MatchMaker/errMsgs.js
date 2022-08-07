export function numTypeErrMsg() {
  return "Number expected";
}

export function invalidTeamSizeErrMsg(min, max) {
  return `Team size must be between ${min} and ${max}`;
}

export function notEnoughPlayersErrMsg(diff) {
  return `Not enough players, ${diff} more players needed`;
}

export function invalidTeamSizeRangeErrMsg() {
  return `Min team size must be smaller than max team size`;
}

export function invalidMinTeamSizeErrMsg() {
  return `Min team size must be larger than 0`;
}
