"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sort(arr) {
    arr.sort((a, b) => {
        return a < b ? -1 : 1;
    });
    return arr;
}
exports.default = sort;
