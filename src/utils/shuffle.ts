export default function shuffle(array: string[]) {
    return array.map((word) => ({ sort: Math.random(), value: word })).sort((a, b) => a.sort - b.sort).map((a) => a.value);
}
