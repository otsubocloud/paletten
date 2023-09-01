"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = __importDefault(require("../utils/sort"));
const calcValue_1 = __importDefault(require("./calcValue"));
const const_1 = require("../const");
function generatePalette(calcData, options) {
    const { variant = 'standard', format = 'hex', prefix, extend, reversed = false, } = options || {};
    const amounts = (() => {
        const variantKeys = (variant === 'coarse'
            ? const_1.VARIANT_COARSE_KEYS
            : variant === 'fine'
                ? const_1.VARIANT_FINE_KEYS
                : const_1.VARIANT_STANDARD_KEYS);
        if (extend) {
            const extendKeys = extend.filter(key => typeof key === 'number' &&
                key < 1000 &&
                !variantKeys.includes(key));
            return (0, sort_1.default)(variantKeys.concat(extendKeys));
        }
        return (0, sort_1.default)(variantKeys);
    })();
    return (() => {
        let obj = {};
        for (let amount of amounts) {
            const key = Number(amount);
            if (!isNaN(key)) {
                const code = (0, calcValue_1.default)(amount, calcData, format);
                if (!!code) {
                    obj[key] = code;
                }
            }
        }
        if (reversed) {
            const rObj = {};
            const keys = (0, sort_1.default)(Object.keys(obj).map(key => Number(key)));
            keys.forEach(key => {
                rObj[1000 - key] = obj[key];
            });
            obj = rObj;
        }
        if (prefix) {
            const pObj = {};
            Object.keys(obj).forEach(key => {
                pObj[prefix + key] = obj[key];
            });
            obj = pObj;
        }
        return obj;
    })();
}
exports.default = generatePalette;
