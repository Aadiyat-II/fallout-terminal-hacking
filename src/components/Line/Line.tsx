export default function Line({ lineChars } : { lineChars: string[]}){
    return (<p>
        {lineChars.map((symbol, _) => <span>{symbol}</span>)}
    </p>)
}