export default function convertFromHsl(hsl: {
    h: number;
    s: number;
    l: number;
}, to: 'hsl' | 'rgb' | 'hex'): string;
