# ‘Battleships’ Clone - Solo Project, 9 days

[Link to deployed version](https://iglfranks.github.io/sei-project-one/)

## Overview

My first project during the Software Engineering Immersive was using JavaScript to create a fully-functioning clone of Battleships. 

This involved designing a coherent flow of moves for the player to carry out and clear instructions on how to react to different errors, all whilst creating a randomised second set of commands for acting as the computer’s turn. 

![Battleships Page](https://i.ibb.co/jHT275T/Screenshot-2022-01-24-at-13-09-35.png)

## Brief/Requirements

- The game should be one player, with the computer placing its pieces randomly at the start of the game.
- The computer should be able to make random attacks on the player's board.


## Technologies

- JavaScript
- CSS
- HTML

## Getting started

- Click the code button to download the code
- As this project was written entirely in JavaScript, there are no dependencies to install
- Right click on the 'index.html' file and click 'Open in default browser'

## App workflow

After launching the browser, the player begins by pressing one of the three ship buttons to place each individual ship on their board. The text-box at the top of the boards gives the user different instructions to how they can alter whether their ship is placed horizontally or vertically, using the left and right arrow keys. They are also presented with a hover-preview of where the ship will be placed before they click the board to finalise their choice. 

![Battleships Workflow pic 1](https://i.ibb.co/Xt1c2ny/Screenshot-2022-01-24-at-13-15-39.png)

![Battleships Workflow pic 2](https://i.ibb.co/g6zVxmD/Screenshot-2022-01-24-at-13-14-48.png)

After placing all 3 ships and pressing start, the game begins with the player calling the first move. If the player misses, the square will turn a light-blue colour and the computer will make their move. If either the player or the computer hit, they are granted another turn immediately.
Once all of one sides’ ships are destroyed, a player will win and the user can reset the game using the reset button.


![Battleships Workflow pic 2](https://i.ibb.co/pJ0S2Qc/Screenshot-2022-01-24-at-13-17-09.png)

## Planning

Before being signed off and starting to code, I was required to write up a plan of my project to show I understood the flow of the game and the requirements.

```
// Main Game contents:

// Title
// 2 grids, one for player, one for computer
// List of boats that player can place
// Player can place boats in grid, computer places randomly
// Start button to begin game once ships are placed
// Display to show who's turn it is
// Display to show who wins

// List of ships/Placing ships before game start:

// each ship will be a separate class
// Below grid will be buttons each with picture of ship and how many spaces they take up 
// When you click the button, hovering over the grid will show preview of where it will 
// When click on grid, places boat in area that was previewed
// NB: Ships cannot touch or overlap - done with displaying ship preview as red if space is invalid?
// After player has placed all ships, computer randomly places them in their grid

// Game start:

// Each square is blank (class-less) at the beginning
// 2 Boolean const: playerHit, computerHit (true of false)
// 1 Boolean const for turns (true = player's go, false = computer's go)
// 'Ship Counter' containing total amount of ship squares each player has

// States that are defined by classes:
// 1: Not been hit yet/Been hit
// 2: Target hit/Target missed

// When player misses a target, switch the other player's turn
// When player hits target, repeat another go
// For computer: chooses square randomly
// For computer: if computer hits they try to hit another square near the one they just hit
// - Detects if 'computer hit' is true, if it is, hit a square with an index of +1/-1/+10/-10

// When a hit is made, reduce 1 from Ship counter
// If a player destroys a whole ship, show alert, add new class to ship area to make all squares new colour
// When one of them reaches 0, decide winner

```

## The Build

I separated out the different functions into two sections; one for pre-game and another for during gameplay. Pre-game functions consisted of loading the page correctly, allowing the player to place ships, as well as the hover functions. Functions during the game involved randomly placing the computer’s ships, attacking a computer square, the computer’s response, and ultimately detecting if someone has won.

![Battleships BUILD PIC 1](https://i.ibb.co/3sL7pCv/Screenshot-2022-01-24-at-13-20-07.png)

![Battleships BUILD PIC 2](https://i.ibb.co/YkQY6S1/Screenshot-2022-01-24-at-13-22-33.png)

After the grid is created on launch, the player chooses one of the 3 ship buttons to place on the board, using the arrow keys to change the rotation from horizontal to vertical. The hover previews of where the ship is going to placed are decided by the button being pressed, setting a variable to the number of squares which will need to have their classes changed (further details are shown below in the 'Featured code section'.

```javascript

function handleRotation(event) {
    const key = event.keyCode
    if (key === 39) {
      rotationOn = true
      console.log(rotationOn)
      display.innerText = 'Rotation is on, sending the ships down'
    } else if (key === 37) {
      rotationOn = false
      console.log(rotationOn)
      display.innerText = 'Rotation is off, sending the ships right'
    }
  }

```

Once all ships have been placed, pressing start initiates the 'randomise computer board' function, which is only run if the number of ships placed is equal to 3. I used window alerts as a main method of communication between the game and player as they are obvious and convey exact instructions and reasons as to why there is an issue.

```javascript
function runGameInit() {
    if (noOfShipsPlaced !== 3) {
      window.alert('Please deploy your troops first!')
    } else {
      gameStart = true
      randomiseCompuerBoard()
      playersTurn = true
      startButton.disabled = true
      runGame()
    }
  }
```

This function also contains logic which stops the ships from being placed in impossible locations (i.e. going off the board), or from overlapping each other. The example below shows the functions for the computer placement of the ship worth 2 spaces.

```javascript

for (let i = 0; i < 1; i++) {
      compRotationOn = Math.random() < 0.5 

      if (compRotationOn === false) {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) % width >= width - 1 || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 1].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 1; i++) {
            compExtraSquare = compCells[randomCompSquNu + 1]
            compExtraSquare.classList.add('compChosen')
          }
          console.log('WILL work')
        }

      } else {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) > (width * width) - (1 * 10) || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 10].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 1; i++) {
            compExtraSquare = compCells[randomCompSquNu + (10 * 1)]
            compExtraSquare.classList.add('compChosen')
          }
        }
      }

    }
```

I set a variable to act as each player's 'life' count, set at 11 which is the total number of ship squares on their board, and it is reduced by 1 each time a square is hit. A function is run after each turn to check if a player has won befotre executing the necessary commands. There are two separate functions for the player and computer's turn, each in built with the ability for a consecutive turn if they successfully hit a ship. This logic was written once again with if-else statements and classes, with necessary error handling to tackle the issue of a player trying to attack the same square again.

```javascript
function handleClickingCompSqu(event) {
    if (gameFinished === true) {
      window.alert('Please reset/refresh to begin again!')
    } else {
      if (gameStart === false || playersTurn === false) {
        window.alert('You are not allowed to attack yet, Commander!')
      } else {
        playerChosenAttack = event.target
        console.log(playerChosenAttack)
  
        if (event.target.classList.contains('hit') === false) {
          if (playerChosenAttack.classList.contains('compChosen')) {
            event.target.classList.add('hit')
            event.target.classList.add('shipHit')
            display.innerText = 'Target hit, Commander! Attack again!'
            compShipCounter -= 1
            checkWinner()
          } else {
            event.target.classList.add('hit')
            console.log('missed')
            playersTurn = false
            playerTurnBox.classList.remove('turn')
            runGame()
          }
        } else {
          window.alert('You have already attacked this space! Choose a different area.')
        }
  
      }
    }
  }
```

```javascript
function runGame() {
    if (gameFinished === true) {
      window.alert('Please reset/refresh to begin again!')
    } else {
      if (playerShipCounter !== 0) {
        if (playersTurn === true) {
          playerTurnBox.classList.add('turn')
          display.innerText = 'Commander! Please choose which area to attack!'
        }
      
        if (playersTurn === false) {
          compTurnBox.classList.add('turn')
          display.innerText = 'We missed, Commander! Waiting for enemy attack...'
          let randomCompAttackNu = Math.floor(Math.random(playersSquares) * cells.length)
          let randomCompChoice = cells[randomCompAttackNu]
          cells.splice(randomCompAttackNu, 1)
            
          let timeRemaining = 3
          countdownTimer.innerText = timeRemaining
      
          const compTurnTimer = setInterval(() => {
            timeRemaining--
            countdownTimer.innerText = timeRemaining
            if (timeRemaining === 0) {
              clearInterval(compTurnTimer)
              randomCompChoice.classList.add('hit')
    
              if (randomCompChoice.classList.contains('chosen') === true) {
                randomCompChoice.classList.add('shipHit')
                display.innerText = 'The enemy hit one of our ships! They attack again...'
                playerShipCounter -= 1
                runGame()
              } else {
                playersTurn = true
                compTurnBox.classList.remove('turn')
                runGame()
              }
    
            }
          }, 800)
            
        }
      } else {
        checkWinner()
      }
    }
  } 
```



## Featured code section

To create a hover-preview for the placement of the user’s ships, I used the ‘handleHover’ and ‘handleHoverLeave’ event listeners to create and delete preview squares based on which ship button the user has selected. The changes in appearance were shown by adding and removing the ‘hover’ class to the cells required. Each function also had two different sets of if/else statements which would be carried out based on what rotation setting the user was on. 

NB: Red error underlines are errors with the linter.

```javascript
function handleHover(event) {
    if (rotationOn === false) {
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (extraShipSquares === 1) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.add('hover')
        }
      } else if (extraShipSquares === 3) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.add('hover')
        }
      } else if (extraShipSquares === 4) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.add('hover')
        }
      }
    } else {
      playersSquares.forEach((square) => {
        if (square.classList.contains('hover') === true) {
          square.classList.remove('hover')
        }
      })
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (extraShipSquares === 1) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.add('hover')
        }
      } else if (extraShipSquares === 3) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.add('hover')
        }
      } else if (extraShipSquares === 4) {
        event.target.classList.add('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.add('hover')
        }
      }
    }
  }

```



## Challenges

A difficult obstacle to overcome was creating internal logic within the code that stops the player from placing ships that overlap each other, as well as replicating this in the logic of the computer’s randomly placed ships. This was solved using code centered around the ‘modulus’ parameter written in tandem with other statements that check the classes of squares already selected. This was particularly complex but I was especially thrilled to complete it with the help of my course T.A.’s. 

## Wins and Take-aways

As a first solo project, I was thrown into the deep end of the mental processes involved in problem solving and tackling issues head-on. I gained valuable insight into my ability as a programmer 3 weeks into the course, therefore enabling me to understand the depth of each individual problem I encountered, and whether or not I could solve it myself. 

In terms of the project itself, I thoroughly enjoyed the aspect of creating logic for the player’s moves and then finding ways to replicate it in an automated method that runs smoothly and appears as if the user is playing against another human rather than the AI.

## Potential Extra Features to add

- With more time I would have liked to incorporate some refinements to improve overall experience and create a more challenging game.

- A more ‘intelligent AI’, which would make the computer attack a square adjacent to the square it has just hit on the previous turn.
- The ability to change difficulty would change the accuracy of the computer depending on what the user has selected. This would be accomplished by adjusting the radius of squares the computer can hit the turn after it has successfully hit a player’s square.
- A scoring system to keep track of player/computer wins.







