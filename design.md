# Problem Statement

There is an online team-based game with players of varying skills level.

The system needs to be able to match players based on their individual skill level into balanced teams. 
The system should also be configurable, allowing us to change the matching principles and conditions.
The system should also get smarter and more accurately match players on teams.

The teams can be 3v3, 4v4, 5v5....
All players enter the game as solo participants.


## Assupmtions

- All players added along the way are unique, match maker will not check if there are duplicated players


## Test Data

A json file ( `src/__test__/data.json` ) containing data of 200 players is provided as sample data. This can be used for test or further extended ( but do not remove any properties )


## Files

General file layout

```
- Source code       - /src/
- Test files        - /__tests__/
- User document     - /README.md
- Design document   - /design.ms
- Project Config    - /package.json
```


## Design

We will first define the **entities** that we will be using commonly in the system.

    - Player 
    - Match
    - MatchMaker

Next, we will define the system on which the entities run on and how the system will interact with the entities.

    - How Match maker works
    - Match making principles

Next, we will define how users can **interact** with and **configure** the system.

    - Methods to access the system
    - Options provided to configure the system

Next, we will define how **testing** can be set up for the system.

    - What will be tested
    - How to run tests
    - Testing environment


### Entities

#### Player

A player is defined as an individual with the following properties. 

    - Name
    - Wins
    - Losses

**Input Data**
```json
// Expected data
{
    name: "Chris",
    wins: 100,
    losses: 200
    // ... more ?
}
```

**Class Implementation**
```js
class Player {
    constructor(name, wins, losses) {
        this.#name = name
        this.#wins = wins
        this.#losses = losses
    }
    getName() {}
    getWins() {}
    getLosses() {}
    getWinLossesRatio() {}
}
```

#### Match

A Match is defined as a set of 2 teams of the same size and similar collective skill level

**Class Implementation**
```js
class Match { 
    constructor(team1, team2) { 
        this.#team1 = null
        this.#team2 = null
    }
    getTeam1() {}
    getTeam2() {}
}
```

#### MatchMaker

A MatchMaker is able to queue players and create fair matches of varying team sizes for players in queue. MatchMaker also provides various configuration methods to produce different matching outcome.

**Class Implementation**
```js
class MatchMakingSystem {
    constructor() {
        this.#minTeamSize = 1
        this.#maxTeamSize = 10
        this.#playersInQueue = new Queue()
        this.#matches = []
    }
    getMinTeamSize() {}
    getmaxTeamSize() {}
    setMinmaxTeamSize(min, max) {}
    static isNum(value) {}
    isValidTeamSize(teamSize) {}
    getNumOfPlayersInQueue() {}
    getPlayers(numOfPlayers) {}
    generateTeamPair(players) {}
    findMatch(teamSize) {}
    enterMatchMaking(newPlayer) {}
    clearQueue() {}
}
```
### System

#### How Match Making works

1. Once an instance of matchmaker is created. Throughout its lifecycle, it will manage an internal queue of players. 

2. Every new player added will be added the back of the players queue.

3. Whenever matchmaker is called upon to generate a match, it will first evaluate the requirements of the match, such as the team size required for the match. 

4. Then it will select the players at the front of queue. If team size is 3, then given that there are 2 teams, a total of 6 players will be selected from the front of the queue.

5. Then the team splitting will be conducted among the selected 6 players. The way splitting is conducted will depend on the strategy selected. This will be discussed in the next part ( Match Making Principles ). 

6. Once teams are generated, a match is formed for the 2 teams.


#### Match Making Principles

In terms of how we create the 2 teams, we try to make sure that the 2 teams are very similar in skill level. There can be some slight differences but the gap should not be too wide.

__Strategy 1 - First come first serve__

1. __Getting the next **n** players in queue__

    When we try to create a match based on team size of n players, we select the first 2n players in the players queue. 
    
2. __We sort the players by a predetermined set of metrics__
    
    - Metric 1: Win to Loss Ratio
    - Metric 2: Absolute Win number

3. __Odd/Even split__
    
    Odd players in sort order goes to team 1, even players in sort order goes to team 2.






_Improvement over time_

If possible, we would like the system to get smarter and do more accurate matches over time. One indicator of this is to reduce the win to loss ratio between players. Over the long run, we should seen the variation of win/loss ratio of players reduce. No players should always be winning and no players should always be losing.

    - Introduce handicap ( if a player is below average team skill level, player will be consider handicap  )


### Interaction & Configuration

#### Command line interaction tool
    - run `npm run start-interactive`
    - Select initial command
        - 1 to add players
            - When a player is added, log info
        - 2 to find match ( input team size )
            - When a match is formed, print out match details
        - 3 to mass add players ( json file location )
            - log how many players were added

#### Configuration

Through match maker instance, we can configure the following properties

- Maximum and minimum team size
- Sort strategy
- Degree of Variation ( difference between teams' skills level )


### Testing

Jest testing framework is used for testing.

```
run `npm test`
```
1. Unit testing
    - All classes 
    - All utils

2. Integrated testing
    - Running of match maker module with json file data






