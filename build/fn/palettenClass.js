import _paletten from '../index.js';
export default class Paletten {
    constructor(commonConfig) {
        this.config = undefined;
        this.paletten = (value, options) => {
            return _paletten(value, Object.assign(Object.assign({}, this.config), options));
        };
        this.config = commonConfig;
    }
}
