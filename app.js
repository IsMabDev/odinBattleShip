const createShip = (shipLength = 1) => {
  let safeLength = shipLength;
  const isHit = () => {
    safeLength = safeLength === 0 ? safeLength : --safeLength;
  };
  const getSafeLength = () => {
    return safeLength;
  };
  const isSunk = () => {
    if (safeLength === 0) {
      return true;
    } else {
      return false;
    }
  };
  return { isHit, isSunk, getSafeLength };
};

const createSquare = () => {
  let hasShip = false;
  let isSeleted = false;
  function getHasShip() {
    return hasShip;
  }
  function setHasShip(in_hasShip) {
    hasShip = in_hasShip;
  }
  function getIsSelected() {
    return isSeleted;
  }
  function setIsSelected(in_isSelected) {
    isSeleted = in_isSelected;
  }

  return { getHasShip, setHasShip, getIsSelected, setIsSelected };
};

const GameBoard = (gridLength = 10) => {
  const board = [];

  //initialize the board by empty squares
  for (let i = 0; i < gridLength; i++) {
    board[i] = [];
    for (let j = 0; j < gridLength; j++) {
      board[i][j] = createSquare();
    }
  }
  function updateBoard(square, row, col) {
    board[row][col] = square;
  }
  function getBoard() {
    return board;
  }

  //positionating a ship
  function positionateShip(
    length,
    orientation = "horizontal",
    rowOfFirstSquareCoordinate,
    colOfFirstSquareCoordinate
  ) {
    if (isPositionAvailable() === false) {
      managePositionRefused();
    } else if (isPositionAvailable() === true) {
      if (orientation === "horizontal") {
        for (let i = 0; i < length; i++) {
          board[rowOfFirstSquareCoordinate][
            colOfFirstSquareCoordinate + i
          ].setHasShip(true);
        }
      }
      if (orientation === "vertical") {
        for (let i = 0; i < length; i++) {
          board[rowOfFirstSquareCoordinate + i][
            colOfFirstSquareCoordinate
          ].setHasShip(true);
        }
      }
    } else throw "there is a problem at the isPositionAvailable function";

    //check if the ship can be positionated
    function isPositionAvailable() {
      if (
        rowOfFirstSquareCoordinate < 0 ||
        colOfFirstSquareCoordinate < 0 ||
        rowOfFirstSquareCoordinate > gridLength - 1 ||
        colOfFirstSquareCoordinate > gridLength - 1
      ) {
        return false;
      }
      if (orientation === "horizontal") {
        if (colOfFirstSquareCoordinate + length - 1 > gridLength - 1) {
          return false;
        }
        for (let i = 0; i < length; i++) {
          i;
          if (
            board[rowOfFirstSquareCoordinate][
              colOfFirstSquareCoordinate + i
            ].getHasShip() === true
          ) {
            return false;
          }
        }
      }
      if (orientation === "vertical") {
        if (rowOfFirstSquareCoordinate + length - 1 > gridLength - 1) {
          return false;
        }
        for (let i = 0; i < length; i++) {
          if (
            board[rowOfFirstSquareCoordinate + i][
              colOfFirstSquareCoordinate
            ].getHasShip() === true
          ) {
            return false;
          }
        }
      }

      return true;
    }
    function managePositionRefused() {
      console.log("Cannot position the ship choose another position");
    }
    return { isPositionAvailable };
  }

  return { getBoard, positionateShip, updateBoard };
};
