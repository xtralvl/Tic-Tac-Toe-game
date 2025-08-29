// === THIS HANDLES THE DURING GAME WITH CPU === //

import {currentPlayerObject, newGameMenu} from './start-game';

const fields = document.querySelectorAll<HTMLButtonElement>('.field');

const actualTurn = document.getElementById('actual-turn-container');

function gameRuns() {

  function handleClickedField() {
    fields.forEach(field => {
        field.addEventListener('click', () => {
            if (field.innerHTML.trim() !== '') return;
    
            // place current player's icon (inside click handler!)
            if (currentPlayerObject.currentPlayer === 'X') {
                field.innerHTML = `<img src="./src/assets/icon-x.svg">`;
                currentPlayerObject.currentPlayer = 'O';
            } else {
                field.innerHTML = `<img src="./src/assets/icon-o.svg">`;
                currentPlayerObject.currentPlayer = 'X';
            }
    
            // update turn display
            if (actualTurn) {
                actualTurn.innerHTML = `<p>${currentPlayerObject.currentPlayer} TURN</p>`;
            }
        });
    });

  }  
  handleClickedField()
}

gameRuns()
