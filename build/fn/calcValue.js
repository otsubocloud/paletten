import { CALC_UNIT } from '../const.js';
import hueConvert from '../utils/color/hueConvert.js';
import convertFromHsl from '../utils/color/convertFromHsl.js';
export default function calcValue(amount, calcData, to) {
    for (let row of calcData) {
        const { overKey, underKey, lUnit, sUnit, hUnit, baseHsl, } = row;
        if (overKey <= amount && amount < underKey) {
            const diff = (amount - overKey) / CALC_UNIT;
            const h = baseHsl.h + hUnit * diff;
            const s = baseHsl.s + sUnit * diff;
            const l = baseHsl.l + lUnit * diff;
            const hsl = {
                h: hueConvert(h),
                s: s < 0 ? 0 : s > 100 ? 100 : s,
                l: l < 0 ? 0 : l > 100 ? 100 : l,
            };
            return convertFromHsl(hsl, to);
        }
    }
}
