// Mimimax algorithm
//  function of AI player is to maximize score
//  function of human player is to minimize score

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move = { a: 0, b: 0 };
  let i = 0;
  let j = 0;
  let a = 0;
  let b = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        a = i;
        b = j;

        if (score > bestScore) {
          bestScore = score;
          move = { a, b };
        }
      }
    }
  }

  board[move.a][move.b] = ai;
  currentPlayer = human;
}

let scores = {
  AI: 10,
  Player: -10,
  tie: 0,
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result != null) {
    return scores[result];
  }
  // for AI player
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  }
  // for human player
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
