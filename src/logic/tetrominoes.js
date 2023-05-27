
const className = 'tetromino';

export const TETROMINOES = {
    I: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        className: `${className} ${className}-i`
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        className: `${className} ${className}-j`
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        className: `${className} ${className}-l`
    },
    O: {
        shape: [
           [1, 1],
           [1, 1]
        ],
        className: `${className} ${className}-o`
    },
    S: {
       shape: [
        [0, 1, 1],
        [1, 1, 0]
       ],
       className: `${className} ${className}-s`
     },
     Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        className: `${className} ${className}-z`
     },
     T: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ],
        className: `${className} ${className}-t`
     }
};

export const pickRandomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];
    return TETROMINOES[key]
}