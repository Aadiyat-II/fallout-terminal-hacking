import { useState } from 'react'

import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { highlightedSymbolClassName } from './components/Symbol/SymbolTypes'

import { rawSymbols, wordStartIndices, wordLength, password, selectedWords } from './utils/setUpGame'
import compareToPassword from './utils/compareToPassword'

import './App.css'

function App() {
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(Array.from(rawSymbols, (_)=> ""))
  const [ tries, setTries ] = useState<number>(4)

  const symbols = rawSymbols.map((sym, i) => <Symbol  
    symbol={sym}
    handleMouseEnter={()=>handleMouseEnterSymbol(i)}
    handleMouseLeave={()=>handleMouseLeaveSymbol()}
    handleClick={()=>handleClick(i)}
    className={highlightedSymbols[i]}
  />)

  function handleClick(idx: number){
    if(tries){
      let word = isWord(idx)
      if(word>-1){
        checkGuess(word)
      }
    }
  }

  function checkGuess(word: number) {
    const guess = selectedWords[word]
    const numMatches = compareToPassword(password, guess)
    console.log(`Guessed: ${guess}, likeness = ${numMatches}`)
    if(numMatches == wordLength){
      console.log("Game Won")
    }
    else{
      setTries(tries-1)
    }
  }

  function handleMouseEnterSymbol(idx: number){
    let nextHighlightedSymbols = Array.from(rawSymbols, (_)=> "")
    
    let word = isWord(idx)
    if(word>-1){
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
        <p>Tries: <span>{tries}</span></p>
        <ColumnWrapper symbols={symbols}/>
      </div>
    </>
  )
}

export default App