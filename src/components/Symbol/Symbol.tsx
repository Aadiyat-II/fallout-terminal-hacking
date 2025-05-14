export default function Symbol( { symbol, handleMouseEnter } : { symbol: string, handleMouseEnter: CallableFunction }){
    return <span onMouseEnter={()=>handleMouseEnter()}>{symbol}</span>
}