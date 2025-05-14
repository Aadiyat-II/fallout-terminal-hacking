import './Symbol.css'
import type { SymbolProps } from './SymbolTypes'

export default function Symbol( { symbol, handleMouseEnter, handleMouseLeave, className } : SymbolProps){
    return <span 
                onMouseEnter={()=>handleMouseEnter()} 
                onMouseLeave={()=>handleMouseLeave()}
                className={className}
            >
                {symbol}
            </span>
}