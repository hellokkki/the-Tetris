import React, { useEffect, useState } from "react";
import { tetrisStore } from "../../hooks/tetrisStore";
import { isObjectEmpty } from "../../logic/functional";
import { BoardCell } from "./BoardCell";


function Board({ isGameGoing, board }) {
  const { goOnTheGame } = tetrisStore();
  
  
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
