
import { useEffect, useState } from 'react'

import { wordLength, symbolsPerLine, totalTries, triesResetProbablity, candidateWords, numWords, chunkLength, symbolArrayLength, miscSymbols } from '../../utils/gameParameters'
import  shuffle  from '../../utils/shuffle'
import compareStrings from '../../utils/compareStrings'
import BracketPair from '../../utils/BracketPair'
import getRandomInt from '../../utils/getRandomInt'

import ColumnWrapper from '../ColumnWrapper/ColumnWrapper'
import RemainingAttempts from '../RemainingAttempts/RemaningAttempts'
import Character from '../Character/Character'
import { highlightedSymbolClassName } from '../Character/CharacterTypes'
import GameLog from '../GameLog/GameLog'

import './Game.css'

export default function Game({ gameWon, gameLost }: { gameWon : CallableFunction, gameLost: CallableFunction }) {
	const [ highlightedSymbols, setHighlightedSymbols ] = useState<string[]>(Array.from({length:symbolArrayLength}, (_)=> ""))
	const [ remainingAttempts, setRemainingAttempts ] = useState<number>(totalTries)
	const [ bracketBlacklist, setBracketBlacklist] = useState<number[]>([0])
	const [ characterArray, setCharacterArray ] = useState<string[]>([])
	const [ logMessages, setLogMessages ] = useState<string[]>([])
	const [ currentSelection, setCurrentSelection ] = useState<string>('|')
	const [ selectedWords, setSelectedWords] = useState<string[]>([])
	const [ wordStartIndices, setWordStartIndices ] = useState<number[]>([])
	const [ password, setPassword ] = useState<string>('')
	
	useEffect(()=>{
		setUpGame()
	}, [])

	function setUpGame(){
		const selectedWords = shuffle([...candidateWords]).slice(0, numWords)
		const wordStartIndices = Array.from({ length: numWords }, (_, i) => i * chunkLength + getRandomInt(0, chunkLength - wordLength - 1))
		const charArray = fillCharacterArray(selectedWords, wordStartIndices)
		const password = selectedWords[getRandomInt(0, selectedWords.length)]

		setSelectedWords(selectedWords)
		setWordStartIndices(wordStartIndices)
		setCharacterArray(charArray)
		setPassword(password)
	}

	function fillCharacterArray(selectedWords: string[], wordStartIndices: number[]) {
		const rawChars = Array.from({length: symbolArrayLength}, ()=>'')
		// Enter each word starting from the corresponding start index
		selectedWords.forEach((word: string, idx: number) => {
			const startIdx = wordStartIndices[idx];
			const chars = word.split('');
	
			for (let i = 0; i < wordLength; i++) {
				rawChars[startIdx + i] = chars[i];
			}
		});
	
		// Fill the rest of the symbol array with random misc symbols
		for (let i = 0; i < symbolArrayLength; i++) {
			if (rawChars[i])
				continue;
			rawChars[i] = miscSymbols[getRandomInt(0, miscSymbols.length)];
		}

		return rawChars
	}

	

  	function handleClick(idx: number){
		if(remainingAttempts){
			let wordIdx = isWord(idx)
			let bracketPair = findCorrespondingBracketIfAny(idx);

			if(wordIdx>-1){
				checkGuess(wordIdx)
			}
			else if(bracketPair.valid){
				giveReward(bracketPair)
				setBracketBlacklist([...bracketBlacklist, bracketPair.start, bracketPair.end])
			}
			else{
				logSymbolSelection()
			}
		}
  
	
		function checkGuess(word: number) {
			const guess = selectedWords[word]
			const numMatches = compareStrings(password, guess)
			
			const newMessages= [guess]
			
			if(numMatches === wordLength){
				newMessages.push("Entry Granted")
				setTimeout(()=>gameWon(), 500);
			}
			else{
				newMessages.push("Entry Denied.")
				const nextRemainingAttempts = remainingAttempts-1
				setRemainingAttempts(nextRemainingAttempts)
				if(!nextRemainingAttempts){
					gameLost();
				}
			}
			newMessages.push(`Likeness=${numMatches}`)
			
			pushLogMessages(newMessages)
		}


		function giveReward(bracketPair: BracketPair){
			const newMessages = [bracketPair.selection]
			
			if(Math.random() < triesResetProbablity){
				resetTries()
				newMessages.push("Reset Tries.")
			}
			else{
				removeDud()
				newMessages.push("Remove dud.")
			}

			pushLogMessages(newMessages)
		}
	

		function resetTries(){
			

			setRemainingAttempts(totalTries)
		}
	

		function removeDud(){
			const duds = Array.from(
				selectedWords, 
				(elem, i) => {
					if(elem != password)
						return i;
				}
			).filter(i => i !=undefined)
		
			if(!duds.length)
				return

			const wordToRemoveIdx = duds[getRandomInt(0, duds.length)]
		
			const nextSymbolArray = [...characterArray]
			const wordStart  = wordStartIndices[wordToRemoveIdx]
		
			for(let i = wordStart; i < wordStart + wordLength; i++){
				nextSymbolArray[i] = '.'
			}
		
			selectedWords.splice(wordToRemoveIdx, 1)
			wordStartIndices.splice(wordToRemoveIdx, 1)
		
			setCharacterArray(nextSymbolArray)
		}


		function logSymbolSelection() {
			pushLogMessages([
				characterArray[idx],
				"ERROR"
			])
		}
	}


	function handleMouseEnterSymbol(idx: number){
		let nextHighlightedSymbols = Array.from(characterArray, (_)=> "")
		
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
			setCurrentSelection(characterArray.slice(wordStart, wordStart+wordLength).join(''))
		}


		function highlightBracketPair() {
			for (let i = bracketPair.start; i <= bracketPair.end; i++) {
				nextHighlightedSymbols[i] = highlightedSymbolClassName
			}
			setCurrentSelection(bracketPair.selection)
		}


		function highlightSymbol() {
			nextHighlightedSymbols[idx] = highlightedSymbolClassName
			setCurrentSelection(characterArray[idx])
		}
	}


	function handleMouseLeaveSymbol(){
		const nextHighlightedSymbols = Array.from(characterArray, (_)=> "")
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

		const selectedChar = characterArray[selectedSymbolIdx]
		
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
		
		return new BracketPair(bracketStart, bracketEnd, characterArray.slice(bracketStart, bracketEnd + 1).join(''))
		

		function findChar(char: string, searchStart: number, searchEnd: number) {
			let loc = -1
		
			for(let j = searchStart; j < searchEnd; j++){
				if (characterArray[j] === char  && !bracketBlacklist.some((elem)=> elem === j)) {
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

	function pushLogMessages(messages: string[]){
		const nextLogMessages = [...logMessages]
		messages.forEach((message)=>nextLogMessages.push(message))
		setLogMessages(nextLogMessages)
	}

  
  	const symbols = characterArray.map((sym, i) => <Character  
		symbol={sym}
		handleMouseEnter={()=>handleMouseEnterSymbol(i)}
		handleMouseLeave={()=>handleMouseLeaveSymbol()}
		handleClick={()=>handleClick(i)}
		className={highlightedSymbols[i]}
	/>)

  	return (
		<>
			<p>PASSWORD REQUIRED</p>
			<RemainingAttempts remainingAttempts={remainingAttempts}/>
			<div className='game-board'>
				<ColumnWrapper symbols={symbols}/>
				<GameLog messages={logMessages} currentSelection={currentSelection}/>
			</div>
		</>
	)	
}