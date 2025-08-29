// === THIS FILE HANDLES THE ICON CHOOSING OF THE STARTING PAGE/MENU OF THE GAME === //

const newGameMenu = document.getElementById('new-game-menu') as HTMLDivElement;

const XIcon = document.getElementById('x-button-menu') as HTMLButtonElement;
const OIcon = document.getElementById('o-button-menu') as HTMLButtonElement;

const cpuGame = document.getElementById('menu-new-game-cpu-button') as HTMLButtonElement;
const multiGame = document.getElementById('menu-new-game-multi-button') as HTMLButtonElement;

const startGameButton = document.getElementById('start-game') as HTMLButtonElement;


let player1 : string = '';
let player2 : string = '';

let _cpu : boolean = false;
let isGameChoosed : boolean = false;
let isGameStarted : boolean = false;


export function updateStartButton() {
    if (player1 && player2 && isGameChoosed) {
      startGameButton.classList.add('enabled');
      startGameButton.disabled = false;
    } else {
      startGameButton.classList.remove('enabled');
      startGameButton.disabled = true;
    }
  }
  
  export function startGame() {
    XIcon.addEventListener('click', () => {
      player1 = 'X';
      player2 = 'O';    
  
      XIcon.classList.add('active-icon');
      XIcon.classList.remove('not-active-icon');
  
      OIcon.classList.remove('active-icon');
      OIcon.classList.add('not-active-icon');
  
      updateStartButton();
    });
    
    OIcon.addEventListener('click', () => {
      player1 = 'O';
      player2 = 'X';
  
      OIcon.classList.add('active-icon');
      OIcon.classList.remove('not-active-icon');
  
      XIcon.classList.remove('active-icon');
      XIcon.classList.add('not-active-icon');
  
      updateStartButton();
    });
  
    // === if we play against the cpu === //
    cpuGame.addEventListener('click', () => {
      _cpu = true;
      isGameChoosed = true;
  
      cpuGame.classList.add('active-icon');
      cpuGame.classList.remove('not-active-icon');
  
      multiGame.classList.add('not-active-icon');
      multiGame.classList.remove('active-icon');
  
      updateStartButton();
    });
  
    // === if we play against another player === //
    multiGame.addEventListener('click', () => {
      _cpu = false;
      isGameChoosed = true;
  
      multiGame.classList.add('active-icon');
      multiGame.classList.remove('not-active-icon');
  
      cpuGame.classList.add('not-active-icon');
      cpuGame.classList.remove('active-icon');
  
      updateStartButton();

    });

    // if both the icons and the game style is chosen we can click on the start game button and if we do, the isGameStarted variable changes from false to true
    startGameButton.addEventListener('click', () => {
      if (player1 && player2 && isGameChoosed) {
        isGameStarted = true;
      }

      if (isGameStarted) {
        newGameMenu.style.display = 'none'
        
      } else {
        newGameMenu.style.display = 'grid'
      }
    });


    updateStartButton(); // run once on init
    
  };
  
  startGame();
  