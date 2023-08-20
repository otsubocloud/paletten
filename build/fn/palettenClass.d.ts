import { PalettenFunc, Options } from '../types';
type CommonConfig = Options;
export default class Paletten {
    config: CommonConfig | undefined;
    constructor(commonConfig: CommonConfig);
    paletten: PalettenFunc;
}
export {};
