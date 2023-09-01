"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeToHsl = void 0;
const detectCodeType_1 = __importDefault(require("./detectCodeType"));
const hexCodeToRgb_1 = __importDefault(require("./hexCodeToRgb"));
const rgbToHsl_1 = __importDefault(require("./rgbToHsl"));
const hslCodeToObject_1 = __importDefault(require("./hslCodeToObject"));
const rgbCodeToObject_1 = __importDefault(require("./rgbCodeToObject"));
const codeToHsl = (code) => {
    switch ((0, detectCodeType_1.default)(code)) {
        case 'hsl':
            return (0, hslCodeToObject_1.default)(code);
        case 'rgb':
            return (() => {
                const rgb = (0, rgbCodeToObject_1.default)(code);
                if (rgb)
                    return (0, rgbToHsl_1.default)(rgb);
            })();
        case 'hex':
            return (() => {
                const rgb = (0, hexCodeToRgb_1.default)(code);
                if (rgb)
                    return (0, rgbToHsl_1.default)(rgb);
            })();
        default:
            return;
    }
};
exports.codeToHsl = codeToHsl;
