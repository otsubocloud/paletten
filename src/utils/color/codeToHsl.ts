import detectCodeType from './detectCodeType.js'
import hexCodeToRgb from './hexCodeToRgb.js'
import rgbToHsl from './rgbToHsl.js'
import hslCodeToObject from './hslCodeToObject.js'
import rgbCodeToObject from './rgbCodeToObject.js'

export const codeToHsl = (code: string) => {
  switch (detectCodeType(code)) {
    case 'hsl':
      return hslCodeToObject(code)
    case 'rgb':
      return (() => {
        const rgb = rgbCodeToObject(code)
        if (rgb) return rgbToHsl(rgb)
      })()
    case 'hex':
      return (() => {
        const rgb = hexCodeToRgb(code)
        if (rgb) return rgbToHsl(rgb)
      })()
    default:
      return
  }
}
