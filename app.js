//dom creation

//this part is missing



const createShip = (name="",shipLength = 1) => {
  let safeLength = shipLength;
  const isHit = () => {
    safeLength = safeLength === 0 ? safeLength : --safeLength;
  };

  //When is hit the length decrement by one and the getSafeLength give how many length is still have
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
  const getShipName=()=>{
    return name
  }
  return { isHit, isSunk, getSafeLength ,getShipLength,getShipName: getShipName};
};

//The square is the cell on the board
//it can be selected when receiving an attack 
//a ship can be associated with a square
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

//the gameboard will contain squares
//ships can be positionated on the board
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
      return false
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
        return true
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
        return true;
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
    // return { isPositionAvailable };
  }

  return { getBoard, positionateShip, updateBoard };
};


//the gamecontroller manage the game by adding boards for each player  
function GameController(){
  let board1=GameBoard(10)
  let   player1=createPlayer("minzo")


  function createPlayer(name,shipsLengthArray=[5,4,3,3,2]){
    let playerShips=[];
    //create ships according to the shipsLengthArray
    for(let i in shipsLengthArray){
      
      playerShips.push(createShip("ship"+(parseInt(i)+1),shipsLengthArray[i]))
      
    }
    let player={name,playerShips}
    
    return player
  }


  function randomPositionPlayerShips(player){
    let ships=player.playerShips;
    for(let ship of ships){
      let orientation=["horizontal","vertical"]
      let randomOrientation;
      let randomRow;
      let randomCol;
      do{
       randomOrientation=orientation[Math.floor(2*Math.random())]
       randomRow=Math.floor(board1.getBoard().length*Math.random())
       randomCol=Math.floor(board1.getBoard().length*Math.random())
      
      
    } while (board1.positionateShip(ship,randomOrientation,randomRow,randomCol)===false)
  }

  
  }

  //this is to test
  randomPositionPlayerShips(player1);
  printBoard(board1)

  //this function is to be completed that it shows all the informations needed on a board
  function printBoard(board){
    let length=board.getBoard().length
    let hasShipSquares=[]
    let numberOfTrue=0;
    const getShipsPosition=()=>{
      
      for (let i=0;i<length;i++){
        hasShipSquares[i]=[]
        for(let j=0;j<length;j++){
          if (board1.getBoard()[i][j].getHasShip()) numberOfTrue++
          console.log('numberOfTrue: ', numberOfTrue);
          hasShipSquares[i][j]=board1.getBoard()[i][j].getHasShip()
        }
      }
      
     
    }

    //this is to test to be removed after
    getShipsPosition()
  }


  function receiveAttack(board,row,column){
    let squareAttacked=board.getBoard()[row][column];
    if (squareAttacked.getIsSelected()) {
      return;}
    if (squareAttacked.getHasShip()){
      squareAttacked.getShipAssociated().isHit()
      squareAttacked.setIsSelected(true);

    } else {squareAttacked.setIsSelected(true);}
  }

 

}
GameController()