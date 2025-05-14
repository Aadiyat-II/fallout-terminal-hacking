export interface SymbolProps{
    symbol: string, 
    handleMouseEnter: CallableFunction, 
    handleMouseLeave: CallableFunction, 
    className: string
}

export const highlightedSymbolClassName = "highlighted-symbol"