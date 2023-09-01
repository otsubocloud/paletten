/**
 * pattern:
 * rgb(31 120 50)
 * rgb(30% 20% 50%)
 * rgb(255 122 127 / 80%)
 * rgb(255 122 127 / .2)
 */
export default function rgbCodeToObject(code: string): {
    r: number;
    g: number;
    b: number;
} | null;
