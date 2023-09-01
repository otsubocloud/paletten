"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paletten = exports.paletten = void 0;
const codeToHsl_1 = require("./utils/color/codeToHsl");
const generatePalette_1 = __importDefault(require("./fn/generatePalette"));
const consoleWarn_1 = __importDefault(require("./fn/consoleWarn"));
const generateCalcData_1 = __importDefault(require("./fn/generateCalcData"));
// noinspection SpellCheckingInspection
const paletten = (value, options) => {
    const calcData = (() => {
        if (!value) {
            (0, consoleWarn_1.default)(`parameter 1 is invalid value.`);
            return [];
        }
        if (typeof value === 'string') {
            const hsl = (0, codeToHsl_1.codeToHsl)(value);
            if (!hsl) {
                (0, consoleWarn_1.default)(`"${value}" is invalid value.`);
                return [];
            }
            return (0, generateCalcData_1.default)({
                500: hsl,
            });
        }
        else {
            const obj = (() => {
                const obj = {};
                for (let key of Object.keys(value)) {
                    const code = value[key];
                    const hsl = (0, codeToHsl_1.codeToHsl)(code);
                    if (hsl) {
                        obj[key] = hsl;
                    }
                    else {
                        (0, consoleWarn_1.default)(`"${code}" is invalid value.`);
                    }
                }
                return obj;
            })();
            return (0, generateCalcData_1.default)(obj);
        }
    })();
    return (0, generatePalette_1.default)(calcData, options);
};
exports.paletten = paletten;
// noinspection SpellCheckingInspection
const palettenClass_1 = __importDefault(require("./fn/palettenClass"));
exports.Paletten = palettenClass_1.default;
