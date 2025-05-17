import './RemainingAttempts.css'

export default function RemainingAttempts({ remainingAttempts } : { remainingAttempts: number}){
    return <div className="remaining-attempts">Attempt(s) Remaining: {Array.from({length:remainingAttempts}, (v, i)=><AttemptMarker/>)}</div>
}

function AttemptMarker(){
    return <span className="attempt-marker">_</span>
}