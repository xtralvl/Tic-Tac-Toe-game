// === THIS FILE HANDLES THE ICON CHOOSING OF THE STARTING PAGE/MENU OF THE GAME === //

const XIcon = document.getElementById('x-button-menu') as HTMLButtonElement;
const OIcon = document.getElementById('o-button-menu') as HTMLButtonElement;

const cpuGame = document.getElementById('menu-new-game-cpu-button') as HTMLButtonElement;
const multiGame = document.getElementById('menu-new-game-multi-button') as HTMLButtonElement;


let player1 : string = '';
let player2 : string = '';

let cpu : boolean = false;

function startGame() {
    // if one button is choosed, the another one is disabled so you cant choose both at the same time
    

    XIcon.addEventListener('click', () => {
        player1 = 'X';
        player2 = 'O';    

        XIcon.classList.add('active-icon');
        XIcon.classList.remove('not-active-icon');

        OIcon.classList.remove('active-icon');
        OIcon.classList.add('not-active-icon');

    });
    
    OIcon.addEventListener('click', () => {
        player1 = 'O';
        player2 = 'X';

        OIcon.classList.add('active-icon');
        OIcon.classList.remove('not-active-icon');

        XIcon.classList.remove('active-icon');
        XIcon.classList.add('not-active-icon');


  

    });

    cpuGame.addEventListener('click', () => {
        cpu = true;

        cpuGame.classList.add('active-icon');
        cpuGame.classList.remove('not-active-icon');

        multiGame.classList.add('not-active-icon');
        multiGame.classList.remove('active-icon');
        
        
    })

    multiGame.addEventListener('click', () => {
        cpu = false;

        multiGame.classList.add('active-icon');
        multiGame.classList.remove('not-active-icon');

        cpuGame.classList.add('not-active-icon');
        cpuGame.classList.remove('active-icon');
        
    })


};

startGame()
// when both the icon and the game style is choosed the game starts