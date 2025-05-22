import { candidateWords, chunkLength, numWords, characterArrayLength, symbolsPerLine, totalTries, triesResetProbablity, wordLength, miscSymbols } from "./utils/gameParameters"
import BracketPair from "./utils/BracketPair"
import compareStrings from "./utils/compareStrings"
import getRandomInt from "./utils/getRandomInt"
import shuffle from "./utils/shuffle"
import { highlightedSymbolClassName } from "./components/Character/CharacterTypes"

export type GameState = {
    selectedWords: string[],
    wordStartIndices: number[],
    password: string,
    characterArray: string[],
    remainingAttempts: number
    usedBrackets: number[],
    currentSelection: string,
    highlightedSymbols: string[],
    logMessages: string[],
    gamePhase: "PLAYING" | "LOGGING_IN" | "ENTRY_GRANTED" | "LOCKED_OUT"
}

export type Action = {
    type: "mouse_entered",
    idx: number
} |
{
    type: "mouse_left",
} | 
{
    type: "clicked",
    idx: number
} |
{
    type: "reset"
} | 
{ 
    type: "login"
}

interface SelectionRange{
    start: number,
    end: number
}

export const initialState: GameState = {
    selectedWords: [],
    wordStartIndices: [],
    password: "",
    characterArray: [],
    remainingAttempts: totalTries,
    usedBrackets: [],
    currentSelection: "|" ,
    highlightedSymbols: Array(numWords).fill(""),
    logMessages: [],
    gamePhase: "PLAYING"
}

export function reducer(state: GameState, action: Action): GameState{
    switch(action.type){
        case("mouse_entered"): {
            const selectionRange = getSelectionRange(state, action.idx);
            return {
                ...state,
                highlightedSymbols: getHighlightedSymbols(selectionRange),
                currentSelection: state.characterArray.slice(selectionRange.start, selectionRange.end).join('')
            }
        }
        case("mouse_left"): {
            return {
                ...state,
                highlightedSymbols: Array(numWords).fill(""),
                currentSelection: '|'
            }
        }

        case("clicked"): {
            const parentWordIdx = getParentWord(state.wordStartIndices, action.idx)
            if(parentWordIdx > - 1){
                const guess = state.selectedWords[parentWordIdx]
                return checkGuess(state, guess)
            }

            const bracketPair = findCorrespondingBracketIfAny(state, action.idx)
            if(bracketPair.valid){
                return giveReward(state, bracketPair);
            }


            return {
                ...state,
                logMessages: [...state.logMessages, state.characterArray[action.idx], "ERROR"]
            }
        }

        case("reset"): {
            const selectedWords = shuffle([...candidateWords]).slice(0, numWords)
            const wordStartIndices = Array.from({ length: numWords }, (_, i) => i * chunkLength + getRandomInt(0, chunkLength - wordLength - 1))
            
            return{
                ...initialState,
                selectedWords: selectedWords,
                wordStartIndices: wordStartIndices,
                characterArray: fillCharacterArray(selectedWords, wordStartIndices),
                password: selectedWords[getRandomInt(0, selectedWords.length)],
                gamePhase: "PLAYING"
            }
        }
        case("login") : {
            return {
                ...state,
                gamePhase: "ENTRY_GRANTED"
            }
        }
    }


    function getHighlightedSymbols(selectionRange: { start: number; end: number }): string[] {
        return  Array.from({ length: characterArrayLength}, (_, i) => {
            if (i >= selectionRange.start && i < selectionRange.end) {
                return highlightedSymbolClassName
            }
            else {
                return ""
            }
        })
    }
}


function getSelectionRange(state: GameState, idx: number): SelectionRange{
    /* Given an array of characters, and the idx of the character the mouse is hovering over,
    it returns the start and end indices of the whole selection. That is if the mouse is hovering over a character that
    belongs to a whole word, it will give the start and end indices of the whole word. If the mouse is hovering over a matching
    pair of brakcets, it will give the indices for a matching pair of brackets. */
   
    const parentWordIdx = getParentWord(state.wordStartIndices, idx)
    if(parentWordIdx > -1){
        return {
            start: state.wordStartIndices[parentWordIdx],
            end: state.wordStartIndices[parentWordIdx] + wordLength
        }
    }

    const bracketPair = findCorrespondingBracketIfAny(state, idx)
    if(bracketPair.valid){
        return {
            start: bracketPair.start,
            end: bracketPair.end + 1
        }
    }
        
    return {
        start: idx,
        end: idx + 1,
    }
}


function checkGuess(state: GameState, guess: string): GameState {
    const numMatches = compareStrings(state.password, guess)
    let newMessages= [
        guess,
        `Likeness=${numMatches}`
    ]
    let nextRemainingAttempts  = state.remainingAttempts - 1
    let nextPhase = state.gamePhase
    if(numMatches === wordLength){
        newMessages = [...newMessages, 
            "Entry Granted",
            "Loggin in..."]
        nextPhase = "LOGGING_IN"
    }

    else{
        newMessages.push("Entry Denied.")
        if(!nextRemainingAttempts){
            nextPhase = "LOCKED_OUT"
        }
    }
    
    return {
        ...state,
        remainingAttempts: nextRemainingAttempts,
        logMessages: [...state.logMessages, ...newMessages],
        gamePhase: nextPhase
    }
}


function giveReward(state: GameState, bracketPair: BracketPair): GameState{
    
    if(Math.random() < triesResetProbablity){
        return resetTries(state, bracketPair)
    }
    else{
        return removeDud(state, bracketPair)
    }
    
    
    function resetTries(state: GameState, bracketPair: BracketPair): GameState{
        const selection = state.characterArray.slice(bracketPair.start, bracketPair.end + 1).join('')
        const newMessages = [
            selection,
            "Reset Tries."
        ]

        return {
            ...state,
            remainingAttempts: totalTries,
            logMessages: [...state.logMessages, ...newMessages],
            usedBrackets: [...state.usedBrackets, bracketPair.start, bracketPair.end]
        }
    }
    
    function removeDud(state: GameState, bracketPair: BracketPair): GameState{
        const selection = state.characterArray.slice(bracketPair.start, bracketPair.end + 1).join('')
        const newMessages = [
            selection,
            "Remove dud."
        ]
    
        const duds = Array.from(
            state.selectedWords, 
            (elem, i) => {
                if(elem != state.password)
                    return i;
            }
        ).filter(i => i !=undefined)
        
        if(!duds.length)
            return {
                ...state,
                logMessages: [...state.logMessages, ...newMessages],
               usedBrackets: [...state.usedBrackets, bracketPair.start, bracketPair.end]
            }
        
    
        const wordToRemoveIdx = duds[getRandomInt(0, duds.length)]
    
        const nextCharacterArray = [...state.characterArray]
        const wordStart  = state.wordStartIndices[wordToRemoveIdx]

        for(let i = wordStart; i < wordStart + wordLength; i++){
            nextCharacterArray[i] = '.'
        }
        
        const nextSelectedWords = [...state.selectedWords]
        nextSelectedWords.splice(wordToRemoveIdx, 1)

        const nextWordStartIndices = [...state.wordStartIndices]
        nextWordStartIndices.splice(wordToRemoveIdx, 1)

        return {
            ...state,
            characterArray: nextCharacterArray,
            selectedWords: nextSelectedWords,
            wordStartIndices: nextWordStartIndices,
            logMessages: [...state.logMessages, ...newMessages],
            usedBrackets: [...state.usedBrackets, bracketPair.start, bracketPair.end]
        }
    }
}


function getParentWord(wordStartIndices: number[], idx: number): number{
    /* Checks if the selected character belongs to a whole word
    Returns index of the word it belongs to or -1 if it does not belong to any word */
    return wordStartIndices.findIndex((wordStartIndex)=> idx>= wordStartIndex && idx < wordStartIndex + wordLength)
}


function findCorrespondingBracketIfAny(state: GameState, idx: number): BracketPair{
    /* Checks if the selected character is part of a pair of matching brackets
    The selected character could either be an open brack or a close bracket
    The matching brackets must be of the same type and appear on the same line
    If a whole word appears between the brackets, it is not considered a matching pair
    */
    const openBrackets = ['<', '(', '{', '[']
    const closeBrackets = ['>', ')', '}', ']']

    const lineStartIdx =   Math.floor(idx / symbolsPerLine)*symbolsPerLine
    const lineEndIdx = lineStartIdx +  symbolsPerLine

    const selectedChar = state.characterArray[idx]
    
    let bracketStart = -1
    let bracketEnd = -1

    const selectedOpenBracket = openBrackets.indexOf(selectedChar)
    if(selectedOpenBracket > -1 && !bracketAlreadyUsed()){
        bracketStart = idx
        bracketEnd = findChar(closeBrackets[selectedOpenBracket], idx, lineEndIdx)
    }

    const selectedCloseBracket = closeBrackets.indexOf(selectedChar)
    if(selectedCloseBracket > -1  && !bracketAlreadyUsed()){
        bracketEnd = idx
        bracketStart = findChar(openBrackets[selectedCloseBracket], lineStartIdx, idx)
    }

    if (hasWordBetween(bracketStart, bracketEnd)){
        return new BracketPair(-1, -1)
    }
    
    return new BracketPair(bracketStart, bracketEnd)
    

    function bracketAlreadyUsed(): boolean {
        return state.usedBrackets.some((elem) => elem === idx)
    }

    function findChar(char: string, searchStart: number, searchEnd: number): number {
        let loc = -1
    
        for(let j = searchStart; j < searchEnd; j++){
            if (state.characterArray[j] === char  && !state.usedBrackets.some((elem)=> elem === j)) {
                loc = j
                break
            } 
        }
    
        return loc
    }

    function hasWordBetween(start: number, end: number): boolean{
        return state.wordStartIndices.some((val)=>val >= start && val < end)
    }
}

function fillCharacterArray(selectedWords: string[], wordStartIndices: number[]): string[] {
    const rawChars = Array.from({length: characterArrayLength}, ()=>'')
    // Enter each word starting from the corresponding start index
    selectedWords.forEach((word: string, idx: number) => {
        const startIdx = wordStartIndices[idx];
        const chars = word.split('');

        for (let i = 0; i < wordLength; i++) {
            rawChars[startIdx + i] = chars[i];
        }
    });

    // Fill the rest of the symbol array with random misc symbols
    for (let i = 0; i < characterArrayLength; i++) {
        if (rawChars[i])
            continue;
        rawChars[i] = miscSymbols[getRandomInt(0, miscSymbols.length)];
    }

    return rawChars
}