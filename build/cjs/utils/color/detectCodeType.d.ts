export default function detectCodeType(code: string): ColorCodeType;
export type ColorCodeType = 'hsl' | 'rgb' | 'hex' | null;
