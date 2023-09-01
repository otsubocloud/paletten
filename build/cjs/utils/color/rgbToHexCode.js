"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rgbToHexCode(rgb) {
    const { r, g, b } = rgb;
    return ('#' +
        (format(Math.round(r).toString(16)) +
            format(Math.round(g).toString(16)) +
            format(Math.round(b).toString(16))).toUpperCase());
}
exports.default = rgbToHexCode;
const format = (v) => {
    if (v.length == 1) {
        v = '0' + v;
    }
    if (v.length == 0) {
        v = '00';
    }
    return v;
};
