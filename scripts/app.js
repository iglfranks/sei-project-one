// PLAN BATTLESHIPS

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

function init() { 

  const playerGrid = document.querySelector('#player-grid')

  const width = 10
  const cellCount = width * width
  const cells = []
  const compCells = []

  function createPlGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      cell.classList.add('emptySquare')
      cell.classList.add(i)
      playerGrid.appendChild(cell)
      cells.push(cell)
    }
  }

  createPlGrid()

  const compGrid = document.querySelector('#comp-grid')

  function createCoGrid() {
    for (let i = 0; i < cellCount; i++) {
      const compCell = document.createElement('div')
      compCell.innerText = i
      compCell.classList.add('compEmptySquare')
      compCell.classList.add(i)
      compGrid.appendChild(compCell)
      compCells.push(compCell)
    }
  }

  createCoGrid()

  // DOCUMENT QUERIES

  const shipButtons = document.querySelectorAll('.ships')
  const startButton = document.getElementById('start')
  const resetButton = document.getElementById('reset')
  const display = document.getElementById('winner-display')
  const countdownTimer = document.getElementById('countdown')

  const playersSquares = document.querySelectorAll('.emptySquare')
  const compSquares = document.querySelectorAll('.compEmptySquare')
  const playerTurnBox = document.getElementById('players-turn')
  const compTurnBox = document.getElementById('comps-turn')

  const twoShipButton = document.getElementById('2-ship')
  const fourShipButton = document.getElementById('4-ship')
  const fiveShipButton = document.getElementById('5-ship')

  // GLOBAL INFO

  let buttonLastSelected  
  let shipSelected = false
  let noOfShipsPlaced = 0

  let rotationOn = false
  let compRotationOn = false

  let extraShipSquares = 0

  let gameStart = false

  let playersTurn // false is comp turn

  let playerChosenAttack

  let playerShipCounter = 11
  let compShipCounter = 11

  let gameFinished = false


  // PRE-GAME

  function handleReset() {

    playersSquares.forEach((square) => {
      if (square.classList.contains('chosen') === true) {
        square.classList.remove('chosen')
      } 

      if (square.classList.contains('hit') === true) {
        square.classList.remove('hit')
      } 

      if (square.classList.contains('shipHit') === true) {
        square.classList.remove('shipHit')
      } 
    })

    compSquares.forEach((square) => {
      if (square.classList.contains('compChosen') === true) {
        square.classList.remove('compChosen')
      } 

      if (square.classList.contains('hit') === true) {
        square.classList.remove('hit')
      } 

      if (square.classList.contains('shipHit') === true) {
        square.classList.remove('shipHit')
      } 
    })

    playerShipCounter = 11
    compShipCounter = 11
    noOfShipsPlaced = 0
    gameStart = false
    extraShipSquares = 0
    display.innerText = 'Welcome to Battleships! To begin, place all of your ships on the board and then press start!'
    twoShipButton.disabled = false
    fourShipButton.disabled = false
    fiveShipButton.disabled = false
    startButton.disabled = false
  }

  // ->>>>> FIX IT ^ MAKE IT SO IT ADDS BACK THE HIT SQUARES TO THE ARRAY


  const initGame = setTimeout(() => {
    display.innerText = 'Welcome to Battleships! To begin, place all of your ships on the board and then press start!'
    fiveShipButton.innerText = 'Aircraft Carrier'
    fourShipButton.innerText = 'Fighter'
    twoShipButton.innerText = 'Frigate'
  }, 10)

  function handleShipButton(event) {
    if (event.target.id === '2-ship') {
      console.log('2ship selected')
      shipSelected = true
      extraShipSquares = 1
      display.innerText = 'Press right arrow to rotate the ships downwards, left arrow to rotate them to the right'
      twoShipButton.disabled = true
      buttonLastSelected = twoShipButton
    } else if (event.target.id === '4-ship') {
      shipSelected = true
      extraShipSquares = 3
      display.innerText = 'Press right arrow to rotate the ships downwards, left arrow to rotate them to the right'
      fourShipButton.disabled = true
      buttonLastSelected = fourShipButton
    } else if (event.target.id === '5-ship') {
      shipSelected = true
      extraShipSquares = 4
      display.innerText = 'Press right arrow to rotate the ships downwards, left arrow to rotate them to the right'
      fiveShipButton.disabled = true
      buttonLastSelected = fiveShipButton
    }
  }

  // function chooseSquare(event) {
  //   if (shipSelected === false) {
  //     window.alert('Please select a ship to place!')
  //   } else if (rotationOn === false) {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

  //     if (chosenSquare % width >= width - extraShipSquares || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + extraShipSquares].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 1)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 2)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 3)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 4)].classList.contains('chosen')) {
  //       window.alert('That ship wont fit there! Please try again.')
  //       buttonLastSelected.disabled = false
  //     } else {
  //       event.target.classList.add('chosen')
  //       for (let i = 0; i <= extraShipSquares; i++) {
  //         let extraSquare = cells[(chosenSquare + i)]
  //         extraSquare.classList.add('chosen')
  //       }
  //       noOfShipsPlaced += 1
  //       console.log(noOfShipsPlaced)
  //     }
  
  //     // TO MAKE THEM NOT OVERLAP - if (cells[(parseInt(event.target.innerText)) + extraShipSquares].classList.contains('chosen'))
    
  //   } else {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

  //     if (chosenSquare > (width * width) - (extraShipSquares * 10) || event.target.classList.contains('chosen') === true) {
  //       window.alert('That ship wont fit there! Please try again.')
  //       buttonLastSelected.disabled = false
  //     } else {
  //       event.target.classList.add('chosen')
  //       for (let i = 0; i <= extraShipSquares; i++) {
  //         let extraSquare = cells[chosenSquare + (10 * i)]
  //         extraSquare.classList.add('chosen')
  //       }
  //       noOfShipsPlaced += 1
  //       console.log(noOfShipsPlaced)
  //     }

      
  //   }
  //   shipSelected = false

  //   if (noOfShipsPlaced === 3) {
  //     display.innerText = 'All ships placed? Click Start to begin!'
  //   }
  // }



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

  function handleHoverLeave(event) {
    if (rotationOn === false) {
      playersSquares.forEach((square) => {
        if (square.classList.contains('hover') === true) {
          square.classList.remove('hover')
        }
      })
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (extraShipSquares === 1) {
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.remove('hover')
        }
      } else if (extraShipSquares === 3) {
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.remove('hover')
        }
      } else if (extraShipSquares === 4) {
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.remove('hover')
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
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.remove('hover')
        }
      } else if (extraShipSquares === 3) {
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.remove('hover')
        }
      } else if (extraShipSquares === 4) {
        event.target.classList.remove('hover')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.remove('hover')
        }
      } 
    }
  } 

  function chooseSquare(event) {
    if (shipSelected === false) {
      window.alert('Please select a ship to place!')
    } else if (rotationOn === false) {
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (extraShipSquares === 1) {
        if (chosenSquare % width >= width - extraShipSquares || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + extraShipSquares].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          console.log('clicked')
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[(chosenSquare + i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }

      } else if (extraShipSquares === 3) {
        if (chosenSquare % width >= width - extraShipSquares || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + extraShipSquares].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 1)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 2)].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[(chosenSquare + i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }

      } else if (extraShipSquares === 4) {
        if (chosenSquare % width >= width - extraShipSquares || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + extraShipSquares].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 1)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 2)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + (extraShipSquares - 3)].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[(chosenSquare + i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }
      }
    
    } else {
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (extraShipSquares === 1) {
        if (chosenSquare > (width * width) - (extraShipSquares * 10) || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + (extraShipSquares * 10)].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[chosenSquare + (10 * i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }

      } else if (extraShipSquares === 3) {
        if (chosenSquare > (width * width) - (extraShipSquares * 10) || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + (extraShipSquares * 10)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + ((extraShipSquares * 10) - 10)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + ((extraShipSquares * 10) - 20)].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[chosenSquare + (10 * i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }

      } else if (extraShipSquares === 4) {
        if (chosenSquare > (width * width) - (extraShipSquares * 10) || event.target.classList.contains('chosen') === true || cells[(parseInt(event.target.innerText)) + (extraShipSquares * 10)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + ((extraShipSquares * 10) - 10)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + ((extraShipSquares * 10) - 20)].classList.contains('chosen') || cells[(parseInt(event.target.innerText)) + ((extraShipSquares * 10) - 30)].classList.contains('chosen')) {
          window.alert('That ship wont fit there! Please try again.')
          buttonLastSelected.disabled = false
        } else {
          event.target.classList.add('chosen')
          for (let i = 0; i <= extraShipSquares; i++) {
            let extraSquare = cells[chosenSquare + (10 * i)]
            extraSquare.classList.add('chosen')
          }
          noOfShipsPlaced += 1
          extraShipSquares = 0
          console.log(extraShipSquares)
        }
      }  
    }
    shipSelected = false

    if (noOfShipsPlaced === 3) {
      display.innerText = 'All ships placed? Click Start to begin!'
    }
  }

  // ------ GAME START ---------

  function randomiseCompuerBoard() {
    let randomCompSquNu
    let randomCompSqu
    let compExtraSquare

    // for 2 ship -----------

    for (let i = 0; i < 1; i++) {
      compRotationOn = Math.random() < 0.5 
      // console.log(compRotationOn)

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

    // for 4 ship --------------
    
    compRotationOn = Math.random() < 0.5 
    console.log(compRotationOn)

    for (let i = 0; i < 1; i++) {
      if (compRotationOn === false) {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) % width >= width - 3 || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 3].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (3 - 1)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (3 - 2)].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 3; i++) {
            compExtraSquare = compCells[randomCompSquNu + i]
            compExtraSquare.classList.add('compChosen')
          }
          console.log('WILL work')
        }
      } else {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) > (width * width) - (3 * 10) || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 30].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (30 - 10)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (30 - 20)].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 3; i++) {
            compExtraSquare = compCells[randomCompSquNu + (10 * i)]
            compExtraSquare.classList.add('compChosen')
          }
        }
      }
    }

    // for 5 ship ---------------

    compRotationOn = Math.random() < 0.5 
    console.log(compRotationOn)

    for (let i = 0; i < 1; i++) {
      if (compRotationOn === false) {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) % width >= width - 4 || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 4].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (4 - 1)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (4 - 2)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (4 - 3)].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 4; i++) {
            compExtraSquare = compCells[randomCompSquNu + i]
            compExtraSquare.classList.add('compChosen')
          }
          console.log('WILL work')
        }
      } else {
        randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
        randomCompSqu = compCells[randomCompSquNu]
        if (parseInt(randomCompSqu.innerText) > (width * width) - (4 * 10) || randomCompSqu.classList.contains('compChosen') === true || compCells[(parseInt(randomCompSqu.innerText)) + 40].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (40 - 10)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (40 - 20)].classList.contains('compChosen') || compCells[(parseInt(randomCompSqu.innerText)) + (40 - 30)].classList.contains('compChosen')) {
          i--
          console.log('wont work')
        } else {
          randomCompSqu.classList.add('compChosen')
          for (let i = 0; i <= 4; i++) {
            compExtraSquare = compCells[randomCompSquNu + (10 * i)]
            compExtraSquare.classList.add('compChosen')
          }
        }
      }
    }

  }

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

  function attackHover(event) {
    if (gameStart === true && playersTurn === true) {
      event.target.classList.add('attackHover')
    }
  }

  function attackHoverLeave(event) {
    if (gameStart === true) {
      event.target.classList.remove('attackHover')
    }
  }

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
            console.log(compShipCounter)
            checkWinner()
          } else {
            event.target.classList.add('hit')
            console.log('missed')
            playersTurn = false
            playerTurnBox.classList.remove('turn')
            console.log(playersTurn)
            runGame()
          }
        } else {
          window.alert('You have already attacked this space! Choose a different area.')
        }
  
      }
    }
    
  }

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
          console.log('array length', cells.length)
          console.log('list of cells', cells)
          console.log('random comp attack ->', randomCompChoice)
            
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
                // checkWinner()
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

  // function compConsecTurn() {
    
  // }

  function checkWinner() {
    if (playerShipCounter === 0) {
      display.innerText = 'The enemy has destroyed all our Commander... we have lost.'
      gameFinished = true
    } else if (compShipCounter === 0) {
      display.innerText = 'We have won Commander!'
      gameFinished = true
    }
  }

  // -----------------------------------------

  compSquares.forEach((compSqu) => {
    compSqu.addEventListener('click', handleClickingCompSqu)
    compSqu.addEventListener('mouseenter', attackHover)
    compSqu.addEventListener('mouseleave', attackHoverLeave)
  })

  document.addEventListener('keyup', handleRotation)

  shipButtons.forEach((ship) => {
    ship.addEventListener('click', handleShipButton)
  })

  playersSquares.forEach((square) => {
    square.addEventListener('click', chooseSquare)
    square.addEventListener('mouseenter', handleHover)
    square.addEventListener('mouseleave', handleHoverLeave)
  })

  startButton.addEventListener('click', runGameInit)

  resetButton.addEventListener('click', handleReset)

}
window.addEventListener('DOMContentLoaded', init)