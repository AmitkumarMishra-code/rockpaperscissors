# Rock Paper Scissors Game
Modify your [chat app](./chat.md) to instead play a game of rock-paper-scissors.  You will need to 
modify both client and server code.

### Example

Here is the console output and input for each of 3 clients:
##### Client 1: Mark chooses Rock
```
What is your name? Mark
Successfully connected to server
(R)ock, (P)aper or (S)cissors? R
You chose rock
Waiting for response
Fred chose paper - You Lose :(
(R)ock, (P)aper or (S)cissors? 
```

##### Client 2: Fred chooses Paper, then plays again and chooses Scissors
```
What is your name? Fred
Successfully connected to server
(R)ock, (P)aper or (S)cissors? P
You chose paper
Waiting for response
Mark chose rock - You Win :)
(R)ock, (P)aper or (S)cissors? S
You chose scissors
Waiting for response
Abe chose scissors - Draw
(R)ock, (P)aper or (S)cissors? 
```

##### Client 3: Abe chooses Scissors
```
What is your name? Abe
Successfully connected to server
(R)ock, (P)aper or (S)cissors? S
You chose scissors
Waiting for response
Fred chose scissors - Draw
(R)ock, (P)aper or (S)cissors? 
```

## Stretch
Have the server store a record of each game in a [Google Firebase](https://firebase.google.com/) database
