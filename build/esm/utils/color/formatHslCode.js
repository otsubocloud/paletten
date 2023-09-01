export default function formatHslCode(hsl) {
    return `hsl(${clean(hsl.h)} ${clean(hsl.s)}% ${clean(hsl.l)}%)`;
}
const clean = (v) => {
    return Math.round(v * 10) / 10;
};
