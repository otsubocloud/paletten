export default function formatRgbCode(rgb: {
  r: number
  g: number
  b: number
}) {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`
}
