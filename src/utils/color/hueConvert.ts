export default function hueConvert(v: number) {
  return (v < 0 ? 360 + v : v) % 360
}
