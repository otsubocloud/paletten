import formatHslCode from './formatHslCode.js';
import formatRgbCode from './formatRgbCode.js';
import hslToRgb from './hslToRgb.js';
import rgbToHexCode from './rgbToHexCode.js';
export default function convertFromHsl(hsl, to) {
    return to === 'hsl'
        ? formatHslCode(hsl)
        : to === 'rgb'
            ? formatRgbCode(hslToRgb(hsl))
            : rgbToHexCode(hslToRgb(hsl));
}
