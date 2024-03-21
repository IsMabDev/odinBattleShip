const createShip = (name="",shipLength = 1) => {
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
  const getShipLength=()=>{
    return shipLength;
  }
  const getShiptName=()=>{
    return name
  }
  return { isHit, isSunk, getSafeLength ,getShipLength,getShiptName};
};

const createSquare = () => {
  let hasShip = false;
  let isSeleted = false;
  let shipAssociated ;
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
  function getShipAssociated() {
    return shipAssociated;
  }
  function setShipAssociated(in_shipAssociated) {
    shipAssociated = in_shipAssociated
  }

  return { getHasShip, setHasShip, getIsSelected, setIsSelected ,getShipAssociated,setShipAssociated};
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
    shipToPositionate,
    orientation = "horizontal",
    rowOfFirstSquareCoordinate,
    colOfFirstSquareCoordinate
  ) {
    if (isPositionAvailable() === false) {
      managePositionRefused();
    } else if (isPositionAvailable() === true) {
      if (orientation === "horizontal") {
        for (let i = 0; i < shipToPositionate.getShipLength(); i++) {
          board[rowOfFirstSquareCoordinate][
            colOfFirstSquareCoordinate + i
          ].setHasShip(true);
          board[rowOfFirstSquareCoordinate][
            colOfFirstSquareCoordinate + i
          ].setShipAssociated(shipToPositionate)
        }
      }
      if (orientation === "vertical") {
        for (let i = 0; i < shipToPositionate.getShipLength(); i++) {
          board[rowOfFirstSquareCoordinate + i][
            colOfFirstSquareCoordinate
          ].setHasShip(true);
          board[rowOfFirstSquareCoordinate + i][
            colOfFirstSquareCoordinate
          ].setShipAssociated(shipToPositionate)
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
        if (colOfFirstSquareCoordinate + shipToPositionate.getShipLength() - 1 > gridLength - 1) {
          return false;
        }
        for (let i = 0; i < shipToPositionate.getShipLength(); i++) {
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
        if (rowOfFirstSquareCoordinate + shipToPositionate.getShipLength() - 1 > gridLength - 1) {
          return false;
        }
        for (let i = 0; i < shipToPositionate.getShipLength(); i++) {
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

function GameController(){
  const board1=GameBoard(3);
  const carrier=createShip("carrier",2);
  board1.positionateShip(carrier,"horizontal",1,1)
  


}
GameController()