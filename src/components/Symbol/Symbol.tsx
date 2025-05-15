import './Symbol.css'
import type { SymbolProps } from './SymbolTypes'

export default function Symbol( { symbol, handleMouseEnter, handleMouseLeave, handleClick, className } : SymbolProps){
    return <span 
                onMouseEnter={()=>handleMouseEnter()} 
                onMouseLeave={()=>handleMouseLeave()}
                onClick={()=>handleClick()}
                className={className}
            >
                {symbol}
            </span>
}