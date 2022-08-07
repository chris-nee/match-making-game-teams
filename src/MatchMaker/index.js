import {
  numTypeErrMsg,
  invalidTeamSizeErrMsg,
  notEnoughPlayersErrMsg,
} from "./errMsgs.js";
import { Match } from "#entities/index.js";
import { Queue } from "#utils/index.js";

class MatchMaker {
  minTeamSize = 1;
  maxTeamSize = 10;

  static isNum(value) {
    return +value === value;
  }

  constructor() {
    this.playersInQueue = new Queue();
    this.matches = [];
  }

  isNum(value) {
    return MatchMaker.isNum(value);
  }

  isValidTeamSize(teamSize) {
    return this.minTeamSize <= teamSize && teamSize <= this.maxTeamSize;
  }

  getNumOfPlayersInQueue() {
    return this.playersInQueue.getSize();
  }

  getPlayers(numOfPlayers) {
    const players = [];
    while (players.length < numOfPlayers) {
      players.push(this.playersInQueue.dequeue());
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
        throw Error(invalidTeamSizeErrMsg(this.minTeamSize, this.maxTeamSize));
      }

      const numOfPlayersNeeded = teamSize * 2;
      console.log(this.playersInQueue.getSize());
      if (numOfPlayersNeeded > this.playersInQueue.getSize()) {
        const diff = numOfPlayersNeeded - this.playersInQueue.getSize();
        throw Error(notEnoughPlayersErrMsg(diff));
      }

      const selectedPlayers = this.getPlayers(numOfPlayersNeeded);
      console.log(this.playersInQueue.getSize());
      const [team1, team2] = this.generateTeamPair(selectedPlayers);
      const match = new Match(team1, team2);
      match.printMatchDetails();
      this.matches.push(match);

      return match;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  enterMatchMaking(newPlayer) {
    this.playersInQueue.enqueue(newPlayer);
  }
}

export default new MatchMaker();
