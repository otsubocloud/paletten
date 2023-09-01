/**
 * pattern:
 * hsl(50 80% 40%)
 * hsl(0 80% 50% / 25%)
 * hsl(150deg 30% 60%)
 * hsl(0.3turn 60% 45% / .7)
 */
export default function hslCodeToObject(code: string): {
    h: number;
    s: number;
    l: number;
} | null;
