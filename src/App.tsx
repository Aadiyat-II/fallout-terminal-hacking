import { useState } from 'react'

import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { highlightedSymbolClassName } from './components/Symbol/SymbolTypes'

import { rawSymbols, wordStartIndices, wordLength, password, selectedWords, symbolsPerLine, totalTries, rewardTriesResetP } from './utils/setUpGame'
import compareStrings from './utils/compareStrings'

import './App.css'
import BracketPair from './utils/BracketPair'
import { getRandomInt } from './utils/getRandomInt'

function App() {
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(Array.from(rawSymbols, (_)=> ""))
  const [ tries, setTries ] = useState<number>(totalTries)
  const [ bracketBlacklist, setBracketBlacklist] = useState<number[]>([0])
  const [ symbolArray, setSymbolArray ] = useState<string[]>(rawSymbols)

  const symbols = symbolArray.map((sym, i) => <Symbol  
    symbol={sym}
    handleMouseEnter={()=>handleMouseEnterSymbol(i)}
    handleMouseLeave={()=>handleMouseLeaveSymbol()}
    handleClick={()=>handleClick(i)}
    className={highlightedSymbols[i]}
  />)

  function handleClick(idx: number){
    if(tries){
      let word = isWord(idx)
      let bracketPair = findCorrespondingBracketIfAny(idx);

      if(word>-1){
        checkGuess(word)
      }
      else if(bracketPair.valid){
        giveReward()
        setBracketBlacklist([...bracketBlacklist, bracketPair.start, bracketPair.end])
      }
    }


    function checkGuess(word: number) {
      const guess = selectedWords[word]
      const numMatches = compareStrings(password, guess)
      console.log(`Guessed: ${guess}, likeness = ${numMatches}`)
      if(numMatches === wordLength){
        console.log("Game Won")
      }
      else{
        setTries(tries-1)
      }
    }
  
    function giveReward(){
      if(Math.random() < rewardTriesResetP){
        resetTries()
      }
      else{
        removeDud()
      }
    }
  
    function resetTries(){
      console.log("Reset Tries!")
      setTries(totalTries)
    }
  
    function removeDud(){
      const duds = Array.from(selectedWords, (elem, i) => {
        if(elem != password)
          return i;
      }).filter(i => i !=undefined)
  
      if(!duds.length)
        return
  
      console.log("Remove dud!")
      const wordToRemoveIdx = duds[getRandomInt(0, duds.length)]
  
      const nextSymbolArray = [...symbolArray]
      const wordStart  = wordStartIndices[wordToRemoveIdx]
  
      for(let i = wordStart; i < wordStart + wordLength; i++){
        nextSymbolArray[i] = '.'
      }
  
      selectedWords.splice(wordToRemoveIdx, 1)
      wordStartIndices.splice(wordToRemoveIdx, 1)
  
      setSymbolArray(nextSymbolArray)
    }
  }

  function handleMouseEnterSymbol(idx: number){
    let nextHighlightedSymbols = Array.from(symbolArray, (_)=> "")
    
    let word = isWord(idx)
    let bracketPair = findCorrespondingBracketIfAny(idx);

    if(word>-1){
      highlightWholeWord()
    }
    else if(bracketPair.valid){
      highlightBracketPair()
    }
    else{
      highlightSymbol()
    }

    setHighlightedSymbols(nextHighlightedSymbols)

    function highlightWholeWord() {
      const wordStart = wordStartIndices[word]
      for (let i = wordStart; i < wordStart + wordLength; i++) {
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
    }

    function highlightBracketPair() {
      for (let i = bracketPair.start; i <= bracketPair.end; i++) {
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
    }

    function highlightSymbol() {
      nextHighlightedSymbols[idx] = highlightedSymbolClassName
    }
  }

  function handleMouseLeaveSymbol(){
    const nextHighlightedSymbols = Array.from(symbolArray, (_)=> "")
    setHighlightedSymbols(nextHighlightedSymbols)
  }

  function isWord(i:number){
    // Compares the index of a symbol with the index of where each word starts (and ends) to see if the  symbol is part of a word
    return wordStartIndices.findIndex((element) => i >= element && i < element+wordLength)
  }

  function findCorrespondingBracketIfAny(selectedSymbolIdx: number){
    const openBrackets = ['<', '(', '{', '[']
    const closeBrackets = ['>', ')', '}', ']']

    const lineStartIdx =   Math.floor(selectedSymbolIdx / symbolsPerLine)*symbolsPerLine
    const lineEndIdx = lineStartIdx +  symbolsPerLine

    const selectedChar = symbolArray[selectedSymbolIdx]
    
    let bracketStart = -1
    let bracketEnd = -1

    const selectedOpenBracket = openBrackets.indexOf(selectedChar)
    if(selectedOpenBracket > -1 && !bracketBlacklist.some((elem)=> elem === selectedSymbolIdx)){
      bracketStart = selectedSymbolIdx
      bracketEnd = findChar(closeBrackets[selectedOpenBracket], selectedSymbolIdx, lineEndIdx)
    }

    const selectedCloseBracket = closeBrackets.indexOf(selectedChar)
    if(selectedCloseBracket > -1  && !bracketBlacklist.some((elem)=> elem === selectedSymbolIdx)){
      bracketEnd = selectedSymbolIdx
      bracketStart = findChar(openBrackets[selectedCloseBracket], lineStartIdx, selectedSymbolIdx)
    }

    return new BracketPair(bracketStart, bracketEnd)
    

    function findChar(char: string, searchStart: number, searchEnd: number) {
      let loc = -1
      for (let j = searchStart; j < searchEnd; j++) {
        if (isWord(j)>-1){ // If a word appears within a pair of brackets, it is not a valid bracket pair
          loc = -1
          break
        }
        if (symbolArray[j] === char  && !bracketBlacklist.some((elem)=> elem === j)) {
          loc = j
        }
      }

      return loc
    }
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