import './Symbol.css'

export default function Symbol( { symbol, handleMouseEnter, className } : { symbol: string, handleMouseEnter: CallableFunction, className: string}){
    return <span onMouseEnter={()=>handleMouseEnter()} className={className}>{symbol}</span>
}