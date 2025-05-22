import ColumnWrapper from '../ColumnWrapper/ColumnWrapper'
import RemainingAttempts from '../RemainingAttempts/RemaningAttempts'
import Character from '../Character/Character'
import GameLog from '../GameLog/GameLog'
import type { GameProps } from './GameInterfaces'

import './Game.css'

export default function Game(
	{ 
		handleMouseEnterSymbol,
		handleMouseLeaveSymbol,
		handleClick,
		characterArray,
		highlightedSymbols,
		remainingAttempts,
		logMessages,
		currentSelection
	}: GameProps
) {


  
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