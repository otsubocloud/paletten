/**
 * pattern:
 * rgb(31 120 50)
 * rgb(30% 20% 50%)
 * rgb(255 122 127 / 80%)
 * rgb(255 122 127 / .2)
 */

export default function rgbCodeToObject(code: string) {
  let v = code
  v = v.replace(/^rgba\(/, '')
  v = v.replace(/^rgb\(/, '')
  v = v.replace(/\)$/, '')

  const vs = v.includes(',') ? v.split(',') : v.split(' ')

  if (vs.length >= 3) {
    const r = convert(vs[0])
    const g = convert(vs[1])
    const b = convert(vs[2])
    if (r !== null && g !== null && b !== null) {
      return { r, g, b }
    }
  }
  return null
}

const convert = (v: string) => {
  if (v.includes('%')) {
    const n = Number(v.replace('%', ''))
    if (isNaN(n)) return null
    return n < 0 ? 0 : n > 100 ? 100 : n
  } else {
    const n = Number(v)
    if (isNaN(n)) return null
    return n < 0 ? 0 : n > 255 ? 255 : n
  }
}
