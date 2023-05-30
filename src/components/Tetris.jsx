import React, { useEffect, useState } from "react";
import Board from "./tetris-components/Board";
import "./tetris.scss";
import { tetrisStore } from "../hooks/tetrisStore";
import { Queue } from "../logic/queue";
import { pickRandomTetromino } from "../logic/tetrominoes";
import { useQueue } from "../hooks/useQueue";
import { useTetromino } from "../hooks/useTetromino";
import { isObjectEmpty } from "../logic/functional";

function Tetris() {
  const  isGameGoing  = tetrisStore((state) => state.isGameGoing);
  const [tetromino, setTetromino] = useTetromino();
  const [queue, setQueue] = useQueue(1000);

  useEffect(() => {
     if ( isGameGoing === true ) {
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
      && isObjectEmpty(tetromino) ) {
      const tetromino = queue.dequeue();
      setTetromino(tetromino);
    }
  }, [queue])


  return (
    <div className="tetris">
      <div className="tetris-section_left">
        <Board
          isGameGoing={isGameGoing}
          tetromino={tetromino}
        />
      </div>
      <div className="tetris-section-right"></div>
    </div>
  );
}

export default Tetris;
