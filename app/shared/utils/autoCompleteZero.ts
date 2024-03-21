export const autoCompleteZero = (num: number | string): string => {
    const numStr = num.toString();
    const length = numStr.length;
    if (length === 1) {
        return `0${numStr}`;
    } else {
        return numStr;
    }
};
