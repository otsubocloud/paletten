import { paletten as _paletten } from '../index';
export default class Paletten {
    constructor(commonConfig) {
        this.config = undefined;
        // noinspection SpellCheckingInspection
        this.paletten = (value, options) => {
            return _paletten(value, Object.assign(Object.assign({}, this.config), options));
        };
        this.config = commonConfig;
    }
}
