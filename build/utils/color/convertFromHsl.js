import formatHslCode from './formatHslCode';
import formatRgbCode from './formatRgbCode';
import hslToRgb from './hslToRgb';
import rgbToHexCode from './rgbToHexCode';
export default function convertFromHsl(hsl, to) {
    return to === 'hsl'
        ? formatHslCode(hsl)
        : to === 'rgb'
            ? formatRgbCode(hslToRgb(hsl))
            : rgbToHexCode(hslToRgb(hsl));
}
