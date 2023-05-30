export const BoardCell = ({ cell }) => (
    <div className={`tetris-board-cell ${cell?.className || ""}`}></div>
  );