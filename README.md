# Matchmaking System for game

A match making module written in javascript and can be run across multiple systems.


## Quick Start

#### Requirements

- NodeJs>=16 
```sh
( if not installed )
// windows
// linux
// macos

```
- Download
```
git clone ...
```

#### Build
```sh
cd ${project dir name}/ # same level as package.json file
node build
```

#### Run
```sh
node /bin/matchmake
```


## Problem Statement

There is an online team-based game with players of varying skills level.

The system needs to be able to match players based on their individual skill level into balanced teams. 
The system should also be configurable, allowing us to change the matching principles and conditions.
The system should also get smarter and more accurately match players on teams.

The teams can be 3v3, 4v4, 5v5....
All players enter the game as solo participants.


### Data

A json file containing data of 200 players is provided as sample data. This can be used for test or further extended ( but do not remove any properties )


### Files

- Build scripts     - /build/
- Source code       - /src/
- Test files        - /tests/
- Documentation     - /README.md
- Project Config    - /package.json


### Design

We will first define the entities that we will be using commonly in the system. 
    - Player
    - Match

Next, we will define the system on which the entities run on and how the system will interact with the entities.
    - Match making system
    - Match making principles

Next, we will define how users can interact with and configure the system. 
    - Methods to access the system
    - Options provided to configure the system

Next, we will define how testing can be set up for the system.
    - What will be tested
    - How to run tests
    - Testing environment


##### Entities

- Player 
A player is defined as an individual with the following properties. Wins are team wins, losses are team losses.

Input Data
```json
// Expected data
{
    name: "Chris",
    wins: 100,
    losses: 200
    // ... more ?
}
```

Class Implementation
```js
class Player {
    constructor(name, wins, losses) {
        this.name = name
        this.wins = wins
        this.losses = losses
    }
    getName() {}
    getWins() {}
    getLosses() {}
}
```

- Match
A Match is defined as a set of 2 teams of the same size and similar collective skill level

Class Implementation
```js
class Match { 
    constructor() { 
        this.team1 = null
        this.team2 = null
        this.state = PENDING 
    }
    getState() {}
    setState() {}
    setTeam1() {}
    setTeam2() {}
}
```

##### System

- Match Making System
A match matchmaking system is a single entity in the entire program. It tries to create matches.
```js
class MatchMakingSystem {
    constructor() {
        this.players = []
    }
    getMatch(teamSize) {}
    addNewPlayer(player) {}
}
```

- Match Making Principles

When we try to create a match based on team size of n players, we select the first n players in the players queue.

In terms of how we create the 2 teams, we try to make sure that the 2 teams are very similar in skill level. There can be some slight differences but the gap should not be too wide.

    - Metric 1: Win to Loss Ratio
    - Metric 2: Absolute Win number

    Naive - We can first sort by metric then odd indexes go to team 1 , even indices go to team 2.

- Improvement over time 

If possible, we would like the system to get smarter and do more accurate matches over time. One indicator of this is to reduce the win to loss ratio between players. Over the long run, we should seen the variation of win/loss ratio of players reduce. No players should always be winning and no players should always be losing.

    - Introduce handicap ( if a player is below average team skill level, player will be consider handicap  )


##### Interaction & Configuration

- Interaction
    - Run program
    - 1 to add players
    - 2 to find match ( input team size )
    - When a match is formed, print out match details

- Configuration
    - Variation ( difference between teams' skills level )


##### Testing

### Code Organisation

- entities      -> src/entities
- matchmaking   -> src/singleton/matchmaking.js
- entry         -> src/index.js

Classes will be used to manage the entites. Match making system will be a singleton since only one entity of it is needed.


Entry file will be used to initialise a command line interface with matchmaking system pre-setup.





