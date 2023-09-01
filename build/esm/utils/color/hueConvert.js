export default function hueConvert(v) {
    return (v < 0 ? 360 + v : v) % 360;
}
