export default function hslToRgb(hsl: { h: number; s: number; l: number }) {
  try {
    const { h: _h, s: _s, l: _l } = hsl

    if (0 <= _h && _h <= 360 && 0 <= _s && _s <= 100 && 0 <= _l && _l <= 100) {
      let red = 0,
        green = 0,
        blue = 0,
        q = 0,
        p = 0

      const h = Number(_h) / 360
      const s = Number(_s) / 100
      const l = Number(_l) / 100

      if (s === 0) {
        red = l
        green = l
        blue = l
      } else {
        const hueToRgb = (p: number, q: number, t: number) => {
          if (t < 0) {
            t += 1
          }

          if (t > 1) {
            t -= 1
          }

          if (t < 1 / 6) {
            p += (q - p) * 6 * t
          } else if (t < 1 / 2) {
            p = q
          } else if (t < 2 / 3) {
            p += (q - p) * (2 / 3 - t) * 6
          }

          return p
        }

        if (l < 0.5) {
          q = l * (1 + s)
        } else {
          q = l + s - l * s
        }
        p = 2 * l - q

        red = hueToRgb(p, q, h + 1 / 3)
        green = hueToRgb(p, q, h)
        blue = hueToRgb(p, q, h - 1 / 3)
      }

      return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255),
      }
    }
    return { r: 0, g: 0, b: 0 }
  } catch (e) {
    console.warn(e)
    return { r: 0, g: 0, b: 0 }
  }
}
