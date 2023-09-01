"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
const hueConvert_1 = __importDefault(require("../utils/color/hueConvert"));
const convertFromHsl_1 = __importDefault(require("../utils/color/convertFromHsl"));
function calcValue(amount, calcData, to) {
    for (let row of calcData) {
        const { overKey, underKey, lUnit, sUnit, hUnit, baseHsl, } = row;
        if (overKey <= amount && amount < underKey) {
            const diff = (amount - overKey) / const_1.CALC_UNIT;
            const h = baseHsl.h + hUnit * diff;
            const s = baseHsl.s + sUnit * diff;
            const l = baseHsl.l + lUnit * diff;
            const hsl = {
                h: (0, hueConvert_1.default)(h),
                s: s < 0 ? 0 : s > 100 ? 100 : s,
                l: l < 0 ? 0 : l > 100 ? 100 : l,
            };
            return (0, convertFromHsl_1.default)(hsl, to);
        }
    }
}
exports.default = calcValue;
