var board = [null , null , 'o', null , null , null , null , null , null ];
for (var i = 0; i < board.length; i++) {
    if (board[i] !== null ) {
        var signPlayer = board[i];
        break;
    }
}

var signAI = (signPlayer === "x") ? "o" : "x";

function generateTable(board, signScore) {
    var testBoard = [], 
    nextBoard;
    for (var i = 0; i < board.length; i++) {
        nextBoard = board.slice();
        if (!nextBoard[i]) {
            nextBoard[i] = signScore;
            testBoard.push(nextBoard);
        }
    }
    return testBoard;
}

function isEnd(board) {
    for (var i = 0; i < board.length; i += 3) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
            return board[i] !== null  ? board[i] : false;
        }
    }
    for (var j = 0; j < board.length; j++) {
        if (board[j] === board[j + 3] && board[j + 3] === board[j + 6]) {
            return board[j] !== null  ? board[j] : false;
        }
    }
    
    if ((board[4] === board[0] && board[4] === board[8]) || 
    (board[4] === board[2] && board[4] === board[6])) {
        return board[4] !== null  ? board[4] : false;
    }
}

var layer = false;

function miniMax2(board) {
    if (isEnd(board) === signPlayer) {
        return -1000;
    } else if (isEnd(board) === signAI) {
        return +1000;
    } else if (board.every(function(element) {
        return element !== null 
    })) {
        return 0;
    }
    
    var max = 0;
    var min = 0;
    layer = !layer;
    var children = (layer) ? generateTable(board, signAI) : generateTable(board, signPlayer);
    if (layer) {
        max = miniMax2(children[0]);
        for (var i = 0; i < children.length; i++) {
            if (miniMax2(children[i]) > max) {
                max = miniMax2(children[i]);
            }
        }
    } else if (layer === false) {
        min = miniMax2(children[0]);
        for (var i = 0; i < children.length; i++) {
            if (miniMax2(children[i]) < min) {
                min = miniMax2(children[i]);
            }
        }
    }
}
miniMax2(board);
