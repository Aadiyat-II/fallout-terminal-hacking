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
  const symbols = symbolArray.map((sym, i) => <Symbol  
    symbol={sym}
    handleMouseEnter={()=>handleMouseEnterSymbol(i)}
    handleMouseLeave={()=>handleMouseLeaveSymbol(i)}
    className={highlightedSymbols[i]}
  />)

  function handleMouseEnterSymbol(idx: number){
    console.log(highlightedSymbols)

    console.log(`ENTERED ${idx}`)
    const newHighlightedSymbols = symbolArray.map((_, i) => "")
    newHighlightedSymbols[idx] = "highlighted-symbol"
    setHighlightedSymbols(newHighlightedSymbols)
  }

  function handleMouseLeaveSymbol(idx: number){
    console.log(`LEFT ${idx}`)
    const newHighlightedSymbols = symbolArray.map((_, i) => "")
    setHighlightedSymbols(newHighlightedSymbols)
    console.log(highlightedSymbols)
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