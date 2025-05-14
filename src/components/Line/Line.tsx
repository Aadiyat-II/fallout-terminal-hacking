export default function Line({ lineChars, handleMouseEnterLine } : { lineChars: string[], handleMouseEnterLine: CallableFunction}){
    return (<p>
        {lineChars.map((symbol, i) => <span onMouseEnter={()=>handleMouseEnterLine(i)}>{symbol}</span>)}
    </p>)
}
