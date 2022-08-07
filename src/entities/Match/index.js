class Match {
  #team1;
  #team2;

  constructor(team1, team2) {
    this.#team1 = team1;
    this.#team2 = team2;
  }

  getTeam1() {
    return this.#team1;
  }

  getTeam2() {
    return this.#team2;
  }

  getMatchDetails() {
    return `
        ==========================
        Match Formed
        TEAM 1 :
        ${this.#team1.map((player) => player.getPlayerStats()).join("/n")}
        --------------------------

        TEAM 2 :
        ${this.#team2.map((player) => player.getPlayerStats()).join("/n")}
        ==========================
    `;
  }
}

export default Match;
