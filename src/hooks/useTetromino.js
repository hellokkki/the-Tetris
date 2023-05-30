import { useEffect, useState } from "react";
import { placeTetrominoToboard } from "../logic/tetrominoes";
import { useBoard } from "./useBoard";
import { isObjectEmpty } from "../logic/functional";

export const useTetromino = () => {
   const [tetromino, setTetromino] = useState({});
   




   return [ tetromino, setTetromino ]
  }


  