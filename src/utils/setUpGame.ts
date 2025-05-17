import { getRandomInt } from "./getRandomInt";
import { shuffle } from "./shuffle";

const words= ["dangers", "sending", "central", "hunters", "resides", "believe", "venture", "pattern", "discard", "mention", "cutters", "canteen", "beliefs", "banning", "minigun", "cistern"];
const miscSymbols = [',','.','!','@','#','$','%','&','(',')','{','}','[',']','<','>','?','"',"'", '/', '|'];
const symbolArrayLength = 384
const numWords = 10
const chunkLength = Math.floor(symbolArrayLength / numWords);

export const triesResetProbablity = 0.2
export const totalTries = 4
export const wordLength = 7
export const numCols = 2
export const numLines = 16
export const symbolsPerLine = symbolArrayLength/(numCols*numLines)
export const selectedWords = shuffle(words).slice(0, numWords);

export const wordStartIndices = Array.from({ length: numWords }, (_, i) => i * chunkLength + getRandomInt(0, chunkLength - wordLength - 1))
export let rawSymbols = new Array(symbolArrayLength).fill(null);
    
fillCharacterArray();

export const password = selectedWords[getRandomInt(0, numWords)]
export const addresses = generateAddresses()

function fillCharacterArray() {
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
}

function generateAddresses(){
    const byteSize = 8; //TODO: define bytesize elsewhere?
    let addresses = Array(numLines*numCols)

    const startingAddress = generateStartingAddress();

    for(let i=0; i<addresses.length; i++){
        addresses[i] = startingAddress+(i*byteSize);
    }

    return addresses;
}

function generateStartingAddress(){
    const byteSize = 8;
    const maxAddress = 0xFFFF - (numLines*numCols*byteSize)+byteSize;

    let startingAddress = Math.ceil(Math.random()*maxAddress);

    const remainder = startingAddress%byteSize;
    startingAddress = startingAddress - remainder; //Removing the remainder ensures the address is a multiple of 8

    return startingAddress;
}
