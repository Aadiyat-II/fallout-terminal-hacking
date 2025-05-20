import { useState, type ReactNode } from "react"

import Game from "./components/Game/Game"
import Lockout from "./components/Lockout/Lockout"

import  './App.css'
import TopSecretFiles from "./components/TopSecretFiles/TopSecretFiles"

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
            screen = <TopSecretFiles reset={reset}/>
            break
        case("LOCKED_OUT"):
            screen = <Lockout reset={reset}></Lockout>
            break
    }

    return (
        <>
            <div className="app">
                <div className="main-screen">
                    {screen}
                </div>
            </div>
        </>
    )
}

export default App