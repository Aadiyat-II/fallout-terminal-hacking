import { useState } from 'react'
import './App.css'
import Column from './components/Column/Column'
import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { symbolArray } from './utils/symbolArray'

function App() {
  const numCols = 2
  const symbolsPerColumn = symbolArray.length/numCols
  
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(symbolArray.map((_, i) => ""))
  const symbols = symbolArray.map((sym, i) => <Symbol  symbol={sym} handleMouseEnter={()=>handleMouseEnterSymbol(i)} className={highlightedSymbols[i]}/>)

  function handleMouseEnterSymbol(idx: number){
    const newHighlightedSymbols = [...highlightedSymbols]
    newHighlightedSymbols[idx] = "highlighted-symbol"
    setHighlightedSymbols(newHighlightedSymbols)
  }

  const Columns = Array.from(
    { length: numCols }, (_, i) => 
      <Column 
        colSymbols={symbols.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}
      />
  )

  return (
    <>
      <div>
        <ColumnWrapper>
          {Columns}
        </ColumnWrapper>
      </div>
    </>
  )
}

export default App