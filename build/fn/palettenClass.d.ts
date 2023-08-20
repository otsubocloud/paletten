import { PalettenFunc, Options } from '../types.js';
type CommonConfig = Options;
export default class Paletten {
    config: CommonConfig | undefined;
    constructor(commonConfig: CommonConfig);
    paletten: PalettenFunc;
}
export {};
