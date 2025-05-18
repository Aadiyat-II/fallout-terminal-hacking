import './GameLog.css'

export default function GameLog( { messages } : { messages : string[]}){
    const maxMessagesShown = 10
    const formattedMessages  = messages.slice(-maxMessagesShown).map((message, _) => <LogEntry message={message}/>)
    
    return  <div className="game-log">
                <div>
                    {formattedMessages}
                </div>
            </div>
}

function LogEntry({ message } : { message : string }){
    return  <p className='log-entry'>&gt;{message}</p>
}