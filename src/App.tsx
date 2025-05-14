import { useState } from 'react'

import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import Symbol from './components/Symbol/Symbol'
import { highlightedSymbolClassName } from './components/Symbol/SymbolTypes'

import { rawSymbols, wordStartIndices, wordLength, password, selectedWords, symbolsPerLine, totalTries, rewardTriesResetP } from './utils/setUpGame'
import compareToPassword from './utils/compareToPassword'

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
      let bracketPair = isBracketPair(idx);
      if(word>-1){
        checkGuess(word)
      }
      else if(bracketPair.valid){
        giveReward()
        setBracketBlacklist([...bracketBlacklist, bracketPair.start, bracketPair.end])
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

  function handleMouseEnterSymbol(idx: number){
    let nextHighlightedSymbols = Array.from(symbolArray, (_)=> "")
    
    let word = isWord(idx)
    let bracketPair = isBracketPair(idx);
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

  function isBracketPair(i: number){
    const openBrackets = ['<', '(', '{', '[']
    const closeBrackets = ['>', ')', '}', ']']

    const lineStartIdx =   Math.floor(i / symbolsPerLine)*symbolsPerLine
    const lineEndIdx = lineStartIdx +  symbolsPerLine

    const selectedChar = symbolArray[i]
    
    let bracketStart = -1
    let bracketEnd = -1

    const openBracket = openBrackets.indexOf(selectedChar)
    if(openBracket > -1 && !bracketBlacklist.some((elem)=> elem === i)){
      bracketStart = i
      findCorrespondingCloseBracket()
    }

    const closeBracket = closeBrackets.indexOf(selectedChar)
    if(closeBracket > -1  && !bracketBlacklist.some((elem)=> elem === i)){
      bracketEnd = i
      findCorrespondingOpenBracket()
    }

    return new BracketPair(bracketStart, bracketEnd)
    
    function findCorrespondingCloseBracket() {
      const correspondingCloseBracket = closeBrackets[openBracket]
      for (let j = i; j < lineEndIdx; j++) {
        if (isWord(j)>-1){
          break
        }
        if (symbolArray[j] == correspondingCloseBracket  && !bracketBlacklist.some((elem)=> elem === j)) {
          bracketEnd = j
        }
      }
    }

    function findCorrespondingOpenBracket() {
      const correspondingOpenBracket = openBrackets[closeBracket]
      for (let j = i; j > lineStartIdx; j--) {
        if (isWord(j) > -1)
          break
        if (symbolArray[j] == correspondingOpenBracket  && !bracketBlacklist.some((elem)=> elem === j)) {
          bracketStart = j
        }
      }
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