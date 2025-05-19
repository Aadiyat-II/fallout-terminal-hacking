export default function Lockout({ reset } : { reset : CallableFunction }){
    return <div className="lockout">
                <p>LOCKED OUT</p>
                <button onClick={()=>reset()}>&gt; RESTART</button>
            </div>
}