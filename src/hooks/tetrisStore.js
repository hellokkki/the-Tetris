import { create } from "zustand";
import { TETROMINOES, pickRandomTetromino } from "../logic/tetrominoes";
import { Queue } from "../logic/queue";
import { isObjectEmpty } from "../logic/functional";

// find a way to update board when you use tetramino
// maybe store here board values and build it in the file
// and then place a tetromino - just rebuild 

export const tetrisStore = create(
    (set, get) => ({
        isNotCollidedTetrominoOnBoard: false,
        isGameGoing: false,

        goOnTheGame: () =>
          set((state) => ({ ...state, isGameGoing: true })),

        setCurrentTetromino: () => 
        set((state) => ({ ...state, isNotCollidedTetrominoOnBoard: true }))
        
  })
)



