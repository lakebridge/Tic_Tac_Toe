function gameBoard() {
    const board = Array(9).fill("");
    return {board};
}

function createPlayer(name, symbol) {
    return {name, symbol};
}

function createGame(name) {
    const player = createPlayer(name);
    const game = gameBoard();
    return {player, game};
}

function checkWin(board, symbol) {
    
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [7, 8, 9],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    
    return wins.some(([a ,b ,c]) => (   board[a] === symbol && 
                                        board[b] === symbol && 
                                        board[c] === symbol))

    }
