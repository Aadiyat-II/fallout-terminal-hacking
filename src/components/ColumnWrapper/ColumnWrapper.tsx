import type { ReactNode } from "react";

import { addresses, numLines } from "../../utils/setUpGame";

import Column from "../Column/Column";
import HexAddressColumn from "../HexAddressColumn/HexAddressColumn";

import './ColumnWrapper.css';

export default function ColumnWrapper({ symbols  } : { symbols: ReactNode[] }){
    const numCols = 2
    const symbolsPerColumn = symbols.length/numCols

    const columns = Array.from(
        { length: numCols }, (_, i) => 
          <div className="column-pair">
            <HexAddressColumn addresses={addresses.slice(i*numLines, i*numLines+numLines)} />
            <Column 
              colSymbols={symbols.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}
            />
          </div>
    )
          
    return <div className="column-wrapper">{columns}</div>
}