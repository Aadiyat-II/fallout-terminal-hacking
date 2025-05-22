
export type GameState = {
    selectedWords: string[],
    wordStartIndices: number[],
    password: string,
    characterArray: string[],
    remainingAttempts: number
    usedBrackets: number[],
    currentSelection: string,
    highlightedSymbols: string[],
    logMessages: string[],
    gamePhase: "PLAYING" | "LOGGING_IN" | "ENTRY_GRANTED" | "LOCKED_OUT"
}

export type Action = 
{
    type: "mouse_entered" | "clicked",
    idx: number
} |
{
    type: "mouse_left" | "reset" | "login",
}

export interface SelectionRange{
    start: number,
    end: number
}

export class BracketPair implements SelectionRange{
    start: number
    end: number
    valid: boolean

    constructor(start: number, end: number){
        this.start = start
        this.end = end
        this.valid = (this.start > -1) && (this.end > -1)
    }
}