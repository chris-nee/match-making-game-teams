export function numTypeErrMsg() {
  return "Number expected";
}

export function invalidTeamSizeErrMsg(min, max) {
  return `Team size must be between ${min} and ${max}`;
}

export function notEnoughPlayersErrMsg(diff) {
  return `Not enough players, ${diff} more players needed`;
}
