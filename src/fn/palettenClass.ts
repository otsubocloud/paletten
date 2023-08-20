import { PalettenFunc, Options } from '../types.js'
import _paletten from '../index.js'

type CommonConfig = Options

export default class Paletten {
  config: CommonConfig | undefined = undefined

  constructor(commonConfig: CommonConfig) {
    this.config = commonConfig
  }

  paletten: PalettenFunc = (value, options) => {
    return _paletten(value, { ...this.config, ...options })
  }
}
