import { useState, type ReactNode } from "react"

import Header from "./components/Header/Header"
import Game from "./components/Game/Game"
import Lockout from "./components/Lockout/Lockout"
import TerminalEntry from "./components/TerminalEntry/TerminalEntry"

import  './App.css'

type GameState = "PLAYING" | "ACCESS_GRANTED" | "LOCKED_OUT"

function App() {
    const [ gameState, setGameState ] = useState<GameState>("PLAYING")
  
    function gameWon(){
        setGameState("ACCESS_GRANTED")
    }
  
    function gameLost(){
        setGameState("LOCKED_OUT")
    }
  
    function reset(){
        setGameState("PLAYING")
    }

    let screen: ReactNode
  
    switch(gameState){
        case("PLAYING"):
            screen = <Game gameWon={gameWon} gameLost={gameLost}/>
            break
        case("ACCESS_GRANTED"):
            screen = <TerminalEntry reset={reset}/>
            break
        case("LOCKED_OUT"):
            screen = <Lockout reset={reset}></Lockout>
            break
    }

    return (
        <div className="app">
            <Header/>
            <div className="contents">
                {screen}
            </div>
        </div>
    )
}

export default App