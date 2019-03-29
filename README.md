
TWO PLAYER GAME

To start our app:

1) git clone repro
2) cd to /server and run 'npm install'
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