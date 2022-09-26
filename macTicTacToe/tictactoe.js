let gameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "X",
  isPlaying: true,
};
let board = document.querySelector(".board");
let winner = document.querySelector("#Winner");
let resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function (e) {
  gameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: "X",
    isPlaying: true,
  };
  renderBoard();
  winner.innerText = "";
});

board.addEventListener("click", function (e) {
  let rowidx = +e.target.id[0];
  let colidx = +e.target.id[2];
  if (gameState.board[rowidx][colidx] === null && gameState.isPlaying) {
    gameState.board[rowidx][colidx] = gameState.currentPlayer;
  }
  let newVar = playerWin();
  if (newVar) {
    winner.innerText = newVar;
    gameState.isPlaying = false;
  } else if (draw() === true) {
    winner.innerText = "Draw";
    gameState.isPlaying = false;
  } else {
    switchPlayers();
  }
  renderBoard();
});

function renderBoard(board, rowidx, colidx) {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board.length; j++) {
      let currDiv = document.getElementById(`${i},${j}`);
      currDiv.innerText = gameState.board[i][j];
    }
  }
}

function switchPlayers() {
  if (gameState.currentPlayer === "X") {
    gameState.currentPlayer = "O";
  } else {
    gameState.currentPlayer = "X";
  }
}

function playerWin() {
  let rowStr = "";
  for (let i = 0; i < gameState.board.length; i++) {
    let row = gameState.board[i];
    for (let j = 0; j < gameState.board.length; j++) {
      let element = gameState.board[i][j];
      rowStr += element;
    }
    if (rowStr === "XXX") {
      return "X wins";
    }
    if (rowStr === "OOO") {
      return "O wins";
    }
    rowStr = "";
  }

  let colStr = "";
  for (let i = 0; i < gameState.board.length; i++) {
    let column = gameState.board[i];
    for (let j = 0; j < gameState.board.length; j++) {
      let newElm = gameState.board[j][i];
      colStr = colStr + newElm;
    }
    if (colStr === "XXX") {
      return "X wins";
    }
    if (colStr === "OOO") {
      return "O wins";
    }
    colStr = "";
  }

  let diagDownStr = "";
  for (let i = 0; i < gameState.board.length; i++) {
    let diagnal = gameState.board[i];
    let diagElm = gameState.board[i][i];
    diagDownStr += diagElm;
    if (diagDownStr === "XXX") {
      return "X wins";
    }
    if (diagDownStr === "OOO") {
      return "O wins";
    }
  }

  let diagUpStr = "";
  for (let i = gameState.board.length - 1; i >= 0; i--) {
    let diagnal = gameState.board[i];
    let diagElm = gameState.board[i][gameState.board.length - 1 - i];
    diagUpStr += diagElm;
    if (diagUpStr === "XXX") {
      return "X wins";
    }
    if (diagUpStr === "OOO") {
      return "O wins";
    }
  }

  return false;
}

function draw() {
  let drawStr = "";
  for (let i = 0; i < gameState.board.length; i++) {
    let row = gameState.board[i];
    for (let j = 0; j < gameState.board.length; j++) {
      let element = gameState.board[i][j];
      if (element === null) {
        return false;
      }
    }
  }
  return true;
}
