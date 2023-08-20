export default function formatHslCode(hsl: {
  h: number
  s: number
  l: number
}) {
  return `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`
}
