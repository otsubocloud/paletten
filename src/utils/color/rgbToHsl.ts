const rgbToHsl = (rgb: {
  r: number
  g: number
  b: number
}) => {
  const { r: _r, g: _g, b: _b } = rgb
  var h, // 0..360
    l,
    s // 0..1

  // convert 0..1
  const r = _r / 255
  const g = _g / 255
  const b = _b / 255
  const max = Math.max(Math.max(r, g), b),
    min = Math.min(Math.min(r, g), b)

  // convet hue
  if (max == min) {
    h = 0 // 本来は定義されないが、仮に0を代入
  } else if (max == r) {
    h = (60 * (g - b)) / (max - min) + 0
  } else if (max == g) {
    h = (60 * (b - r)) / (max - min) + 120
  } else {
    h = (60 * (r - g)) / (max - min) + 240
  }

  while (h < 0) {
    h += 360
  }

  // calc lightness
  l = (max + min) / 2

  // calc saturation
  if (max == min) {
    s = 0
  } else {
    s =
      l < 0.5
        ? (max - min) / (max + min)
        : (max - min) / (2.0 - max - min)
  }

  return {
    h: Math.round(h),
    l: Math.round(l * 100),
    s: Math.round(s * 100),
  }
}

export default rgbToHsl
