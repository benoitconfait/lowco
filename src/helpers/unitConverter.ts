export const  KBToGB = (kb: number): number => {
    if (kb) {
        return parseFloat((kb / (1024 * 1024)).toFixed(2));
    }
    return 0;
};  

export const  BToGB = (b: number): number => {
    if (b) {
        const result = parseFloat((b / (1024 * 1024 * 1024)).toFixed(2));
        return result;
    }
    return 0;
};