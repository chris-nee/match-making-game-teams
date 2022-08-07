/*
 * Class for Match
 *
 * @private @property {Player[]} team1      - Array of players in team 1
 * @private @property {Player[]} team2      - Array of players in team 2
 */

class Match {
  #team1;
  #team2;

  /*
   * Creates a Match
   * @params {Player[]} team1       - Array of players in team 1
   * @params {Player[]} team2       - Array of players in team 2
   */
  constructor(team1, team2) {
    this.#team1 = team1;
    this.#team2 = team2;
  }

  /*
   * Returns the array of players in team 1
   * @return {Player[]}             - Array of players in team 1
   */
  getTeam1() {
    return this.#team1;
  }

  /*
   * Returns the array of players in team 2
   * @return {Player[]}             - Array of players in team 2
   */
  getTeam2() {
    return this.#team2;
  }

  /*
   * Returns a formatted string of match details
   * @return {string}               - Formatted string of match details
   */
  getMatchDetails() {
    const reduceStats = (prev, player, _, arr) => {
      const wins = player.getWins();
      const losses = player.getLosses();
      const winLossRatio = player.getWinLoseRatio();

      prev.totalWins += wins;
      prev.totalLosses += losses;
      prev.averageWinLossRatio += winLossRatio / arr.length;
      return prev;
    };

    const t1Stats = this.#team1.reduce(reduceStats, {
      totalLosses: 0,
      totalWins: 0,
      averageWinLossRatio: 0,
    });
    const t2Stats = this.#team2.reduce(reduceStats, {
      totalLosses: 0,
      totalWins: 0,
      averageWinLossRatio: 0,
    });

    return `
        ==========================
        Match Formed
        ==========================
        TEAM 1 :
        Total Wins: ${t1Stats.totalWins} , Total Losses: ${
      t1Stats.totalLosses
    } , Average Win / Loss Ratio: ${t1Stats.averageWinLossRatio}
        ${this.#team1.map((player) => player.getPlayerStats()).join("")}
        --------------------------
        TEAM 2 :
        Total Wins: ${t2Stats.totalWins} , Total Losses: ${
      t2Stats.totalLosses
    } , Average Win / Loss Ratio: ${t2Stats.averageWinLossRatio}
        ${this.#team2.map((player) => player.getPlayerStats()).join("")}
        ==========================
    `;
  }
}

export default Match;
