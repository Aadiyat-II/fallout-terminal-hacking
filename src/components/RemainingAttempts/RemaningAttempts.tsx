import './RemainingAttempts.css'

export default function RemainingAttempts({ remainingAttempts } : { remainingAttempts: number}){
    return <div className="remaining-attempts">Attempt(s) Remaining: {Array.from({length:remainingAttempts}, ()=><AttemptMarker/>)}</div>
}

function AttemptMarker(){
    return <span className="attempt-marker">__</span>
}