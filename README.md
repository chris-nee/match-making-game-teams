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
```
