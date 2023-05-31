import { useEffect, useState } from "react";
import { placeTetromino, checkCollision } from "../logic/tetrominoes";
import { useBoard } from "./useBoard";
import { isObjectEmpty } from "../logic/functional";

import { TETROMINOES } from "../logic/tetrominoes";

export const useTetromino = () => {
  const [theBoard, setBoard] = useBoard();
  const [tetromino, setTetromino] = useState({});
  const [collision, setCollision] = useState(false);

  const moveTetromino = (tetromino, board, direction) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const { shape, className, position } = tetromino;
    let { x, y } = position;
    let newTetromino = {
      shape,
      className,
    };

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

    switch (direction) {
      case 'left':
        newTetromino.position = { x: x - 1, y };
        setTetromino(newTetromino);
        break;
      case 'right':
        newTetromino.position = { x: x + 1, y };
        setTetromino(newTetromino);
        break;
        case 'down':
        newTetromino.position = { x, y: y + 1 };
        setTetromino(newTetromino);
        break;
      default:
        break;
    }

   

   if (!isObjectEmpty(tetromino) ) {
      const lastBoard = placeTetromino(tetromino, newBoard);
     switch (checkCollision(tetromino, board, { x: x + 1, y: y + 1 })) {
      case true: 
      setCollision(true)
      return lastBoard
      case false: 
      return placeTetromino(tetromino, newBoard);
     }
   }
   // if (!isObjectEmpty(tetromino) && checkCollision(tetromino, board, { x, y })) {
   //    const lastBoard = placeTetromino(tetromino, newBoard);
   //    if (lastBoard !== board) {
   //       console.log('where must be save')
   //       return lastBoard
   //    }
   // } else {
   //    return placeTetromino(tetromino, newBoard)
   // }
  };

  return [tetromino, setTetromino, collision, moveTetromino];
};


