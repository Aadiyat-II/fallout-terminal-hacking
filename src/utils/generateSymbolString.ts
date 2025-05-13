const symbolArrayLength = 384
const numWords = 10
const wordLength = 7

const chunkLength = Math.floor(symbolArrayLength/wordLength)

export const wordStartIndices = new Array(numWords).fill(null).map((_, i) => i*chunkLength + getRandomInt(0, chunkLength-wordLength-1))

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
  