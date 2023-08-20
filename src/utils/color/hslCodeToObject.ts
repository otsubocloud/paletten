/**
 * pattern:
 * hsl(50 80% 40%)
 * hsl(0 80% 50% / 25%)
 * hsl(150deg 30% 60%)
 * hsl(0.3turn 60% 45% / .7)
 */

export default function hslCodeToObject(code: string) {
  let v = code
  v = v.replace(/^hsla\(/, '')
  v = v.replace(/^hsl\(/, '')
  v = v.replace(/\)$/, '')
  const vs = v.includes(',') ? v.split(',') : v.split(' ')
  if (vs.length >= 3) {
    const h = (() => {
      const h = Number(vs[0])
      return !isNaN(h) ? h % 360 : null
      /** "turn" && "deg" is not supported */
      // const h = vs[0]
      // const deg = h.includes('turn')
      //   ? Number(h.replace('turn', '')) * 360
      //   : Number(h)
      // return !isNaN(deg) ? deg % 360 : null
    })()
    const s = (() => {
      const s = Number(vs[1].replace('%', ''))
      if (isNaN(s)) return null
      return s < 0 ? 0 : s > 100 ? 100 : s
    })()
    const l = (() => {
      const l = Number(vs[2].replace('%', ''))
      if (isNaN(l)) return null
      return l < 0 ? 0 : l > 100 ? 100 : l
    })()
    if (h !== null && s !== null && l !== null) {
      return { h, s, l }
    }
  }
  return null
}
