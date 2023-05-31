import React, { useEffect, useState } from "react";
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
  const [queue, setQueue] = useQueue(1000);
  const [stop, setStop] = useState(false)

  useEffect(() => {
     if ( isGameGoing === true  ) {
      const trashQueue = new Queue(queue.size)
      while (trashQueue.length < trashQueue.size) {
        const randomTetromino = pickRandomTetromino()
        trashQueue.enqueue(randomTetromino);
      }
      setQueue(trashQueue)
     }
  }, [isGameGoing])


  useEffect(() => {
    if ( isGameGoing 
      && !queue.isEmpty()
      && isObjectEmpty(tetromino)
      && !isCurrentTetromino ) {
        console.log(isCurrentTetromino)
      const tetromino = queue.dequeue();
      setTetromino(tetromino);
    }
  }, [queue, isCurrentTetromino])

  useEffect(() => {
    if (isGameGoing && !isCurrentTetromino && !isObjectEmpty(tetromino)) {
    const collision = checkCollision(tetromino, board, {x: tetromino.position.x, y: tetromino.position.y + 1});
    if (!collision) {
       setCurrentTetromino();
       const newBoard = placeTetromino( tetromino, board );
       setBoard(newBoard)
     }
    }
 }, [isGameGoing, tetromino])


const stopInterval = useInterval(() => {
  if (isCurrentTetromino) {
    console.log(isCurrentTetromino)
    // const collision = checkCollision(tetromino, board, {x: tetromino.position.x, y: tetromino.position.y + 1});
    if (collision) {
      stopInterval()
      resetCurrentTetromino()
      setTetromino({})
    } else {
     const newBoard = moveTetromino(tetromino, board, "down");
     setBoard(newBoard)
    } 
  }
}, 1000)

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
