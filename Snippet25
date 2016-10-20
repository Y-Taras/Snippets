var board = ['x', 'o', 'e', 'o', 'e', 'e', 'e', 'e', 'e'];
var signPlayer = 'o';
var signAI = (signPlayer === 'x') ? 'o' : 'x';

game = {
    over: function(board) {
        for (var i = 0; i < board.length; i += 3) {
            if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
                return board[i] !== 'e' ? board[i] : false;
            }
        }
        for (var j = 0; j < 3; j++) {
            if (board[j] === board[j + 3] && board[j + 3] === board[j + 6]) {
                return board[j] !== 'e' ? board[j] : false;
            }
        }
        if ((board[4] === board[0] && board[4] === board[8]) || 
        (board[4] === board[2] && board[4] === board[6])) {
            return board[4] !== 'e' ? board[4] : false;
        }
        return ( board.every(function(element) {
            return element !== 'e';
        })) 
    },
    winner: function(board) {
        return game.over(board);
    },
    possible_moves: function(board, sign) {
        var testBoard = [], 
        nextBoard;
        for (var i = 0; i < board.length; i++) {
            nextBoard = board.slice();
            if (nextBoard[i] === 'e') {
                nextBoard[i] = sign;
                testBoard.push(nextBoard);
            }
        }
        return testBoard;
    }
}

function moveScore(board) {
    var result = game.winner(board);
    
    if (result === signPlayer) {
        return -100;
    }
    if (result === signAI) {
        return +100;
    }
    return 0;
    //Game is a draw
}

function max(board) {
    
    if (game.over(board)) {
        return board;
    }
    var newGame = [];
    var bestMove = [];
    var score;
    var best_score = -Infinity;
    var movesArray = game.possible_moves(board, signAI);
    
    for (var i = 0; i < movesArray.length; i++) {
        newGame = movesArray[i].slice();
        score = moveScore(min(newGame));
        if (score > best_score) {
            best_score = score;
            bestMove = newGame;
        }
    }
    return bestMove;
}

function min(board) {
    
    if (game.over(board)) {
        return board;
    }
    var newGame = [];
    var worstMove = [];
    var score;
    var worst_score = +Infinity;
    var movesArray = game.possible_moves(board, signPlayer);
    
    for (var i = 0; i < movesArray.length; i++) {
        newGame = movesArray[i].slice();
        score = moveScore(max(newGame));
        if (score < worst_score) {
            worst_score = score;
            worstMove = newGame;
        }
    }
    return worstMove;
}

console.log(max(board));
