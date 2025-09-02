// === THIS HANDLES THE DURING GAME === //

import { currentPlayerObject, newGameMenu, duringGame, startGameButton, OIcon, XIcon, cpuGame, multiGame, cpu } from './start-game';

import iconX from '../assets/icon-x.svg';
import iconO from '../assets/icon-o.svg';

const fields = document.querySelectorAll<HTMLButtonElement>('.field');
const actualTurn = document.getElementById('actual-turn-container');
const restartButton = document.getElementById('restart-button') as HTMLButtonElement;

const modal = document.getElementById('modal') as HTMLDivElement;
const modalResultText = document.getElementById('modal-result-text') as HTMLHeadElement;
const modalWinnerIcon = document.getElementById('modal-winner-icon') as HTMLDivElement;

const overlay = document.querySelector('.overlay') as HTMLDivElement;
const nextRoundButton = document.getElementById('next-round-button') as HTMLButtonElement;
const quitButton = document.getElementById('quit-button') as HTMLButtonElement;


// keep the moves outside of the click handler so they persist
let player1Moves: number[] = [];
let player2Moves: number[] = []; // it is cpu moves also

function generateRandomCpuStep(): number {
  const freeIndexes = Array.from(fields)
    .map((f, i) => f.disabled ? null : i)
    .filter(i => i !== null) as number[];
  
  const randomIndex = freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
  return randomIndex;
}

function cpuPlay() {
  const index = generateRandomCpuStep();
  const field = fields[index];

  if (!field || field.disabled) return; // safety check

  field.innerHTML = `<img src="${iconO}">`;
  field.disabled = true;
  field.style.opacity = '1';
  player2Moves.push(index);
  cpuTurn = false;

  const winCombo = getWinningCombo(player2Moves);
  if (winCombo) {
    winCombo.forEach(i => fields[i].style.border = '2px solid #F2B137');
    setTimeout(() => {
      modal.style.display = 'grid';
      overlay.style.display = 'block';
    }, 1000);
    modalResultText.textContent = `Player2 (O) wins!`;
    modalWinnerIcon.innerHTML = '<img src="./src/assets/icon-o.svg">';
    nextRoundButton.style.backgroundColor = '#F2B137';
    nextRoundButton.style.borderBottom = '5px solid #b9872b';
    
    player2Wins++;
    player2Points.textContent = `${player2Wins}`;
  }

  currentPlayerObject.currentPlayer = 'X';

  if (actualTurn) {
    actualTurn.innerHTML = `<p>X TURN</p>`;
  }
}


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

  const player1Points = document.getElementById('player1-current-points') as HTMLParagraphElement;
  const player2Points = document.getElementById('player2-current-points') as HTMLParagraphElement;


  let player1Wins : number = 0;
  let ties : number = 0;
  let player2Wins : number = 0;
  let cpuTurn : boolean = false;


  
// check if a player has a winning combo
// ChatGPT made this function
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
          field.innerHTML = `<img src="${iconX}">`;
          field.disabled = true;
          field.style.opacity = '1'
          player1Moves.push(index);
          cpuTurn = true;


          const winCombo = getWinningCombo(player1Moves); 
          if (winCombo) {
            cpuTurn = false; // if player 1 gets a winning combo before cpu, cpu does not make a next move
            winCombo.forEach(i => {
              fields[i].style.border = '2px solid #31C3BD';


            });
            setTimeout(() => {
              modal.style.display = 'grid';
              overlay.style.display = 'block';
            }, 1000);
            modalResultText.textContent = `Player1 (${currentPlayerObject.currentPlayer}) wins!`
            modalWinnerIcon.innerHTML = `<img src="${iconX}">`;
            nextRoundButton.style.backgroundColor = '#31C3BD';
            nextRoundButton.style.borderBottom = '5px solid #218683';

            player1Wins ++;
            player1Points.textContent = `${player1Wins}`

          }
          
          currentPlayerObject.currentPlayer = 'O';

          if (cpu) {
            if (cpuTurn) {
              setTimeout(cpuPlay, 500); // slight delay so it feels natural
            }
          };
          
        }
        
        else {
              field.innerHTML = `<img src="${iconO}">`;
              field.disabled = true;
              player2Moves.push(index);
              field.style.opacity = '1'

          const winCombo = getWinningCombo(player2Moves);
          
          if (winCombo) {
            winCombo.forEach(i => {
                fields[i].style.border = '2px solid #F2B137';

            });
            setTimeout(() => {
              modal.style.display = 'grid';
              overlay.style.display = 'block';
            }, 1000);
            modalResultText.textContent = `Player2 (${currentPlayerObject.currentPlayer}) wins!`
            modalWinnerIcon.innerHTML = `<img src="${iconO}">`;
            nextRoundButton.style.backgroundColor = '#F2B137';
            nextRoundButton.style.borderBottom = '5px solid #b9872b';

            player2Wins ++;
            player2Points.textContent = `${player2Wins}`

          }
            currentPlayerObject.currentPlayer = 'X';
        }
      

        // update turn display
        if (actualTurn) {
          actualTurn.innerHTML = `<p>${currentPlayerObject.currentPlayer} TURN</p>`;
        }

        // === IT TIES === //
        const allFieldsFilled = Array.from(fields).every(f => f.disabled);
        if (allFieldsFilled && !getWinningCombo(player1Moves) && !getWinningCombo(player2Moves)) {
          setTimeout(() => {
            modal.style.display = 'grid';
            overlay.style.display = 'block';
          }, 1000);
          modalResultText.textContent = `ROUND TIED!`
          nextRoundButton.style.backgroundColor = 'white';
          nextRoundButton.style.borderBottom = '5px solid #3740457a';

          ties++;
          const currentTies = document.getElementById('current-ties') as HTMLParagraphElement;
          currentTies.textContent = `${ties}`
      }            
        })
      });
  }
  handleClickedField();

  // === RESTART BUTTON - reset everything on restart === //
  function restartButtonFunction() {
    restartButton.addEventListener('click', () => {
      fields.forEach(field => {
        field.innerHTML = '';
        field.disabled = false; // re-enable buttons
        field.style.opacity = '0.65'
        field.classList.remove('blue-winner-border', 'yellow-winner-border');


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

    // === NEXT ROUND BUTTON BUTTON === //

  nextRoundButton.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    fields.forEach(field => {
      field.innerHTML = '';
      field.disabled = false; // re-enable buttons
      field.style.opacity = '0.65';
      field.style.border = 'none';
      field.style.borderBottom = '8px solid #0c1217ac'


    });
    player1Moves = [];
    player2Moves = [];
    currentPlayerObject.currentPlayer = 'X'; // reset to start
    if (actualTurn) {
      actualTurn.innerHTML = `<p>X TURN</p>`;
    }

    
  });

  // === QUIT BUTTON === //

  quitButton.addEventListener('click', () => {
    duringGame.style.display = 'none';
    newGameMenu.style.display = 'grid';
    modal.style.display = 'none';
    overlay.style.display = 'none';
    startGameButton.disabled = true;
    startGameButton.classList.remove('enabled');
    OIcon.classList.add('not-active-icon');
    XIcon.classList.add('not-active-icon');
    cpuGame.style.opacity = '0.5';
    multiGame.style.opacity = '0.5';
    player1Wins = 0;
    player2Wins = 0;


    fields.forEach(field => {
      field.innerHTML = '';
      field.disabled = false; // re-enable buttons
      field.style.opacity = '0.65';
      field.style.border = 'none';
      field.style.borderBottom = '8px solid #0c1217ac'
      player1Moves = [];
      player2Moves = [];
    });

  })


}

gameRuns();
