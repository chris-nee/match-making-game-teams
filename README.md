## Matchmaking System for game

A match making module written in javascript ES modules format.

## Quick Start

### Requirements

#### 1. NodeJs >= 16

Check if node is present using `node --version` command

**windows**

Download and install from https://nodejs.org/en/download/

**linux**

```sh
sudo apt install nodejs

```

**macos**

```sh
brew install node

```

#### 2. npm >= 8.12.1

Check if npm is present using `npm --version` command

**windows**

Download and install from https://nodejs.org/en/download/

**linux**

```sh
sudo apt install npm
```

**macos**

```sh
brew install npm
```

#### Installation

```console
// clone project ( If you don't have the source file )
git clone git@github.com:chris-nee/match-making-game-teams.git

// change directory to project root
cd match-making-game-teams # same level as package.json file

// install dependencies
npm install
```

## How to use

#### Use it as a module

```js
import { MatchMaker, Player } from "@riot-games/game-match-making";

const matchMaker = new MatchMaker();
const players = [
  {
    name: "Chris",
    wins: 1,
    losses: 2,
  },
  {
    name: "Tom",
    wins: 11,
    losses: 12,
  },
];
players.forEach(({ name, wins, losses }) =>
  matchMaker.enterMatchMaking(new Player(name, wins, losses))
);

const match = matchMaker.findMatch(1);
```

1. Copy source code directly to your own javascript project
2. NPM publish and install it as module ( not published yet )

#### Run Cli interactive version

Interact with the match making system to test out its capabilities

```sh
npm run start-interactive

// Select the operations
? What would you like to do ? (Use arrow keys)
❯ Add new player
  Get Match
  Mass add new players
  Configure match maker metrics

// Add new player ( Add new player to match making queue )
? What would you like to do ? Add new player
? Player name ? Chris
? Player wins ? 1
? Player losses ? NaN

// Get Match ( Create a match based on team size )
? What would you like to do ? Get Match
? Team size ? 1

// Mass add new players ( Mass add a list of players using a json file, check out src/__test__/data.json for an example data file )
? What would you like to do ? Mass add new players
? user data JSON file ( e.g. ./data/file.json )

// Configure match maker metrics ( Select the metrics match maker should use to find match )
? What metrics should the match maker sort by ? (Use arrow keys)
❯ Win / Loss Ratio
  Wins
  Losses
  Total Games


// When a match is made, you should see the following

==========================
Match Formed
==========================
[Team] - 1
[Team Stats] - Total Wins: 1855 , Total Losses: 1630 , Average Win / Loss Ratio: 1.9574376046384576

[Player] - Ernestine Holloway
[Stats] - Wins: 61 , Losses: 500 , Wins/Losses Ratio: 0.122 , Total Games: 561

[Player] - Billie Roberts
[Stats] - Wins: 942 , Losses: 951 , Wins/Losses Ratio: 0.9905362776025236 , Total Games: 1893

[Player] - Kristine Newman
[Stats] - Wins: 852 , Losses: 179 , Wins/Losses Ratio: 4.759776536312849 , Total Games: 1031

--------------------------
[Team] - 2
[Team Stats] - Total Wins: 1430 , Total Losses: 1152 , Average Win / Loss Ratio: 10.438989267889976

[Player] - Susan Potter
[Stats] - Wins: 234 , Losses: 486 , Wins/Losses Ratio: 0.48148148148148145 , Total Games: 720

[Player] - Kate Wells
[Stats] - Wins: 961 , Losses: 658 , Wins/Losses Ratio: 1.4604863221884499 , Total Games: 1619

[Player] - Candace Reynolds
[Stats] - Wins: 235 , Losses: 8 , Wins/Losses Ratio: 29.375 , Total Games: 243

==========================

```
