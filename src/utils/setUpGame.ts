export const candidateWords= ["dangers", "sending", "central", "hunters", "resides", "believe", "venture", "pattern", "discard", "mention", "cutters", "canteen", "beliefs", "banning", "minigun", "cistern"];
export const miscSymbols = [',','.','!','@','#','$','%','&','(',')','{','}','[',']','<','>','?','"',"'", '/', '|'];
export const symbolArrayLength = 384
export const numWords = 10
export const chunkLength = Math.floor(symbolArrayLength / numWords);

export const triesResetProbablity = 0.2
export const totalTries = 4
export const wordLength = 7
export const numCols = 2
export const numLines = 16
export const symbolsPerLine = symbolArrayLength/(numCols*numLines)

export const addresses = generateAddresses()



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
