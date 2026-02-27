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

    const display = displayGame();

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

        if (over) return alert("the game is over");
        if (gameBoard.board[index] !== "") return alert("this cell is already taken");

        gameBoard.board[index] = currentPlayer.symbol;
        display(index, currentPlayer.symbol);

        if (checkWin(gameBoard.board, currentPlayer.symbol)) {
           alert(`Congratulations, ${currentPlayer.name} wins`);
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


function displayGame() {

    const board = document.createElement("div");
    const h1 = document.querySelector("h1");

    board.classList.add("board");
    h1.after(board);

    // col = i%3;
    // row = Math.floor (index /3);

    for (let r=0; r<3; r++) {
        for (let c=0; c<3; c++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            const id = r*3 + c;
            cell.dataset.index = id;
            board.appendChild(cell);
        }
    }



    function display(index, symbol) {

        const cell = document.querySelector(`[data-index="${index}"]`);

        cell.textContent = symbol;
    }

    return display;

    
}

(function launch() {
    const player1 = prompt("Play1 name?") || "Player 1";
    const player2 = prompt("Play2 name?") || "Player 2";

    const game = createGame(player1, player2);
    const board = document.querySelector(".board");

    board.addEventListener("click", (e) => {

            const cell = e.target.closest(".cell");
            const index = cell.dataset.index;

            game.playMove(index);

    })
})()