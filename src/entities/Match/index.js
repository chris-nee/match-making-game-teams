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
    return `
        ==========================
        Match Formed
        TEAM 1 :
        ${this.#team1.map((player) => player.getPlayerStats()).join("")}
        --------------------------

        TEAM 2 :
        ${this.#team2.map((player) => player.getPlayerStats()).join("")}
        ==========================
    `;
  }
}

export default Match;
