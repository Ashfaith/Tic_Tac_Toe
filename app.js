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
            return ('Position taken! Choose another position');
        } else {
            board[position] = playerInput;
            console.log(getBoard());
            
        }
    }
    
    return {
        getBoard,
        placeMarker,
    }
}




function GamePlay(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = GameBoard()

    console.log(board.getBoard());

    const players = [
        {
          name: playerOneName,
          marker: 'X',
          choices: Array(9).fill(null),
        },
        {
          name: playerTwoName,
          marker: 'O',
          choices: Array(9).fill(null),

        }
    ];


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

    //initilaize player to player 1
    let player = players[0];
    
    //check which players turn
    const switchPlayer = () => {
        player = player === players[0] ? players[1] : players[0];
        playRound();
    };

    //update player
    const currentPlayer = () => player;


    
    const selectPosition = (playerMarker) => {
        let position = prompt('Select a position');
        let positionInt = parseInt(position);
        board.placeMarker(positionInt, playerMarker);
        updatePlayerChoice(positionInt, playerMarker);
    }

    const updatePlayerChoice = (position, playerInput) => {
        playerInput === 'X' ? players[0].choices[position] = position: players[1].choices[position] = position;
        console.log(player.choices);
    }

    const checkWin = () => {
        const winningCondition = winningCombo()
        for (let i = 0; i < winningCondition.length; i++) {
            if (winningCondition[i].every(element => currentPlayer().choices.includes(element))) {
                return true;
            } else {
                console.log("no winner yet");
            };
        }
    }

    const playRound = () => {
        console.log(`${currentPlayer().name}'s turn`);
        selectPosition(currentPlayer().marker);
        if (checkWin() === true){
            console.log(`${currentPlayer().name} wins!`);
            return;
        }
        switchPlayer();
    }



    return{playRound, switchPlayer, checkWin, selectPosition};
}

const game = GamePlay();
game.playRound();