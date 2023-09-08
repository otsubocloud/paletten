"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class Paletten {
    constructor(commonConfig) {
        this.config = undefined;
        // noinspection SpellCheckingInspection
        this.paletten = (value, options) => {
            return (0, index_1.paletten)(value, Object.assign(Object.assign({}, this.config), options));
        };
        this.config = commonConfig;
    }
}
exports.default = Paletten;
