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