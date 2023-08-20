import {
  CalcData,
  PalettenFunc,
  HslObj,
  PalettenData,
} from './types.js'
import { codeToHsl } from './utils/color/codeToHsl.js'
import generatePalette from './fn/generatePalette.js'
import consoleWarn from './fn/consoleWarn.js'
import generateCalcData from './fn/generateCalcData.js'

const paletten: PalettenFunc = (value, options) => {
  const calcData: CalcData[] = (() => {
    if (!value) {
      consoleWarn(`parameter 1 is invalid value.`)
      return [] as any
    }

    if (typeof value === 'string') {
      const hsl = codeToHsl(value)
      if (!hsl) {
        consoleWarn(`"${value}" is invalid value.`)
        return [] as any
      }

      return generateCalcData({
        500: hsl,
      })
    } else {
      const obj = (() => {
        const obj: { [p in string]: HslObj } = {}
        for (let key of Object.keys(value)) {
          const code = value[key]
          const hsl = codeToHsl(code)
          if (hsl) {
            obj[key] = hsl
          } else {
            consoleWarn(`"${code}" is invalid value.`)
          }
        }
        return obj
      })()

      return generateCalcData(obj) as any
    }
  })()

  return generatePalette(calcData, options) as any
}

export default paletten

import Paletten from './fn/palettenClass.js'

export { Paletten, PalettenData }
