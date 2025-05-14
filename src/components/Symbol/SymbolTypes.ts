export interface SymbolProps{
    symbol: string, 
    handleMouseEnter: CallableFunction, 
    handleMouseLeave: CallableFunction, 
    handleClick: CallableFunction,
    className: string
}

export const highlightedSymbolClassName = "highlighted-symbol"