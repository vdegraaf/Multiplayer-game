# Multiplayer-game

<img src="https://media.giphy.com/media/RLmkyUh1AkJ2PnDCpt/giphy.gif" width="200" height="200" />

In week 7 of the Codaisseur Academy we were challenged to build a multiplayer game upon a Tic-Tac-Toe logic which was provided. What we did was:

- Extending the board from 9x9 to 12x22 so there us a grid for a board
- Add two players to the board which can move from two different computers using the keyboard arrows
- Break the 'turn-based-play' mode so both players are free to move asychronously
- Adding monsters that changed either randomly or structured over the board once a player makes a step
- Adjust the login and authorization so it supportes our gameplay
- Fixing additional bugs such as the possibility to walk off the board
- Add styling with CSS

## Gameplay
- Once setup two players on different computers can challende each other. 
- One player creates a new game, the other joins it. 
- A player needs to fly to the other side of the screen. 
- But watch out for the flying monsters!!

## Development and local deployment

To start our app:

1) git clone repro
2) cd to /server and run ' npm install'
3) in same terminal, run 'npm run dev'. Leave open.
  - a server 
4) run a local Postgres DB
5) make sure the server connects to the same port as the local postgres

4) cd to /client and run 'npm install'
5) in same terminal, run 'npm run start'. Leave open
  - a browser should be opened with the game
6) open a incognito window and browse to the same localhost
7) you're good to go!

TO PLAY ON DIFFERENT COMPUTERS
1) run everything above on one computer.
2) change the 'localhost' in /client/src/constant to your local IP adres
3) change the 'localhost' in /server/src/DB to your local IP
4) in next computer browse to the IP:{port}/games
