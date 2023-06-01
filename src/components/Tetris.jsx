import React, { useCallback, useEffect, useState } from "react";
import Board from "./tetris-components/Board";
import "./tetris.scss";
import { tetrisStore } from "../hooks/tetrisStore";
import { Queue } from "../logic/queue";
import { pickRandomTetromino } from "../logic/tetrominoes";
import { useQueue } from "../hooks/useQueue";
import { useTetromino } from "../hooks/useTetromino";
import { isObjectEmpty } from "../logic/functional";
import { useBoard } from "../hooks/useBoard";
import { checkCollision, placeTetromino, moves } from "../logic/tetrominoes";
import { useInterval } from "../hooks/useInterval";

function Tetris() {
  const  isGameGoing  = tetrisStore((state) => state.isGameGoing);
  const isCurrentTetromino = tetrisStore((state) => state.isCurrentTetromino)
  const { setCurrentTetromino, resetCurrentTetromino } = tetrisStore();
  const [board, setBoard] = useBoard(15, 10)
  const [tetromino, setTetromino, collision, moveTetromino] = useTetromino();
  const [stop, setStop] = useState(false)

  useEffect(() => {
    if ( isGameGoing 
      && isObjectEmpty(tetromino)) {
      const tetromino = pickRandomTetromino();
      setTetromino(tetromino);
    }
  }, [isGameGoing, isObjectEmpty, tetromino, setTetromino])

  useEffect(() => {
    if (!isCurrentTetromino && !isObjectEmpty(tetromino)) {
    setCurrentTetromino()
    const collision = checkCollision(tetromino, board, {x: tetromino.position.x, y: tetromino.position.y + 1});
    if (!collision) {
       const newBoard = placeTetromino( tetromino, board );
       setBoard(newBoard)
    }
  }
 }, [isCurrentTetromino, isObjectEmpty, tetromino, placeTetromino, setBoard]);

 const moveDown = useCallback(() => {
   if (isCurrentTetromino) {
     if (collision) {
       setStop(true);
       resetCurrentTetromino();
       setTetromino({})
     } else {
      const newBoard = moveTetromino(tetromino, board, "down");
      setBoard(newBoard)
     }
   }
 }, [isCurrentTetromino, collision, setStop, resetCurrentTetromino, setTetromino, moveTetromino, setBoard])

//  const stopInterval = useInterval(() => {
//   if (stop) {
//     stopInterval();
//   } else {
//     moveDown()
//   }
//  }, 1000)

  const stopInterval = useInterval(moveDown, 1000);

  useEffect(() => {
    if (stop) {
      console.log(tetromino)
      stopInterval()
    }
  }, [stop, stopInterval]);

  return (
    <div className="tetris">
      <div className="tetris-section_left">
        <Board
          isGameGoing={isGameGoing}
          board={board}
        />
      </div>
      <div className="tetris-section-right"></div>
    </div>
  );
}

export default Tetris;
