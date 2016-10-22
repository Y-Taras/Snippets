var board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'o'];
var signPlayer = 'o';
var signAI = 'x';
var game = {
    over: function(board) {

        for (var i = 0; i < board.length; i += 3) {
            if ((board[i] === board[i + 1] && board[i + 1] === board[i + 2]) &&
                (board[i] !== 'e')) {
                return [board[i], [i, i + 1, i + 2]];
            }
        }
        for (var j = 0; j < 3; j++) {
            if ((board[j] === board[j + 3] && board[j + 3] === board[j + 6]) &&
                (board[j] !== 'e')) {
                return [board[j], [j, j + 3, j + 6]];
            }
        }

        if ((board[4] === board[0] && board[4] === board[8]) &&
            (board[4] !== 'e')) {
            return [board[4], [0, 4, 8]];
        }
        if ((board[4] === board[2] && board[4] === board[6]) &&
            (board[4] !== 'e')) {
            return [board[4], [2, 4, 6]];
        }
        return board.every(function(element) {
            return element !== 'e';
        });
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
};

function moveScore(board) {
    var result = game.over(board)[0];
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

    if (game.over(board)[0]) {
        return [moveScore(board), []];
    }
    var newGame = [];
    var bestMove = [];
    var score;
    var best_score = -Infinity;
    var movesArray = game.possible_moves(board, signAI);

    for (var i = 0; i < movesArray.length; i++) {
        newGame = movesArray[i].slice();
        score = min(newGame)[0];
        if (score > best_score) {
            best_score = score;
            bestMove = newGame;
        }
    }
    return [best_score, bestMove];
}

function min(board) {

    if (game.over(board)[0]) {
        return [moveScore(board), []];
    }
    var newGame = [];
    var worstMove = [];
    var score;
    var worst_score = +Infinity;
    var movesArray = game.possible_moves(board, signPlayer);

    for (var i = 0; i < movesArray.length; i++) {
        newGame = movesArray[i].slice();
        score = max(newGame)[0];
        if (score < worst_score) {
            worst_score = score;
            worstMove = newGame;
        }
    }
    return [worst_score, worstMove];
}


max(board);
