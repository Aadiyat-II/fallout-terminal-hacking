import { useEffect, useReducer, type ReactNode } from "react"

import Header from "./components/Header/Header"
import Game from "./components/Game/Game"
import Lockout from "./components/Lockout/Lockout"
import TerminalEntry from "./components/TerminalEntry/TerminalEntry"

import  './App.css'
import { initialState, reducer } from "./reducer"
import LoginTransition from "./components/LoginTransition/LoginTransition"


function App() {
    const [ state, dispatch ] = useReducer(reducer, initialState);
        
    useEffect(()=>{
        dispatch({
            type: "reset"
        })
    }, []) 
    
    useEffect(()=>{
        if(state.gamePhase === "LOGGING_IN"){
            setTimeout(
                ()=>dispatch({
                        type: "login"
                    })
                , 1000)
        }
    }, [state.gamePhase])
    
    function reset(){
        dispatch({
            type: "reset"
        })
    }

    function handleMouseEnterSymbol(idx: number){
        dispatch({
            type: "mouse_entered",
            idx: idx
        })
    }
    
    function handleMouseLeaveSymbol(){
        dispatch({
            type: "mouse_left",
        })
    }

    function handleClick(idx: number){
        dispatch({
            type: "clicked",
            idx: idx
        })
    }

    let screen: ReactNode
  
    switch(state.gamePhase){
        case("PLAYING"):
            screen = <Game
                    handleClick={handleClick}
                    handleMouseEnterSymbol={handleMouseEnterSymbol}
                    handleMouseLeaveSymbol={handleMouseLeaveSymbol}
                    characterArray={state.characterArray}
                    highlightedSymbols={state.highlightedSymbols}
                    remainingAttempts={state.remainingAttempts}
                    logMessages={state.logMessages}
                    currentSelection={state.currentSelection}
                />
            break
        case("LOGGING_IN"):
            screen = <LoginTransition/>
            break
        case("ENTRY_GRANTED"):
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