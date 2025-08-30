// === THIS HANDLES THE DURING GAME === //

import { currentPlayerObject, newGameMenu } from './start-game';

const fields = document.querySelectorAll<HTMLButtonElement>('.field');
const actualTurn = document.getElementById('actual-turn-container');
const restartButton = document.getElementById('restart-button') as HTMLButtonElement;

// keep the moves outside of the click handler so they persist
let player1Moves: number[] = [];
let player2Moves: number[] = [];
let winnerFields : any = [];


const winningCombos: number[][] = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // other diagonal
  ];
  
// check if a player has a winning combo
// ChatGPT did this function
// return the actual winning combo (array of 3 field indexes) or null if no win yet
function getWinningCombo(playerMoves: number[]): number[] | null {
    for (const combo of winningCombos) {
      if (combo.every(cell => playerMoves.includes(cell))) {
        return combo; // found winning line
      }
    }
    return null; // no win
  }
  
function gameRuns() {
  function handleClickedField() {
    fields.forEach((field, index) => {
      field.addEventListener('click', () => {
        // prevent clicking again (works even without innerHTML check now)
        if (field.disabled) return;

        // place current player's icon
        if (currentPlayerObject.currentPlayer === 'X') {
          field.innerHTML = `<img src="./src/assets/icon-x.svg">`;
          field.disabled = true;
          field.style.opacity = '1'
          player1Moves.push(index);

          const winCombo = getWinningCombo(player1Moves); // or player2Moves
          if (winCombo) {
            winCombo.forEach(i => {
            fields[i].style.border = '2px solid #31C3BD';  // or 'winner-field-o'


            });
            console.log("Player wins!", player1Moves);
          }
          
          currentPlayerObject.currentPlayer = 'O';
        } else {
          field.innerHTML = `<img src="./src/assets/icon-o.svg">`;
          field.disabled = true;
          player2Moves.push(index);
          field.style.opacity = '1'

          const winCombo = getWinningCombo(player2Moves);
          if (winCombo) {
            winCombo.forEach(i => {
                fields[i].style.border = '2px solid #F2B137';  // or 'winner-field-o'
            });
            console.log("Player 2 (O) wins!", player2Moves);
          }
            currentPlayerObject.currentPlayer = 'X';
        }

        // update turn display
        if (actualTurn) {
          actualTurn.innerHTML = `<p>${currentPlayerObject.currentPlayer} TURN</p>`;
        }
      });
    });
  }
  handleClickedField();

  // reset everything on restart
  function restartButtonFunction() {
    restartButton.addEventListener('click', () => {
      fields.forEach(field => {
        field.innerHTML = '';
        field.disabled = false; // re-enable buttons
        field.style.opacity = '0.65'
        field.classList.remove('winner-field-x', 'winner-field-o');


      });
      player1Moves = [];
      player2Moves = [];
      currentPlayerObject.currentPlayer = 'X'; // reset to start
      if (actualTurn) {
        actualTurn.innerHTML = `<p>X TURN</p>`;
      }
    });
  }
  restartButtonFunction();
}

gameRuns();
