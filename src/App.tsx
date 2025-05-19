import { useState } from 'react'

import { rawSymbols, wordStartIndices, wordLength, password, selectedWords, symbolsPerLine, totalTries, triesResetProbablity } from './utils/setUpGame'
import compareStrings from './utils/compareStrings'
import BracketPair from './utils/BracketPair'
import { getRandomInt } from './utils/getRandomInt'

import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import RemainingAttempts from './components/RemainingAttempts/RemaningAttempts'
import Character from './components/Character/Character'
import { highlightedSymbolClassName } from './components/Character/CharacterTypes'

import './App.css'
import GameLog from './components/GameLog/GameLog'

function App() {
  const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(Array.from(rawSymbols, (_)=> ""))
  const [ remainingAttempts, setRemainingAttempts ] = useState<number>(totalTries)
  const [ bracketBlacklist, setBracketBlacklist] = useState<number[]>([0])
  const [ symbolArray, setSymbolArray ] = useState<string[]>(rawSymbols)
  const [ logMessages, setLogMessages ] = useState<string[]>([])
  const [ currentSelection, setCurrentSelection ] = useState<string>('|')

  
  function handleClick(idx: number){
    if(remainingAttempts){
      let wordIdx = isWord(idx)
      let bracketPair = findCorrespondingBracketIfAny(idx);

      if(wordIdx>-1){
        checkGuess(wordIdx)
      }
      else if(bracketPair.valid){
        logBracketSelection(bracketPair)
        giveReward()
        setBracketBlacklist([...bracketBlacklist, bracketPair.start, bracketPair.end])
      }
      else{
        logSymbolSelection()
      }
    }
  
    
    function checkGuess(word: number) {
      const guess = selectedWords[word]
      const numMatches = compareStrings(password, guess)
      const nextLogMessages = [...logMessages]
      nextLogMessages.push(guess)
      nextLogMessages.push(`Likeness=${numMatches}`)
      
      if(numMatches === wordLength){
        nextLogMessages.push("Access Granted!")
      }
      else{
        setRemainingAttempts(remainingAttempts-1)
        nextLogMessages.push("Access Denied.")
      }
      
      setLogMessages(nextLogMessages)
    }
    

    function logBracketSelection(bracketPair: BracketPair) {
      const nextLogMessages = [...logMessages]
      nextLogMessages.push(bracketPair.selection)
      setLogMessages(nextLogMessages)
    }
    

    function giveReward(){
      if(Math.random() < triesResetProbablity){
        resetTries()
      }
      else{
        removeDud()
      }
    }
  

    function resetTries(){
      logMessages.push("Reset Tries!")
      setRemainingAttempts(totalTries)
    }
  

    function removeDud(){
      const duds = Array.from(selectedWords, (elem, i) => {
        if(elem != password)
          return i;
      }).filter(i => i !=undefined)
  
      if(!duds.length)
        return
  
      logMessages.push("Remove dud!")
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


    function logSymbolSelection() {
      const nextLogMessages = [...logMessages]
      nextLogMessages.push(symbolArray[idx])
      nextLogMessages.push("ERROR")
      setLogMessages(nextLogMessages)
    }
  }


  function handleMouseEnterSymbol(idx: number){
    let nextHighlightedSymbols = Array.from(symbolArray, (_)=> "")
    
    let wordIdx = isWord(idx)
    let bracketPair = findCorrespondingBracketIfAny(idx);

    if(wordIdx>-1){
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
      const wordStart = wordStartIndices[wordIdx]
      for (let i = wordStart; i < wordStart + wordLength; i++) {
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
      setCurrentSelection(symbolArray.slice(wordStart, wordStart+wordLength).join(''))
    }


    function highlightBracketPair() {
      for (let i = bracketPair.start; i <= bracketPair.end; i++) {
        nextHighlightedSymbols[i] = highlightedSymbolClassName
      }
      setCurrentSelection(bracketPair.selection)
    }


    function highlightSymbol() {
      nextHighlightedSymbols[idx] = highlightedSymbolClassName
      setCurrentSelection(symbolArray[idx])
    }
  }


  function handleMouseLeaveSymbol(){
    const nextHighlightedSymbols = Array.from(symbolArray, (_)=> "")
    setHighlightedSymbols(nextHighlightedSymbols)
    setCurrentSelection('|')
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

    if (hasWordBetween(bracketStart, bracketEnd)){
      return new BracketPair(-1, -1)
    }
    
    return new BracketPair(bracketStart, bracketEnd, symbolArray.slice(bracketStart, bracketEnd + 1).join(''))
    

    function findChar(char: string, searchStart: number, searchEnd: number) {
      let loc = -1
 
      for(let j = searchStart; j < searchEnd; j++){
        if (symbolArray[j] === char  && !bracketBlacklist.some((elem)=> elem === j)) {
          loc = j
          break
        } 
      }
     
      return loc
    }


    function hasWordBetween(start: number, end: number){
      return wordStartIndices.some((val)=>val >= start && val < end)
    }
  }

  
  const symbols = symbolArray.map((sym, i) => <Character  
      symbol={sym}
      handleMouseEnter={()=>handleMouseEnterSymbol(i)}
      handleMouseLeave={()=>handleMouseLeaveSymbol()}
      handleClick={()=>handleClick(i)}
      className={highlightedSymbols[i]}
    />
  )

  return (
    <>
      <RemainingAttempts remainingAttempts={remainingAttempts}/>
      <div className='game-board'>
        <ColumnWrapper symbols={symbols}/>
        <GameLog messages={logMessages} currentSelection={currentSelection}/>
      </div>
    </>
  )
}

export default App