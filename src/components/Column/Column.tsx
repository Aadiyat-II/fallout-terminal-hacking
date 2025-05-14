import Line from "../Line/Line"
import './Column.css'

export default function Column({ colSymbols, handleMouseEnterColumn }: { colSymbols: string[], handleMouseEnterColumn: CallableFunction}){
    const numLines = 12
    const charsPerRow = colSymbols.length/numLines
    const lines = Array.from({length: numLines}, (_, i)=> <Line 
                                                                lineChars={colSymbols.slice(i*charsPerRow, i*charsPerRow+charsPerRow)}
                                                                handleMouseEnterLine={(charIdx:number)=> handleMouseEnterColumn(i, charIdx)}
                                                                />)

    return <div className="symbol-column">{lines}</div>
}