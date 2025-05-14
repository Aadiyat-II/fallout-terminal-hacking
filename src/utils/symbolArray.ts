const words= ["dangers", "sending", "central", "hunters", "resides", "believe", "venture", "pattern", "discard", "mention", "cutters", "canteen", "beliefs", "banning", "minigun", "cistern"];
const miscSymbols = [',','.','!','@','#','$','%','&','(',')','{','}','[',']','<','>','?','"',"'", '/', '|'];
const symbolArrayLength = 384
const numWords = 10
export const wordLength = 7


const chunkLength = Math.floor(symbolArrayLength / numWords);
const selectedWords = shuffle(words).slice(0, numWords);

export const wordStartIndices = Array.from({ length: numWords }, (_, i) => i * chunkLength + getRandomInt(0, chunkLength - wordLength - 1))
export let symbolArray = new Array(symbolArrayLength).fill(null);
    
// Enter each word starting from the corresponding start index
selectedWords.forEach((word: string, idx: number) => {
    const startIdx = wordStartIndices[idx];
    const chars = word.split('');

    for (let i = 0; i < wordLength; i++) {
        symbolArray[startIdx + i] = chars[i];
    }
});

// Fill the rest of the symbol array with random misc symbols
for (let i = 0; i < symbolArrayLength; i++) {
    if (symbolArray[i])
        continue;
    symbolArray[i] = miscSymbols[getRandomInt(0, miscSymbols.length - 1)];
}

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function shuffle(array: string[]){
    return array.map((word) => ({ sort: Math.random(), value: word})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
}