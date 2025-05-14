import { getRandomInt } from "./getRandomInt";
import { shuffle } from "./shuffle";

const words= ["dangers", "sending", "central", "hunters", "resides", "believe", "venture", "pattern", "discard", "mention", "cutters", "canteen", "beliefs", "banning", "minigun", "cistern"];
const miscSymbols = [',','.','!','@','#','$','%','&','(',')','{','}','[',']','<','>','?','"',"'", '/', '|'];
const symbolArrayLength = 384
const numWords = 10
const chunkLength = Math.floor(symbolArrayLength / numWords);

export const wordLength = 7
export const numCols = 2
export const numLines = 12
export const symbolsPerLine = symbolArrayLength/(numCols*numLines)
export const selectedWords = shuffle(words).slice(0, numWords);

export const wordStartIndices = Array.from({ length: numWords }, (_, i) => i * chunkLength + getRandomInt(0, chunkLength - wordLength - 1))
export let rawSymbols = new Array(symbolArrayLength).fill(null);
    
// Enter each word starting from the corresponding start index
selectedWords.forEach((word: string, idx: number) => {
    const startIdx = wordStartIndices[idx];
    const chars = word.split('');

    for (let i = 0; i < wordLength; i++) {
        rawSymbols[startIdx + i] = chars[i];
    }
});

// Fill the rest of the symbol array with random misc symbols
for (let i = 0; i < symbolArrayLength; i++) {
    if (rawSymbols[i])
        continue;
    rawSymbols[i] = miscSymbols[getRandomInt(0, miscSymbols.length - 1)];
}


export const password = selectedWords[getRandomInt(0, numWords)]