function game() {
    let gameBoard = {
        top: ["","",""],
        middle: ["","",""],
        bottom: ["","",""],
    }

    return {
        showBoard() {
            console.log(gameBoard);
        },

        placeMarker(row, position, playerInput) {
            gameBoard[row][position] = playerInput;
            console.log(gameBoard);
        },
    };
}

const newGame = game();
newGame.showBoard();