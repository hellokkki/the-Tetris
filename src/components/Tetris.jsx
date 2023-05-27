import React, { useEffect, useState } from 'react'
import Board from './tetris-components/Board'
import './tetris.scss'
import { tetrisStore } from '../hooks/tetrisStore'


function Tetris() {

  const { isGameGoing, nextTetromino, board, placeTetromino } = tetrisStore();
  const [currentTetromino, setCurrentTetramino] = useState();

 useEffect(() => {
    if (isGameGoing)  setCurrentTetramino(nextTetromino || {})
 }, [isGameGoing, nextTetromino]);

 useEffect(() => {
   const startPos = { x: 4, y: 0 };
   console.log(currentTetromino)
   if (currentTetromino) placeTetromino(currentTetromino, startPos.x, startPos.y)
 }, [currentTetromino, placeTetromino])
  

  return (
    <div className='tetris'>
      <div className="tetris-section_left">
      <Board 
      board={board} 
      isGameGoing={isGameGoing}
      currentTetromino={currentTetromino || {}}/>
      </div>
      <div className="tetris-section-right">

      </div>
    </div>
  )
}

export default Tetris
