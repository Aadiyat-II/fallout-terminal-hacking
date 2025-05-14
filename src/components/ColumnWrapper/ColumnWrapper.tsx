import type { ReactNode } from "react";
import Column from "../Column/Column";

import './ColumnWrapper.css';

export default function ColumnWrapper({ symbols  } : { symbols: ReactNode[] }){
    const numCols = 2
    const symbolsPerColumn = symbols.length/numCols

    const columns = Array.from(
        { length: numCols }, (_, i) => 
          <Column 
            colSymbols={symbols.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}
          />
    )
          
    return <div className="column-wrapper">{columns}</div>
}