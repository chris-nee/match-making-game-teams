/*
 * Class for Player
 *
 * @private @property {string} name         - Name of player
 * @private @property {number} wins         - Matches won by player
 * @private @property {number} losses       - Matches lost by player
 */
class Player {
  #name;
  #wins;
  #losses;

  /*
   * Checks if name value is a valid string
   * @param  {string} name          - Name input to be checked
   * @return {boolean}              - Boolean for whether name is valid
   */
  static validName(name) {
    return String(name) === name;
  }

  /*
   * Checks if count value is a valid number
   * @param  {number} name          - count input to be checked
   * @return {boolean}              - Boolean for whether count is valid
   */
  static validCount(count) {
    return +count === count;
  }

  /*
   * Creates a Player
   * @params {string} name          - Name of player
   * @params {number} wins          - Matches won by player
   * @params {number} losses        - Matches lost by player
   */
  constructor(name, wins = 0, losses = 0) {
    if (!Player.validName(name)) throw TypeError("Invalid Name");
    if (!Player.validCount(wins)) throw TypeError("Invalid wins count");
    if (!Player.validCount(losses)) throw TypeError("Invalid losses count");

    this.#name = name;
    this.#wins = wins;
    this.#losses = losses;
  }

  /*
   * Returns name of player
   * @return {string} this.#name    - Name of player
   */
  getName() {
    return this.#name;
  }

  /*
   * Returns matches won by player
   * @return {number} this.#wins    - Matches won by player
   */
  getWins() {
    return this.#wins;
  }

  /*
   * Returns matches lost by player
   * @return {number} this.#losses  - Matches lost by player
   */
  getLosses() {
    return this.#losses;
  }

  /*
   * Calculate and returns win lose ratio of player
   * @return {number}               - Wins / Lost ratio of player
   */
  getWinLoseRatio() {
    return this.getWins() / this.getLosses();
  }

  /*
   * Returns a formated string of player details
   * @return {string}               - Formatted string of player details
   */
  getPlayerStats() {
    return `
        &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        Player ${this.getName()} Stats:
        Wins: ${this.getWins()} , Losses: ${this.getLosses()} , Wins/Losses Ratio: ${this.getWinLoseRatio()}
        &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    `;
  }
}

export default Player;
