import React, { useEffect } from 'react'
import { tetrisStore } from '../../hooks/tetrisStore';
import { isObjectEmpty } from '../../logic/functional';


export const BoardCell = ({ cell }) => 
<div className={`tetris-board-cell ${cell?.className || ''}`}></div>

function Board({ board, isGameGoing, currentTetromino }) {
  const { goOnTheGame, slayTetrominoDown,  currentTetrominoOnBoard } = tetrisStore();
  useEffect(() => {
     if (!isObjectEmpty(currentTetromino)) {
      console.log(currentTetromino)
      console.log(currentTetrominoOnBoard)
      slayTetrominoDown(1)
     }
  }, [currentTetromino, currentTetrominoOnBoard])
  
  const handleClick = () => goOnTheGame(); 

    const boardStyles = {
      gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
      gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };
  
  return (
   <>
       <div className='tetris-board' style={boardStyles}>
        {board.rows.map(( row, y ) => row.map((cell, x) => (
       <BoardCell key={x * board.size.columns + x} cell={cell} />
      ))
      )}
      
      </div>
      
      <div className='tetris-board-btn'>
      {isGameGoing ?
       (<p>it's happening</p>) :
       <button 
       className="btn btn-start-tetris"
       onClick={handleClick}
       >
        play me
       </button>
        }
      </div>
    </>
  )
}

export default Board
