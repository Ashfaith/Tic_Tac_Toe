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
            
        }
    }
    
    return {
        getBoard,
        placeMarker,
    }
}




function GamePlay(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = GameBoard()
    //shows board at start of game
    console.log(board.getBoard());

    //sets each player state for the game
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

    //initilaize player to player 1
    let player = players[0];
    
    //check which players turn
    const switchPlayer = () => {
        player = player === players[0] ? players[1] : players[0];
        playRound();
    };

    //update player
    const currentPlayer = () => player;


    //function to select a position on the board
    const selectPosition = (playerMarker) => {
        let position = prompt('Select a position');
        let positionInt = parseInt(position);
        if (board.placeMarker(positionInt, playerMarker) === true){
            return true;
        }
        updatePlayerChoice(positionInt, playerMarker);
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
                console.log("It's a tie!");
                return false;                
            } else {
                console.log("no winner yet");
            };
        }
    }

    //starts each round and displays results
    const playRound = () => {
        console.log(`${currentPlayer().name}'s turn`);
        if (selectPosition(currentPlayer().marker) === true){
            console.log(`${currentPlayer().name} go again`);
            return playRound();
        };
        if (checkWin() === true){
            console.log(`${currentPlayer().name} wins!`);
            return
        } else if (checkWin() === false) {
            return
        }
        switchPlayer();
    }



    return{playRound, switchPlayer, checkWin, selectPosition};
}

const game = GamePlay();
game.playRound();