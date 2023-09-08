import isUndefined from '../utils/isUndefined';
import { CALC_UNIT, LIGHTNESS_MAX, LIGHTNESS_MIN, LIGHTNESS_MIN_GRAYISH, } from '../const';
import consoleWarn from './consoleWarn';
import sort from '../utils/sort';
const calcHue = (a, b) => {
    return a < 90 && b > 270
        ? a - (b - 360)
        : a > 270 && b < 90
            ? -(b - (a - 360))
            : a - b;
};
export default function generateCalcData(data) {
    const [lMin, lMax] = (() => {
        const [isGray, lArr] = (() => {
            const sArr = [];
            const lArr = [];
            Object.keys(data).forEach(key => {
                const hsl = data[key];
                sArr.push(hsl.s);
                lArr.push(hsl.l);
            });
            const sAverage = (() => {
                let total = 0;
                sArr.forEach(value => {
                    total += value;
                });
                return total / sArr.length;
            })();
            return [sAverage < 20, sort(lArr)];
        })();
        const min = (() => {
            if (!isUndefined(data[1000]))
                return data[1000].l;
            let min = isGray
                ? LIGHTNESS_MIN_GRAYISH
                : LIGHTNESS_MIN;
            const lArrMin = lArr[0];
            return lArrMin !== undefined && lArrMin < min
                ? 0
                : min;
        })();
        const max = (() => {
            if (!isUndefined(data[0]))
                return data[0].l;
            let max = LIGHTNESS_MAX;
            const lArrMax = lArr.pop();
            max =
                lArrMax !== undefined && lArrMax > max
                    ? lArrMax
                    : max;
            return max > 100 ? 100 : max;
        })();
        return [min, max];
    })();
    const keys = (() => {
        const arr = [];
        for (let key of Object.keys(data)) {
            const amount = convertKey(key);
            if (amount !== null) {
                arr.push(amount);
            }
        }
        return sort(arr);
    })();
    if (!keys.length) {
        consoleWarn(`parameter 1 object is invalid.`);
        return [];
    }
    const arr = [];
    if (keys.length === 1) {
        const amount = keys[0];
        const hsl = data[amount];
        return amount === 0 || amount === 1000
            ? (() => {
                const c = 1000 / CALC_UNIT;
                return [
                    {
                        overKey: 0,
                        underKey: 1000,
                        count: c,
                        hUnit: 0,
                        sUnit: 0,
                        lUnit: amount === 0
                            ? (lMin - hsl.l) / c
                            : (hsl.l - lMax) / c,
                        baseHsl: amount === 0
                            ? hsl
                            : { h: hsl.h, s: hsl.s, l: lMax },
                    },
                ];
            })()
            : (() => {
                const c1 = amount / CALC_UNIT;
                const c2 = (1000 - amount) / CALC_UNIT;
                return [
                    {
                        overKey: 0,
                        underKey: amount,
                        count: c1,
                        hUnit: 0,
                        sUnit: 0,
                        lUnit: (hsl.l - lMax) / c1,
                        baseHsl: { h: hsl.h, s: hsl.s, l: lMax },
                    },
                    {
                        overKey: amount,
                        underKey: 1000,
                        count: c2,
                        hUnit: 0,
                        sUnit: 0,
                        lUnit: (lMin - hsl.l) / c2,
                        baseHsl: hsl,
                    },
                ];
            })();
    }
    /** if keys.length >= 2 */
    keys.forEach((amount, i) => {
        const hsl = data[amount];
        const nextAmount = keys[i + 1];
        const nextHsl = data[nextAmount];
        if (nextHsl && nextAmount) {
            const c = (nextAmount - amount) / CALC_UNIT;
            arr.push({
                overKey: amount,
                underKey: nextAmount,
                count: c,
                hUnit: calcHue(nextHsl.h, hsl.h) / c,
                sUnit: (nextHsl.s - hsl.s) / c,
                lUnit: (nextHsl.l - hsl.l) / c,
                baseHsl: hsl,
            });
        }
        else if (amount < 1000) {
            const beforeCalc = arr[arr.length - 1];
            const c = (1000 - amount) / CALC_UNIT;
            // if last
            if (beforeCalc) {
                arr.push({
                    overKey: amount,
                    underKey: 1000,
                    count: c,
                    hUnit: beforeCalc.hUnit,
                    sUnit: beforeCalc.sUnit,
                    lUnit: lMin < hsl.l
                        ? (lMin - hsl.l) / c
                        : (-hsl.l * 0.5) / c,
                    baseHsl: hsl,
                });
            }
        }
    });
    // assign first
    if (!(0 in keys)) {
        const zeroHsl = data[0];
        const nextCalc = arr[0];
        if (nextCalc) {
            const c = nextCalc.overKey / CALC_UNIT;
            zeroHsl
                ? arr.push({
                    overKey: 0,
                    underKey: nextCalc.overKey,
                    count: c,
                    hUnit: calcHue(nextCalc.baseHsl.h, zeroHsl.h) / c,
                    sUnit: (nextCalc.baseHsl.s - zeroHsl.s) / c,
                    lUnit: (nextCalc.baseHsl.l - zeroHsl.l) / c,
                    baseHsl: zeroHsl,
                })
                : (() => {
                    arr.push({
                        overKey: 0,
                        underKey: nextCalc.overKey,
                        count: c,
                        hUnit: nextCalc.hUnit,
                        sUnit: nextCalc.sUnit,
                        lUnit: (nextCalc.baseHsl.l - lMax) / c,
                        baseHsl: {
                            h: nextCalc.baseHsl.h - nextCalc.hUnit * c,
                            s: nextCalc.baseHsl.s - nextCalc.sUnit * c,
                            l: lMax,
                        },
                    });
                })();
        }
        else {
            console.warn(`data is not passed`);
        }
    }
    return arr;
}
const convertKey = (key) => {
    const n = Number(key);
    if (!isNaN(n)) {
        if (n < 0 || n > 1000) {
            consoleWarn(`"${key}" is invalid key. the key must be in 0..1000.`);
        }
        return n < 0 ? 0 : n > 1000 ? 1000 : n;
    }
    consoleWarn(`"${key}" is invalid key. the key must be a number type.`);
    return null;
};
