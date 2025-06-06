import './GameLog.css'

export default function GameLog( { messages, currentSelection } : { messages : string[], currentSelection: string}){
    const maxMessagesShown = 15
    const formattedMessages  = messages.slice(-maxMessagesShown).map((message, _) => <LogEntry message={message}/>)
    
    return  <div className="game-log">
                <div>&gt;{currentSelection}</div>
                <div>
                    {formattedMessages}
                </div>
            </div>
}

function LogEntry({ message } : { message : string }){
    return  <p className='log-entry'>&gt;{message}</p>
}