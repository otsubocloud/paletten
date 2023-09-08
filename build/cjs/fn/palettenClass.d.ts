import { Options } from '../types.js';
export default class Paletten {
    config: Options | undefined;
    constructor(commonConfig: Options);
    paletten: (value: string | {
        [x: string]: string;
        [x: number]: string;
    }, options?: Options) => {
        [p: string]: string;
    };
}
