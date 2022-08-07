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

  printMatchDetails() {
    console.log("=============");
    console.log("*Match Formed*");
    console.log("-------------");
    console.log(" TEAM 1 :");
    this.#team1.forEach((player) => player.printPlayerStats());
    console.log("-------------");
    console.log(" TEAM 2 :");
    this.#team2.forEach((player) => player.printPlayerStats());
    console.log("=============");
  }
}

export default Match;
