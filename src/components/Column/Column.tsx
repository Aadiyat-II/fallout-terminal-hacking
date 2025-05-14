import type { ReactNode } from "react"
import Line from "../Line/Line"
import './Column.css'

export default function Column({ colSymbols }: { colSymbols: ReactNode[]}){
    const numLines = 12
    const charsPerRow = colSymbols.length/numLines
    const lines = Array.from({length: numLines}, (_, i) => 
        <Line 
            lineChars={colSymbols.slice(i*charsPerRow, i*charsPerRow+charsPerRow)}
        />)

    return <div className="symbol-column">{lines}</div>
}