export interface CharacterProps{
    symbol: string, 
    handleMouseEnter: CallableFunction, 
    handleMouseLeave: CallableFunction, 
    handleClick: CallableFunction,
    className: string
}

export const highlightedSymbolClassName = "highlighted-symbol"