import { useState } from 'react'

import Column from './components/Column/Column'
import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { highlightedSymbolClassName } from './components/Symbol/SymbolTypes'

import { symbolArray, wordStartIndices, wordLength } from './utils/symbolArray'

import './App.css'

function App() {
  const numCols = 2
  const symbolsPerColumn = symbolArray.length/numCols
  
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(symbolArray.map((_, i) => ""))
  const symbols = symbolArray.map((sym, i) => <Symbol  
    symbol={sym}
    handleMouseEnter={()=>handleMouseEnterSymbol(i)}
    handleMouseLeave={()=>handleMouseLeaveSymbol()}
    className={highlightedSymbols[i]}
  />)

 
  function handleMouseEnterSymbol(idx: number){
    let selectedWordIdx = isHoveringOverWord(idx)
    let nextHighlightedSymbols = symbolArray.map((_, i) => "")

    if(selectedWordIdx){
      for(let i = selectedWordIdx; i<selectedWordIdx+wordLength; i++){
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
    }
    else{
      nextHighlightedSymbols[idx] = highlightedSymbolClassName
    }

    setHighlightedSymbols(nextHighlightedSymbols)
  }

  function handleMouseLeaveSymbol(){
    const nextHighlightedSymbols = symbolArray.map((_, i) => "")
    setHighlightedSymbols(nextHighlightedSymbols)
    console.log(highlightedSymbols)
  }

  function isHoveringOverWord(i:number){
    return wordStartIndices.find((element) => i >= element && i < element+wordLength)
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