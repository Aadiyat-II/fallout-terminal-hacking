import { useState } from 'react'

import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { highlightedSymbolClassName } from './components/Symbol/SymbolTypes'

import { rawSymbols, wordStartIndices, wordLength, password, selectedWords } from './utils/setUpGame'

import './App.css'

function App() {
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(Array.from(rawSymbols, (_)=> ""))
  const symbols = rawSymbols.map((sym, i) => <Symbol  
    symbol={sym}
    handleMouseEnter={()=>handleMouseEnterSymbol(i)}
    handleMouseLeave={()=>handleMouseLeaveSymbol()}
    handleClick={()=>handleClick(i)}
    className={highlightedSymbols[i]}
  />)

  function handleClick(idx: number){
    let word = isWord(idx)
    if(word){
      console.log(`Selected word: ${selectedWords[word]}, Password: ${password}`)
    }
  }

  function handleMouseEnterSymbol(idx: number){
    let nextHighlightedSymbols = Array.from(rawSymbols, (_)=> "")
    
    let word = isWord(idx)
    if(word>0){
      highlightWholeWord()
    }
    else{
      highlightSymbol()
    }

    setHighlightedSymbols(nextHighlightedSymbols)

    function highlightSymbol() {
      nextHighlightedSymbols[idx] = highlightedSymbolClassName
    }

    function highlightWholeWord() {
      const wordStart = wordStartIndices[word]
      for (let i = wordStart; i < wordStart + wordLength; i++) {
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
    }
  }

  function handleMouseLeaveSymbol(){
    const nextHighlightedSymbols = Array.from(rawSymbols, (_)=> "")
    setHighlightedSymbols(nextHighlightedSymbols)
  }

  function isWord(i:number){
    // Compares the index of a symbol with the index of where each word starts (and ends) to see if the  symbol is part of a word
    return wordStartIndices.findIndex((element) => i >= element && i < element+wordLength)
  }

return (
    <>
      <div>
        <ColumnWrapper symbols={symbols}/>
      </div>
    </>
  )
}

export default App