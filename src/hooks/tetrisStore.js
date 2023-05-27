import { create } from "zustand";
import { TETROMINOES, pickRandomTetromino } from "../logic/tetrominoes";
import { buildBoard } from "../logic/board";
import { isObjectEmpty } from "../logic/functional";

// find a way to update board when you use tetramino
// maybe store here board values and build it in the file
// and then place a tetromino - just rebuild 

export const tetrisStore = create(
    (set, get) => ({
        tetrominoes: TETROMINOES,
        board: buildBoard({ rows: 15, columns: 10 }),
        nextTetromino: pickRandomTetromino(),
        currentTetrominoOnBoard: {},
        isGameGoing: false,

        goOnTheGame: () => set(
            (state) => ({ ...state, isGameGoing: true })
        ),

        placeTetromino: (tetromino, x, y) => {
          const { shape, className } = tetromino;
          const { board } = get()
          set((state) => {
            const newRows = board.rows.map((row, rowIndex) => 
              row.map((cell, columnIndex) => {
                const tetrominoRow = shape[rowIndex - y]
                if (tetrominoRow && tetrominoRow[columnIndex - x] === 1) {
                  return { ...cell, occupied: true, className: className }
                }
                return cell;
              })
            )
            return {
              ...state,
              board: {
                ...state.board,
                rows: newRows,
              },
            };
          });
        },

        slayTetrominoDown: (y) => {
          const { isGameGoing } = get();
          if (isGameGoing) {
            set((state) => {
              const currentTetromino = get().currentTetrominoOnBoard;
              console.log(currentTetromino)
              if (isObjectEmpty(currentTetromino)) return;
              const newTetromino = {
                ...currentTetromino,
                y: currentTetromino.y - y,
              };
              console.log(newTetromino)
           });
          }
        },
  })
)



