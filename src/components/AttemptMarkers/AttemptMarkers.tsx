import './AttemptMarkers.css'

export default function AttemptMarkers({ remainingAttempts } : { remainingAttempts: number}){
    return <div className='attempt-markers'>{Array.from({length:remainingAttempts}, (v, i)=><AttemptMarker/>)}</div>
}

function AttemptMarker(){
    return <span className="attempt-marker">_</span>
}