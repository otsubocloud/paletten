declare const rgbToHsl: (rgb: {
    r: number;
    g: number;
    b: number;
}) => {
    h: number;
    l: number;
    s: number;
};
export default rgbToHsl;
