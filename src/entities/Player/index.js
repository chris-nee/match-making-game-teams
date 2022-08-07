class Player {
  #name;
  #wins;
  #losses;

  static validName(name) {
    return String(name) === name;
  }

  static validCount(count) {
    return +count === count;
  }

  constructor(name = "", wins = 0, losses = 0) {
    if (!Player.validName(name)) throw TypeError("Invalid Name");
    if (!Player.validCount(wins)) throw TypeError("Invalid wins count");
    if (!Player.validCount(losses)) throw TypeError("Invalid losses count");

    this.#name = name;
    this.#wins = wins;
    this.#losses = losses;
  }

  getName() {
    return this.#name;
  }

  getWins() {
    return this.#wins;
  }

  getLosses() {
    return this.#losses;
  }

  getWinLoseRatio() {
    return this.getWins() / this.getLosses();
  }

  getPlayerStats() {
    return `
        &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        Player ${this.getName()} Stats:
            - Wins: ${this.getWins()}
            - Losses: ${this.getLosses()}
            - Wins/Losses Ratio: ${this.getWinLoseRatio()}
        &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    `;
  }
}

export default Player;
