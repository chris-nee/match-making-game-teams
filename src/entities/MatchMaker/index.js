import {
  numTypeErrMsg,
  invalidTeamSizeErrMsg,
  notEnoughPlayersErrMsg,
  invalidTeamSizeRangeErrMsg,
  invalidMinTeamSizeErrMsg,
} from "./errMsgs.js";
import { Match } from "#entities/index.js";
import { Queue } from "#utils/index.js";

export const DefaultMinTeamSize = 1;
export const DefaultMaxTeamSize = 10;

/*
 * Class for Match Maker ( Will be used as single instance )
 *
 * @private @property {number} minTeamSize      - Minimum team size
 * @private @property {number} maxTeamSize      - Maximum team size
 * @private @property {Queue}  playersInQueue   - Queue of players
 * @private @property {Match[]}  matches        - Array of matches
 */
class MatchMaker {
  #minTeamSize;
  #maxTeamSize;
  #playersInQueue;
  #matches;

  /*
   * Creates a Match maker
   *
   * @params {number} minTeamSize       - Minimum team size
   * @params {number} maxTeamSize       - Maximum team size
   */
  constructor(
    minTeamSize = DefaultMinTeamSize,
    maxTeamSize = DefaultMaxTeamSize
  ) {
    this.#minTeamSize = minTeamSize;
    this.#maxTeamSize = maxTeamSize;
    this.#playersInQueue = new Queue();
    this.#matches = [];
  }

  /*
   * Returns the minimum team size
   * @return {number}                   - Minimum team size
   */
  getMinTeamSize() {
    return this.#minTeamSize;
  }

  /*
   * Returns the maximum team size
   * @return {number}                   - Maximum team size
   */
  getMaxTeamSize() {
    return this.#maxTeamSize;
  }

  /*
   * Updates the minimum and maximum team size
   * @params {number} min               - Minimum team size
   * @params {number} max               - Maximum team size
   */
  setMinMaxTeamSize(min, max) {
    if (!MatchMaker.isNum(min) || !MatchMaker.isNum(max)) throw TypeError(numTypeErrMsg());
    if (min <= 0) throw Error(invalidMinTeamSizeErrMsg());
    if (min > max) throw Error(invalidTeamSizeRangeErrMsg());
    this.#minTeamSize = min;
    this.#maxTeamSize = max;
  }

  /*
   * Checks if the value input is a number
   * @params {number} value             - Value to check if is a valid number
   * @return {bool}                     - Boolean value for whether value is a valid number
   */
  static isNum(value) {
    return +value === value;
  }

  /*
   * Checks if the team size input is within range of minimum and maximum team size
   * @params {number} teamSize          - Team size value to check if it falls within the valid range
   * @return {bool}                     - Boolean value for whether value is within valid range
   */
  isValidTeamSize(teamSize) {
    return this.#minTeamSize <= teamSize && teamSize <= this.#maxTeamSize;
  }

  /*
   * Returns the number of players currently in queue
   * @return {number}                   - Number of players currently waiting in the queue to be matches
   */
  getNumOfPlayersInQueue() {
    return this.#playersInQueue.getSize();
  }

  /*
   * Get the next n number of players in the queue
   * @return {Player[]}                 - Array of next n players in the queue
   */
  getPlayers(numOfPlayers) {
    const players = [];
    while (players.length < numOfPlayers) {
      players.push(this.#playersInQueue.dequeue());
    }
    return players;
  }

  /*
   * Split the players into 2 teams of approximately equal strength. Both teams will have approximately
   * the same win / lose ratio
   * @return {[Player[], Player[]]}     - Array of length 2 , containing 2 teams of players
   */
  generateTeamPair(players) {
    function compareWinLoseRatio(playerA, playerB) {
      return playerA.getWinLoseRatio() - playerB.getWinLoseRatio();
    }

    players.sort(compareWinLoseRatio);
    const team1 = players.filter((_, i) => i % 2 === 0); // even
    const team2 = players.filter((_, i) => i % 2 !== 0);
    return [team1, team2];
  }

  /*
   * Generate a match between 2 teams of players based on the available players in queue
   *
   * @params {number} teamSize          - Team size for match
   * @return {Match} match              - Match between 2 teams
   */
  findMatch(teamSize) {
    try {
      if (!MatchMaker.isNum(teamSize)) {
        throw TypeError(numTypeErrMsg());
      }
      if (!this.isValidTeamSize(teamSize)) {
        throw Error(
          invalidTeamSizeErrMsg(this.#minTeamSize, this.#maxTeamSize)
        );
      }

      const numOfPlayersNeeded = teamSize * 2;
      if (numOfPlayersNeeded > this.#playersInQueue.getSize()) {
        const diff = numOfPlayersNeeded - this.#playersInQueue.getSize();
        throw Error(notEnoughPlayersErrMsg(diff));
      }

      const selectedPlayers = this.getPlayers(numOfPlayersNeeded);
      const [team1, team2] = this.generateTeamPair(selectedPlayers);
      const match = new Match(team1, team2);
      this.#matches.push(match);

      return match;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /*
   * Queue a new player into waiting queue
   *
   * @params {Player} newPlayer         - New player to add to the queue waiting to be match made
   */
  enterMatchMaking(newPlayer) {
    this.#playersInQueue.enqueue(newPlayer);
  }

  /*
   * Clear the players in queue
   */
  clearQueue() {
    while (this.#playersInQueue.getSize() > 0) {
      this.#playersInQueue.dequeue();
    }
  }
}

export default MatchMaker;
