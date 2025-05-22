import './Character.css'
import type { CharacterProps } from './CharacterInterfaces'

export default function Character( { symbol, handleMouseEnter, handleMouseLeave, handleClick, className } : CharacterProps){
    return <span 
                onMouseEnter={()=>handleMouseEnter()} 
                onMouseLeave={()=>handleMouseLeave()}
                onClick={()=>handleClick()}
                className={className}
            >
                {symbol}
            </span>
}