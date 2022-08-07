import {
  numTypeErrMsg,
  invalidTeamSizeErrMsg,
  notEnoughPlayersErrMsg,
  invalidTeamSizeRangeErrMsg,
} from "./errMsgs.js";
import { Match } from "#entities/index.js";
import { Queue } from "#utils/index.js";

const DefaultMinTeamSize = 1;
const DefaultMaxTeamSize = 10;

class MatchMaker {
  constructor() {
    this.#minTeamSize = DefaultMinTeamSize;
    this.#maxTeamSize = DefaultMaxTeamSize;
    this.#playersInQueue = new Queue();
    this.#matches = [];
  }

  getMinTeamSize() {
    return this.#minTeamSize;
  }

  getMaxTeamSize() {
    return this.#maxTeamSize;
  }

  setMinMaxTeamSize(min, max) {
    if (!this.isNum(min) || !this.isNum(max)) throw TypeError(numTypeErrMsg());
    if (min > max) throw Error(invalidTeamSizeRangeErrMsg());
    this.#minTeamSize = min;
    this.#maxTeamSize = max;
  }

  isNum(value) {
    return +value === value;
  }

  isValidTeamSize(teamSize) {
    return this.#minTeamSize <= teamSize && teamSize <= this.#maxTeamSize;
  }

  getNumOfPlayersInQueue() {
    return this.#playersInQueue.getSize();
  }

  getPlayers(numOfPlayers) {
    const players = [];
    while (players.length < numOfPlayers) {
      players.push(this.#playersInQueue.dequeue());
    }
    return players;
  }

  generateTeamPair(players) {
    function compareWinLoseRatio(playerA, playerB) {
      return playerA.getWinLoseRatio() / playerB.getWinLoseRatio();
    }

    players.sort(compareWinLoseRatio);
    const team1 = players.filter((_, i) => i % 2 === 0); // even
    const team2 = players.filter((_, i) => i % 2 !== 0);
    return [team1, team2];
  }

  findMatch(teamSize) {
    try {
      if (!this.isNum(teamSize)) {
        throw TypeError(numTypeErrMsg());
      }
      if (!this.isValidTeamSize(teamSize)) {
        throw Error(invalidTeamSizeErrMsg(this.#minTeamSize, this.#maxTeamSize));
      }

      const numOfPlayersNeeded = teamSize * 2;
      if (numOfPlayersNeeded > this.#playersInQueue.getSize()) {
        const diff = numOfPlayersNeeded - this.#playersInQueue.getSize();
        throw Error(notEnoughPlayersErrMsg(diff));
      }

      const selectedPlayers = this.getPlayers(numOfPlayersNeeded);
      const [team1, team2] = this.generateTeamPair(selectedPlayers);
      const match = new Match(team1, team2);
      this.matches.push(match);

      return match;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  enterMatchMaking(newPlayer) {
    this.#playersInQueue.enqueue(newPlayer);
  }
}

export default new MatchMaker();
