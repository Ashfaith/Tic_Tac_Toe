function GameBoard() {
    let board = Array(9).fill(null);
    const positions = '[0][1][2]\n[3][4][5]\n[6][7][8]';
    
    //Shows current positions of player markers 
    const getBoard = () => board;

    //Places a players marker into position on the board
    const placeMarker = (position, playerInput) => {
        
        // Checks if a position is taken
        if (board[position] !== null) {
            //if taken, stops function and returns to the start
            console.log('Position taken! Choose another position');
            return true;
        } else {
            board[position] = playerInput;
            console.log(getBoard());
            return false;
        }
    }

    const resetBoard = () => {
        board = Array(9).fill(null);
    };
    
    return {
        getBoard,
        placeMarker,
        resetBoard,
    }
}




function GamePlay() {
    const board = GameBoard()
    //shows board at start of game
    console.log(board.getBoard());

    //sets each player state for the game
    const players = [
        {
          name: '',
          marker: 'X',
          choices: Array(9).fill(null),
        },
        {
          name: '',
          marker: 'O',
          choices: Array(9).fill(null),

        }
    ];

    //storage of winning combinations
    const winningCombo = () => [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const getPlayerName = () => {
        players[0].name = prompt('Player 1, choose a name');
        players[1].name = prompt('Player 2, choose a name');
    }; 
    getPlayerName()

    //initilaize player to player 1
    let player = players[0];
    
    //check which players turn
    const switchPlayer = () => {
        player = player === players[0] ? players[1] : players[0];
        gameState = (`${currentPlayer().name}'s turn`);
    };

    //update player
    const currentPlayer = () => player;


    //function to select a position on the board
    const selectPosition = (position) => {
        if (board.placeMarker(position, currentPlayer().marker)){
            console.log(`${currentPlayer().name}'s go again`);
            return true;
        }
        updatePlayerChoice(position, currentPlayer().marker);
        return false
    }

    //updates each players choices to an array, used to compare against winning combos
    const updatePlayerChoice = (position, playerInput) => {
        playerInput === 'X' ? players[0].choices[position] = position: players[1].choices[position] = position;
        console.log(`${currentPlayer().name}'s choices`);
        console.log(player.choices);
    }

    //checks after each round if the current player has a winning combo
    const checkWin = () => {
        const winningCondition = winningCombo()
        for (let i = 0; i < winningCondition.length; i++) {
            if (winningCondition[i].every(element => currentPlayer().choices.includes(element))) {
                return true;
            } else if (board.getBoard().every(position => position !== null)){
                return false;                
            };
        }
    }

    //starts each round and displays results
    let gameState = (`${currentPlayer().name}'s turn`);
    const gameStateMsg = () => gameState;
    const playRound = (position) => {
        
        if (selectPosition(position)) return;
        
        const result = checkWin();
        if (result === true) {
            
            gameState = (`${currentPlayer().name} wins!`);
            return;
        } else if (result === false) {
            gameState = ("It's a tie!");
            return;
        } 
        switchPlayer();
    };

    const newGame = () => {
        board.resetBoard();
        players.forEach(player => player.choices.fill(null));
        getPlayerName();
        console.log(board.getBoard());
        player = players[0];
        gameState = (`${currentPlayer().name}'s turn`);
    };



    return{
        gameStateMsg,
        playRound, 
        switchPlayer, 
        checkWin, 
        selectPosition, 
        currentPlayer: () => player,
        getBoard: board.getBoard, 
        newGame,
    };
}


function Display() {
    const game = GamePlay();
    const gameGrid = document.querySelector('#game-grid');
    const playerTurnDisplay = document.querySelector('#player-turn');


    //Handles which tile is selected
    const updateBoard = () => {

        // Clears out old board, prevents duplicates from being created
        gameGrid.innerHTML = '';

        //gets up to date board and player turn
        const board = game.getBoard();
        const gameStateMsg = game.gameStateMsg()

        //Display player turn
        playerTurnDisplay.textContent = gameStateMsg;
        
        
        board.forEach((tile, index) => {
            const tileButton = document.createElement('button');
            tileButton.classList.add('tile');
            tileButton.dataset.tile = index;
            tileButton.textContent = tile === null ? '' : tile;
            tileButton.addEventListener('click', () => {
               game.playRound(index);
               updateBoard();
            });
            gameGrid.appendChild(tileButton);
        });    
    };
    updateBoard();

    clearGame = () => {
        const startRoundBtn = document.querySelector('#start-round');

        startRoundBtn.addEventListener('click', () => {
            game.newGame();
            updateBoard();
        });
    }
    clearGame();
}

document.addEventListener('DOMContentLoaded', () => {
    Display();
});

