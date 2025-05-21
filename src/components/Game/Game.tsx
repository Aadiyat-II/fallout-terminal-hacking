
import { useEffect, useReducer } from 'react'

import ColumnWrapper from '../ColumnWrapper/ColumnWrapper'
import RemainingAttempts from '../RemainingAttempts/RemaningAttempts'
import Character from '../Character/Character'
import GameLog from '../GameLog/GameLog'

import './Game.css'
import { initialState, reducer } from '../../reducer'

export default function Game(
	// { gameWon, gameLost }: { gameWon : CallableFunction, gameLost: CallableFunction }
) {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	
	useEffect(()=>{
		dispatch({
			type: "reset",
			idx: -1
		})
	}, [])

	useEffect(()=>{
		
	})

	function handleMouseEnterSymbol(idx: number){
		dispatch({
			type: "mouse_entered",
			idx: idx
		})
	}
	
	function handleMouseLeaveSymbol(){
		dispatch({
			type: "mouse_left",
			idx: -1,
		})
	}

	function handleClick(idx: number){
		dispatch({
			type: "clicked",
			idx: idx
		})
	}
  
  	const symbols = state.characterArray.map((sym, i) => <Character  
		symbol={sym}
		handleMouseEnter={()=>handleMouseEnterSymbol(i)}
		handleMouseLeave={()=>handleMouseLeaveSymbol()}
		handleClick={()=>handleClick(i)}
		className={state.highlightedSymbols[i]}
	/>)

  	return (
		<>
			<p>PASSWORD REQUIRED</p>
			<RemainingAttempts remainingAttempts={state.remainingAttempts}/>
			<div className='game-board'>
				<ColumnWrapper symbols={symbols}/>
				<GameLog messages={state.logMessages} currentSelection={state.currentSelection}/>
			</div>
		</>
	)	
}