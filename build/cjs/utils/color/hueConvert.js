"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hueConvert(v) {
    return (v < 0 ? 360 + v : v) % 360;
}
exports.default = hueConvert;
