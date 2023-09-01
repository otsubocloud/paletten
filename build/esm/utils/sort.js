export default function sort(arr) {
    arr.sort((a, b) => {
        return a < b ? -1 : 1;
    });
    return arr;
}
