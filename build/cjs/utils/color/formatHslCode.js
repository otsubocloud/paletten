"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatHslCode(hsl) {
    return `hsl(${clean(hsl.h)} ${clean(hsl.s)}% ${clean(hsl.l)}%)`;
}
exports.default = formatHslCode;
const clean = (v) => {
    return Math.round(v * 10) / 10;
};
