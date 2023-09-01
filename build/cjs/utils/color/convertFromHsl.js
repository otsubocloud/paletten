"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatHslCode_1 = __importDefault(require("./formatHslCode"));
const formatRgbCode_1 = __importDefault(require("./formatRgbCode"));
const hslToRgb_1 = __importDefault(require("./hslToRgb"));
const rgbToHexCode_1 = __importDefault(require("./rgbToHexCode"));
function convertFromHsl(hsl, to) {
    return to === 'hsl'
        ? (0, formatHslCode_1.default)(hsl)
        : to === 'rgb'
            ? (0, formatRgbCode_1.default)((0, hslToRgb_1.default)(hsl))
            : (0, rgbToHexCode_1.default)((0, hslToRgb_1.default)(hsl));
}
exports.default = convertFromHsl;
