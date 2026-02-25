function createGame(name1, name2) {

    function createPlayer(name, symbol) {
    return {name, symbol};
    }

    function createGameBoard() {
    const board = Array(9).fill("");
    return {board};

    }
    
    const player1 = createPlayer(name1, "X");
    const player2 = createPlayer(name2, "O");

    const gameBoard = createGameBoard();
    let over = false;

    let currentPlayer = player1;

    function checkWin(board, symbol) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    return wins.some(([a ,b ,c]) => (   board[a] === symbol && 
                                        board[b] === symbol && 
                                        board[c] === symbol))
    }

    function checkTie(board) {
        return (board.every(cell => cell !== "") && !checkWin(board, "X") && !checkWin(board, "O"))
    }

    function print() {
        console.log(gameBoard.board.slice(0, 3));
        console.log(gameBoard.board.slice(3, 6));
        console.log(gameBoard.board.slice(6, 9));
    }

        
    function playMove(index) {

        if (over) return console.log("the game is over");
        if (gameBoard.board[index] !== "") return console.log("this cell is already taken");

        gameBoard.board[index] = currentPlayer.symbol;

        if (checkWin(gameBoard.board, currentPlayer.symbol)) {
            console.log("Congratulations, you win");
            over = true;
            return;
        }

        if (checkTie(gameBoard.board)) {
            console.log("the game is finished - Tie");
            over = true;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return {
        playMove,
        print,
        getCurrentPlayer: () => currentPlayer,
        getBoard: () => gameBoard.board
    };
}


