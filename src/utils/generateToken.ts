export const generate6DigitCode = (): string => {
    const n = Math.floor(Math.random() * 1000000);
    return n.toString().padStart(6, '0');
};
