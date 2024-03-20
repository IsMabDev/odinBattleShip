//test ships position isPositionAvailable()
const myBoard = GameBoard(3);
let boardSquares = myBoard.getBoard();
boardSquares[2][2].setHasShip(true);
let mySquare = boardSquares[2][2];
myBoard.updateBoard(mySquare, 2, 2);
z = myBoard.getBoard()[2][2].getHasShip();
z;
//test limits
let available = myBoard
  .positionateShip(2, "horizontal", 0, 2)
  .isPositionAvailable();

available;

//test positionate ship function positionateShip()
const myBoard = GameBoard(3);
let boardSquares = myBoard.getBoard();
myBoard.positionateShip(2, "horizontal", 0, 0);
let z = boardSquares[0][1].getHasShip();
z;
