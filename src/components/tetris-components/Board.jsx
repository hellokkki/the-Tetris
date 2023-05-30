import React, { useEffect } from "react";
import { tetrisStore } from "../../hooks/tetrisStore";
import { isObjectEmpty } from "../../logic/functional";
import { BoardCell } from "./BoardCell";
import { useBoard } from "../../hooks/useBoard";
import { useTetromino } from "../../hooks/useTetromino";
import { checkCollision, placeTetromino, moveTetromino, moves } from "../../logic/tetrominoes";
import { useInterval } from "../../hooks/useInterval";

function Board({ isGameGoing, tetromino }) {
  const { goOnTheGame, setCurrentTetromino } = tetrisStore();
  const isTetrominoOnBoard = tetrisStore((state) => state.isNotCollidedTetrominoOnBoard);
  const [board, setBoard] = useBoard(15, 10);
  const position = { x: 4, y: 0 }
  const [curTetromino, setTetromino] = useTetromino();
  // console.log(tetromino)

  useEffect(() => {
    //  console.log('tetromino:', tetromino)
     if (isGameGoing && !isTetrominoOnBoard && !isObjectEmpty(tetromino)) {
      const collision = checkCollision(tetromino, board, {x: position.x, y: position.y + 1});
      if (!collision) {
        setCurrentTetromino()
        const newBoard = placeTetromino( tetromino, board, position );
        setBoard(newBoard)
      }
     }
  }, [isGameGoing, tetromino])

  useInterval(() => {
    if (isTetrominoOnBoard && !isObjectEmpty(tetromino)) {
      const collision = checkCollision(tetromino, board, {x: position.x, y: position.y + 1});
      if (!collision) {
        const newBoard = moveTetromino(tetromino, board, moves.moveDown);
        setBoard(newBoard)
      }
    }
  }, 1000);
  
  const handleClick = () => goOnTheGame();

  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
  };

  return (
    <>
      <div className="tetris-board" style={boardStyles}>
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>

      <div className="tetris-board-btn">
        {isGameGoing ? (
          <p>it's happening</p>
        ) : (
          <button className="btn btn-start-tetris" onClick={handleClick}>
            play me
          </button>
        )}
      </div>
    </>
  );
}

export default Board;
