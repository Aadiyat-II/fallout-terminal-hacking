import './Lockout.css'

export default function Lockout({ reset } : { reset : CallableFunction }){
    return  <>
                <p>LOCKED OUT</p>
                <button onClick={()=>reset()}>&gt; RESTART</button>
            </>
}