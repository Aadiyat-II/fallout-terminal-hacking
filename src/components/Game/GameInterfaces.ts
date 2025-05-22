export interface GameProps{
    handleMouseEnterSymbol : CallableFunction,
    handleMouseLeaveSymbol: CallableFunction,
    handleClick: CallableFunction,
    characterArray: string[],
    highlightedSymbols: string[],
    remainingAttempts: number,
    logMessages: string[],
    currentSelection: string
}