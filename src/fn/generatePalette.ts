import { CalcData, Options } from '../types.js'
import sort from '../utils/sort.js'
import calcValue from './calcValue.js'
import {
  VARIANT_COARSE_KEYS,
  VARIANT_FINE_KEYS,
  VARIANT_STANDARD_KEYS,
} from '../const.js'

export default function generatePalette(
  calcData: CalcData[],
  options?: Options
) {
  const {
    variant = 'standard',
    format = 'hex',
    prefix,
    extend,
    reversed = false,
  } = options || {}

  const amounts: number[] = (() => {
    const variantKeys = (variant === 'coarse'
      ? VARIANT_COARSE_KEYS
      : variant === 'fine'
      ? VARIANT_FINE_KEYS
      : VARIANT_STANDARD_KEYS) as any as number[]
    if (extend) {
      const extendKeys = extend.filter(
        key =>
          typeof key === 'number' &&
          key < 1000 &&
          !variantKeys.includes(key)
      )
      return sort(variantKeys.concat(extendKeys))
    }
    return sort(variantKeys)
  })()

  return (() => {
    let obj: { [p in string]: string } = {}
    for (let amount of amounts) {
      const key = Number(amount)
      if (!isNaN(key)) {
        const code = calcValue(amount, calcData, format)
        if (!!code) {
          obj[key] = code
        }
      }
    }

    if (reversed) {
      const rObj: { [p in string]: string } = {}
      const keys = sort(
        Object.keys(obj).map(key => Number(key))
      )
      keys.forEach(key => {
        rObj[1000 - key] = obj[key]
      })
      obj = rObj
    }

    if (prefix) {
      const pObj: { [p in string]: string } = {}
      Object.keys(obj).forEach(key => {
        pObj[prefix + key] = obj[key]
      })
      obj = pObj
    }

    return obj
  })()
}
