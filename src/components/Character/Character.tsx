import './Character.css'
import type { SymbolProps } from './CharacterTypes'

export default function Character( { symbol, handleMouseEnter, handleMouseLeave, handleClick, className } : SymbolProps){
    return <span 
                onMouseEnter={()=>handleMouseEnter()} 
                onMouseLeave={()=>handleMouseLeave()}
                onClick={()=>handleClick()}
                className={className}
            >
                {symbol}
            </span>
}