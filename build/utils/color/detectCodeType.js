export default function detectCodeType(code) {
    if (/^hsl\(/.test(code) || /^hsla\(/.test(code)) {
        return 'hsl';
    }
    else if (/^rgb\(/.test(code) || /^rgba\(/.test(code)) {
        return 'rgb';
    }
    else if (/^#[a-zA-Z0-9]+$/.test(code)) {
        return 'hex';
    }
    return null;
}
