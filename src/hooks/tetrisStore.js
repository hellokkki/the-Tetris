import { create } from "zustand";


export const tetrisStore = create(
    (set, get) => ({
        isCurrentTetromino: false,
        isGameGoing: false,

        goOnTheGame: () =>
          set((state) => ({ ...state, isGameGoing: true })),

        setCurrentTetromino: () => 
        set((state) => ({ ...state, isCurrentTetromino: true })),

        resetCurrentTetromino: () =>
        set((state) => ({...state, isCurrentTetromino: false}))
        
  })
)



