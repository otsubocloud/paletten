export default function hexCodeToRgb(hex: string) {
  if (hex[0] === '#' && hex.length >= 7) {
    const r = convert(hex.substring(1, 3))
    const g = convert(hex.substring(3, 5))
    const b = convert(hex.substring(5, 7))

    if (r !== null && g !== null && b !== null) {
      return { r, g, b }
    }
  }
  return null
}

const convert = (v: string) => {
  const n = parseInt(v, 16)
  return !isNaN(n) ? n : null
}
