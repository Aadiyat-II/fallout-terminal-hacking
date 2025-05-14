import type { ReactNode } from "react";

export default function Line({ lineChars} : { lineChars: ReactNode[] }){
    return (<p>
        {lineChars}
    </p>)
}