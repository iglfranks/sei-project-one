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
      const cell = document.createElement('div')
      // cell.innerText = i
      compGrid.appendChild(cell)
      cells.push(cell)
    }
  }

  createCoGrid()

  // DOCUMENT QUERIES

  const shipButtons = document.querySelectorAll('.ships')
  const startButton = document.getElementById('start')
  const resetButton = document.getElementById('reset')
  const display = document.getElementById('winner-display')

  const playersSquares = document.querySelectorAll('.emptySquare')

  const twoShipButton = document.getElementById('2-ship')
  const fourShipButton = document.getElementById('4-ship')
  const fiveShipButton = document.getElementById('5-ship')



  // GLOBAL INFO

  let shipSelected = false

  let rotationOn = false

  let extraShipSquares = 0

  let playersTurn = true // false is comp turn

  let playerShipCounter = 11
  let compShipCounter = 11

  let playerHit = false
  let compHit = false

  let squaresHitByComp = []

  // PRE-GAME

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

  // --------------------------------- WORKING WITHOUT BOUNDARY ADJUSTMENT 

  // function chooseSquare(event) {
  //   if (shipSelected === false) {
  //     window.alert('Please select a ship to place!')
  //   } else if (rotationOn === false) {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)
  //     event.target.classList.add('chosen')
  
  //     for (let i = 0; i <= extraShipSquares; i++) {
  //       let extraSquare = cells[(chosenSquare + i)]
  //       extraSquare.classList.add('chosen')
  //     }
  //   } else {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)
  //     event.target.classList.add('chosen')

  //     for (let i = 0; i <= extraShipSquares; i++) {
  //       let extraSquare = cells[chosenSquare + (10 * i)]
  //       extraSquare.classList.add('chosen')
  //     }
  //   }

  //   shipSelected = false
  // }

  // --------------------------------

  // ------------------------------- NOT WORKING WITH BOUNDARY ADJUSTMENT


  // function chooseSquare(event) {
  //   if (shipSelected === false) {
  //     window.alert('Please select a ship to place!')
  //   } else if (rotationOn === false) {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)

  //     if (extraShipSquares === 1 && chosenSquare % width !== width + 1) {
  //       console.log('wont work')
  //     } else {
  //       event.target.classList.add('chosen')
  //     }

  //     if (extraShipSquares === 3 && chosenSquare % width !== width + 3) {
  //       console.log('wont work')
  //     } else {
  //       event.target.classList.add('chosen')
  //     }
      
  
  //     for (let i = 0; i <= extraShipSquares; i++) {
  //       let extraSquare = cells[(chosenSquare + i)]
  //       if (extraSquare % width !== width - 1) {
  //         console.log('wont work')
  //       } else {
  //         extraSquare.classList.add('chosen')
  //       }
  //     }
  //   } else {
  //     let chosenSquare = parseInt(cells[parseInt(event.target.innerText)].innerText)
  //     event.target.classList.add('chosen')

  //     for (let i = 0; i <= extraShipSquares; i++) {
  //       let extraSquare = cells[chosenSquare + (10 * i)]
  //       extraSquare.classList.add('chosen')
  //     }
  //   }

  //   shipSelected = false
  // }

  // ----------------------------------------------------

  

  // function handleReset() {
  //   for (i = 0; i < 100; i++) {
  //     if (cells.classList.contains('chosen')) {
  //       console.log('yes')
  //     }
  //   }

  //   console.log(cells.classList)
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


  document.addEventListener('keyup', handleRotation)

  shipButtons.forEach((ship) => {
    ship.addEventListener('click', handleShipButton)
  })

  playersSquares.forEach((square) => {
    square.addEventListener('click', chooseSquare)
  })

  // resetButton.addEventListener('click', handleReset)

}
window.addEventListener('DOMContentLoaded', init)