

export const isObjectEmpty = object => {
    if (typeof object === 'object') {
        return Object.keys(object).length === 0;
    }
}