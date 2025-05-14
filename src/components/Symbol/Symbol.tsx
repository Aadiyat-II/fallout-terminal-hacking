import './Symbol.css'

export default function Symbol( { symbol, handleMouseEnter, handleMouseLeave, className } : { symbol: string, handleMouseEnter: CallableFunction, handleMouseLeave: CallableFunction, className: string}){
    return <span 
                onMouseEnter={()=>handleMouseEnter()} 
                onMouseLeave={()=>handleMouseLeave()}
                className={className}
            >
                {symbol}
            </span>
}