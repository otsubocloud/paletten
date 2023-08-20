export default function rgbToHexCode(rgb: { r: number; g: number; b: number }) {
  const { r, g, b } = rgb

  return (
    '#' +
    (
      format(Math.round(r).toString(16)) +
      format(Math.round(g).toString(16)) +
      format(Math.round(b).toString(16))
    ).toUpperCase()
  )
}

const format = (v: string) => {
  if (v.length == 1) {
    v = '0' + v
  }
  if (v.length == 0) {
    v = '00'
  }
  return v
}
