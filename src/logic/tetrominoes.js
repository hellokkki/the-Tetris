import { tetrisStore } from "../hooks/tetrisStore";
import { isObjectEmpty } from "./functional";
const className = 'tetromino';
const startPosition = { x:4, y: 0 };

export const TETROMINOES = {
    I: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        className: `${className} ${className}-i`,
        position: startPosition
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        className: `${className} ${className}-j`,
        position: startPosition
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        className: `${className} ${className}-l`,
        position: startPosition
    },
    O: {
        shape: [
           [1, 1],
           [1, 1]
        ],
        className: `${className} ${className}-o`,
        position: startPosition
    },
    S: {
       shape: [
        [0, 1, 1],
        [1, 1, 0]
       ],
       className: `${className} ${className}-s`,
       position: startPosition
     },
     Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        className: `${className} ${className}-z`,
        position: startPosition
     },
     T: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ],
        className: `${className} ${className}-t`,
        position: startPosition
     }
};

export const pickRandomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];
    return TETROMINOES[key]
};

export const checkCollision = (tetromino, board,  { x: moveX, y: moveY }) => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
            const boardX = x + moveX;
            const boardY = y + moveY;

            if (boardX < 0 || boardX >= board.size.columns || boardY >= board.size.rows) {
                return true
            };

            if (boardY > 0 && tetromino.className[boardY][boardX] === className) {
                return true
            };
        }
    }
  }

  return false
};

export const placeTetromino = (tetromino, board) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const { shape, className, position } = tetromino;
    let { x, y } = position;

  
    newBoard.rows.forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) => {
        if (cell !== 0) {
          const tetrominoRow = shape[rowIndex - y];
          if (tetrominoRow !== undefined) {
          if (tetrominoRow && tetrominoRow[columnIndex - x] === 1) {
            cell.occupied = true;
            cell.className = className;
          }
        }
      }
      })
    );
    
    return newBoard;
 };

//  export const moveTetromino = (tetromino, board, move) => {
//     const newBoard = JSON.parse(JSON.stringify(board));
//     const { shape, className } = tetromino;
//     let tetrominoPosition = { x: null, y: null };
//     let newX, newY;

//     newBoard.rows.forEach((row, rowIndex) => 
//     row.forEach((cell, columnIndex) => {
//     if (rowIndex !== null && columnIndex !== null) {
//         if (cell.occupied === true && cell.className === className) {
//             return tetrominoPosition = { x: columnIndex, y: rowIndex };
//         }
//     }
//       console.log(tetrominoPosition)
//     })
//     );
 
//     if (tetrominoPosition.x !== null && tetrominoPosition.y !== null) {
//         newX = tetrominoPosition.x;
//         newY = tetrominoPosition.y;
//     } else {
//         return newBoard
//     }

//     switch(move.direction) {
//         case "left": 
//         newX -= move.x;
//         break;
//         case "right":
//         newX += move.x;
//         break;
//         case "down":
//         newY += move.y;
//         break;
//         default:
//             break;
//     }

//     const tetrominoNewPosition = {
//         x: newX,
//         y: newY
//     }
  
//     newBoard.rows.forEach((row, rowIndex) => {
//         row.forEach((cell, columnIndex) => {
//           if (cell !== 0) {
//             const tetrominoRow = shape[rowIndex - ];
//             if (tetrominoRow && tetrominoRow[columnIndex - newX] === 1) {
//               cell.occupied = true;
//               cell.className = className;
//             } else if (cell.occupied && cell.className === className) {
//               cell.occupied = false;
//               cell.className = "";
//             }
//           }
//         });
//       });

//     console.log(newBoard)
//     return newBoard;
//  };

export function moveTetromino(tetromino, board, moveDirection) {
    const newBoard = JSON.parse(JSON.stringify(board));
    const { shape, className, position } = tetromino;
    let { x, y } = position;
    let newTetromino = {
      shape,
      className,
    }


    newBoard.rows.forEach((row, rowIndex) => 
    row.forEach((cell, columnIndex) => {
    if (rowIndex !== null && columnIndex !== null) {
        if (cell.occupied === true && cell.className === className) {
          cell.occupied = false;
          cell.className = "";
        }
    }
    })
    );
 
    switch (moveDirection) {
      case 'left':
        newTetromino.position = { x: x - 1, y };
        break
      case 'right':
        newTetromino.position = { x: x + 1, y };
        case 'down':
        newTetromino.position = { x, y: y + 1 }
      default:
        break;
    }

    return placeTetromino(newTetromino, newBoard)
}






  

 export const moves = {
    moveDown: {
        direction: "down",
        x: 0,
        y: 1
     },
     moveLeft: {
        direction: "left",
        x: 1,
        y: 0
     },
     moveRight: {
        direction: "right",
        x: 1,
        y: 0
     }
    
 }



//  newBoard.rows.forEach((row, rowIndex) => {
//     row.forEach((cell, columnIndex) => {
//       if (cell !== 0) {
//         const tetrominoRow = shape[rowIndex - newY];
//         console.log(tetrominoRow)
//         if (tetrominoRow && tetrominoRow[columnIndex - newX] === 1) {
//           cell.occupied = true;
//           cell.className = className;
//         } else if (cell.occupied && cell.className === className) {
//           cell.occupied = false;
//           cell.className = "";
//         }
//       }
//     });
//   });