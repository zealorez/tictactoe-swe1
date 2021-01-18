// DOM Elements
const banner = document.createElement('div');
banner.classList.add('banner');
document.body.appendChild(banner);

// Globals
let canClick = true;

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// const checkWin = () => {
//   // horizontal
//   for (let i = 0; i < board.length; i += 1) {
//     if (board[0][i] === board[])
//   }
// }

const checkWin = (symbol) => {
  if ((board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol)
    || (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol)
    || (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol)
    || (board[0][0] === symbol && board[1][1] === symbol && board[2][0] === symbol)
    || (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol)
    || (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol)
    || (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol)
    || (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)) {
    banner.innerText = 'Game Over!';
    canClick = false;
  }
};

const squareClick = (row, column) => {
  if (canClick === true) {
    console.log('coordinates', row, column);

    // see if the clicked square has been clicked on before
    if (board[row][column] === '') {
    // alter the data array, set it to the current player
      board[row][column] = currentPlayer;

      // refresh the creen with a new board
      // according to the array that was just changed
      buildBoard(board);
      checkWin(currentPlayer);
      // change the player
      togglePlayer();
    }
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
