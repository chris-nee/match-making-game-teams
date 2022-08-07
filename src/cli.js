import inquirer from "inquirer";
import fs from "fs";
import path from "path";

import { MatchMaker, Player } from "./index.js";

const COMMANDS_TITLE = {
  ADD_NEW_PLAYER: "Add new player",
  GET_MATCH: "Get Match",
  MASS_ADD_NEW_PLAYERS: "Mass add new players",
};

const COMMANDS_VALUE = {
  ADD_NEW_PLAYER: 1,
  GET_MATCH: 2,
  MASS_ADD_NEW_PLAYERS: 3,
};

const inquireCommand = async () =>
  new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "command",
          message: "What would you like to do ?",
          choices: [
            {
              name: COMMANDS_TITLE.ADD_NEW_PLAYER,
              value: COMMANDS_VALUE.ADD_NEW_PLAYER,
            },
            {
              name: COMMANDS_TITLE.GET_MATCH,
              value: COMMANDS_VALUE.GET_MATCH,
            },
            {
              name: COMMANDS_TITLE.MASS_ADD_NEW_PLAYERS,
              value: COMMANDS_VALUE.MASS_ADD_NEW_PLAYERS,
            },
          ],
        },
      ])
      .then(({ command }) => res(command))
      .catch(rej);
  });

const inquireAddNewPlayer = async () =>
  new Promise((res, rej) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Player name ?",
        },
        {
          type: "number",
          name: "wins",
          message: "Player wins ?",
        },
        {
          type: "number",
          name: "losses",
          message: "Player losses ?",
        },
      ])
      .then(({ name, wins, losses }) => {
        res(new Player(name, wins, losses));
      })
      .catch(rej);
  });

const inquireTeamSize = async () =>
  new Promise((res, rej) => {
    inquirer
      .prompt([{ type: "number", name: "teamSize", message: "Team size ?" }])
      .then(({ teamSize }) => res(teamSize))
      .catch(rej);
  });

const inquireMassAddNewPlayer = async () =>
  new Promise((res, rej) => {
    inquirer
      .prompt([
        { type: "input", name: "fileLoc", message: "user data JSON file" },
      ])
      .then(({ fileLoc }) => {
        const fileData = fs.readFileSync(path.resolve("./", fileLoc));
        res(JSON.parse(fileData));
      })
      .catch(rej);
  });

async function start() {
  console.log("Started new Match Making system !");
  const matchMaker = new MatchMaker();

  while (true) {
    const command = await inquireCommand();
    try {
      switch (command) {
        case COMMANDS_VALUE.ADD_NEW_PLAYER: {
          const player = await inquireAddNewPlayer();
          matchMaker.enterMatchMaking(player);
          console.log("Player added", player.getPlayerStats());
          continue;
        }

        case COMMANDS_VALUE.GET_MATCH: {
          const teamSize = await inquireTeamSize();
          const match = matchMaker.findMatch(teamSize);
          console.log(match.getMatchDetails());
          continue;
        }

        case COMMANDS_VALUE.MASS_ADD_NEW_PLAYERS: {
          const numOfPlayersBefore = matchMaker.getNumOfPlayersInQueue();
          const playersJsonData = await inquireMassAddNewPlayer();
          const players = playersJsonData.map(
            ({ name, wins, losses }) => new Player(name, wins, losses)
          );
          players.forEach((player) => matchMaker.enterMatchMaking(player));

          const numOfPlayersAfter = matchMaker.getNumOfPlayersInQueue();
          console.log(
            `Added ${
              numOfPlayersAfter - numOfPlayersBefore
            } players into the system`
          );
          continue;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

start();
