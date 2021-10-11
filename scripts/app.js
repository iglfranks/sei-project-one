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

  // GRID CREATION

  // const grids = document.querySelectorAll('.grid')

  // const width = 10
  // const cellCount = width * width
  // const cells = []

  // function createGrid() {
  //   for (let i = 0; i < cellCount; i++) {
  //     const cell = document.createElement('div')
  //     cell.innerText = i
  //     console.log(grids)
  //     grids.appendChild(cell)
  //     cells.push(cell)
  //   }
  // }

  // createGrid()

  // grids.forEach((grid) => {
  //   createGrid()
  // })

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

  const playersSquares = document.querySelectorAll('.emptySquare')
  const compSquares = document.querySelectorAll('.compEmptySquare')
  const playerTurnBox = document.getElementById('players-turn')
  const compTurnBox = document.getElementById('comps-turn')

  const twoShipButton = document.getElementById('2-ship')
  const fourShipButton = document.getElementById('4-ship')
  const fiveShipButton = document.getElementById('5-ship')

  // GLOBAL INFO

  let shipSelected = false
  let noOfShipsPlaced = 0

  let rotationOn = false
  let compRotationOn = false

  let extraShipSquares = 0

  let playersTurn = true // false is comp turn

  let playerShipCounter = 11
  let compShipCounter = 11

  let playerHit = false
  let compHit = false

  let squaresHitByComp = []

  // PRE-GAME

  const initGame = setTimeout(() => {
    display.innerText = 'Welcome to Battleships! To begin, place all of your ships on the board and then press start!'
  }, 10)

  function handleShipButton(event) {
    if (event.target.id === '2-ship') {
      shipSelected = true
      extraShipSquares = 1
      twoShipButton.disabled = true
    } else if (event.target.id === '4-ship') {
      shipSelected = true
      extraShipSquares = 3
      fourShipButton.disabled = true
    } else if (event.target.id === '5-ship') {
      shipSelected = true
      extraShipSquares = 4
      fiveShipButton.disabled = true
    }
  }

  function chooseSquare(event) {
    if (shipSelected === false) {
      window.alert('Please select a ship to place!')
    } else if (rotationOn === false) {
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      // put another condition if if statement about overalpping 

      if (chosenSquare % width >= width - extraShipSquares) {
        window.alert('That ship wont fit there! Please reset and try again.')
      } else {
        event.target.classList.add('chosen')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[(chosenSquare + i)]
          extraSquare.classList.add('chosen')
        }
        noOfShipsPlaced += 1
        console.log(noOfShipsPlaced)
      }
  
    
    } else {
      let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

      if (chosenSquare > (width * width) - (extraShipSquares * 10)) {
        window.alert('That ship wont fit there! Please reset and try again.')
      } else {
        event.target.classList.add('chosen')
        for (let i = 0; i <= extraShipSquares; i++) {
          let extraSquare = cells[chosenSquare + (10 * i)]
          extraSquare.classList.add('chosen')
        }
        noOfShipsPlaced += 1
        console.log(noOfShipsPlaced)
      }

      
    }
    shipSelected = false

    if (noOfShipsPlaced === 3) {
      display.innerText = 'All ships placed? Click Start to begin!'
    }
  }

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

  // function handleReset() {
  //   for (i = 0; i < 100; i++) {
  //     if (cells.classList.contains('chosen')) {
  //       console.log('yes')
  //     }
  //   }

  //   console.log(cells.classList)
  // }

  // ------ GAME START ---------

  function randomiseCompuerBoard() {
    let randomCompSquNu
    let randomCompSqu
    let compExtraSquare

    // for 2 ship -----------

    for (let i = 1; i < 1; i++) {
      compRotationOn = false
      // Math.random() < 0.5 <- code for randomising rotation
      console.log(compRotationOn)
      if (compRotationOn === false) {
        // randomCompSquNu = Math.floor(Math.random(compSquares) * 99)
  
        randomCompSqu = compCells[29]
        if (randomCompSqu > (width * width) - (1 * 10)) {
          i--
          console.log('wont work')
        } else {
          // randomCompSqu.classList.add('chosen')
          // for (let i = 0; i <= 1; i++) {
          //   compExtraSquare = compCells[29 + 1]
          //   compExtraSquare.classList.add('chosen')
          // }
          console.log('WILL work')
        }
      }
    }

    
    
    // wrap in a for loop, do i--



    // for 4 ship --------------

    // for 5 ship ---------------

  }

  function runGame() {
    
    if (playersTurn === true) {
      playerTurnBox.classList.add('turn')

      // write code for players turn here

      // end code in playersTurn === false
    }

    if (playersTurn === false) {
      compTurnBox.classList.add('turn')

      // write code for a countdown timer, then computer takes turn

      // end turn in playersTurn === true 
    }
  }

  function runGameInit() {
    if (noOfShipsPlaced !== 3) {
      window.alert('Please deploy your troops first!')
    } else {
      randomiseCompuerBoard()
      runGame()
    }
  }

  function handleClickingCompSqu(event) {

  }


  compSquares.forEach((compSqu) => {
    compSqu.addEventListener('click', handleClickingCompSqu)
  })

  document.addEventListener('keyup', handleRotation)

  shipButtons.forEach((ship) => {
    ship.addEventListener('click', handleShipButton)
  })

  playersSquares.forEach((square) => {
    square.addEventListener('click', chooseSquare)
  })

  startButton.addEventListener('click', runGameInit)

  // resetButton.addEventListener('click', handleReset)

}
window.addEventListener('DOMContentLoaded', init)