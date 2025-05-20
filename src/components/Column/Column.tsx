import type { ReactNode } from "react"
import Line from "../Line/Line"
import './Column.css'

import { numLines } from "../../utils/gameParameters"

export default function Column({ colSymbols }: { colSymbols: ReactNode[]}){    
    const charsPerRow = colSymbols.length/numLines
    const lines = Array.from({length: numLines}, (_, i) => 
        <Line 
            lineChars={colSymbols.slice(i*charsPerRow, i*charsPerRow+charsPerRow)}
        />)

    return <div className="character-column">{lines}</div>
}