import { PalettenData, } from './types';
import { codeToHsl } from './utils/color/codeToHsl';
import generatePalette from './fn/generatePalette';
import consoleWarn from './fn/consoleWarn';
import generateCalcData from './fn/generateCalcData';
const paletten = (value, options) => {
    const calcData = (() => {
        if (!value) {
            consoleWarn(`parameter 1 is invalid value.`);
            return [];
        }
        if (typeof value === 'string') {
            const hsl = codeToHsl(value);
            if (!hsl) {
                consoleWarn(`"${value}" is invalid value.`);
                return [];
            }
            return generateCalcData({
                500: hsl,
            });
        }
        else {
            const obj = (() => {
                const obj = {};
                for (let key of Object.keys(value)) {
                    const code = value[key];
                    const hsl = codeToHsl(code);
                    if (hsl) {
                        obj[key] = hsl;
                    }
                    else {
                        consoleWarn(`"${code}" is invalid value.`);
                    }
                }
                return obj;
            })();
            return generateCalcData(obj);
        }
    })();
    return generatePalette(calcData, options);
};
export default paletten;
import Paletten from './fn/palettenClass';
export { Paletten, PalettenData };
