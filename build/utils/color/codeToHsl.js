import detectCodeType from './detectCodeType';
import hexCodeToRgb from './hexCodeToRgb';
import rgbToHsl from './rgbToHsl';
import hslCodeToObject from './hslCodeToObject';
import rgbCodeToObject from './rgbCodeToObject';
export const codeToHsl = (code) => {
    switch (detectCodeType(code)) {
        case 'hsl':
            return hslCodeToObject(code);
        case 'rgb':
            return (() => {
                const rgb = rgbCodeToObject(code);
                if (rgb)
                    return rgbToHsl(rgb);
            })();
        case 'hex':
            return (() => {
                const rgb = hexCodeToRgb(code);
                if (rgb)
                    return rgbToHsl(rgb);
            })();
        default:
            return;
    }
};
