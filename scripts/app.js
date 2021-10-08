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
      playerGrid.appendChild(cell)
      cells.push(cell)
    }
  }

  createPlGrid()

  const compGrid = document.querySelector('#comp-grid')

  function createCoGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i
      compGrid.appendChild(cell)
      cells.push(cell)
    }
  }

  createCoGrid()

  

}
window.addEventListener('DOMContentLoaded', init)