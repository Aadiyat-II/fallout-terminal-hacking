import type { ReactNode } from "react";

export default function Line({ lineChars} : { lineChars: ReactNode[], }){
    return (<p>
        {lineChars}
    </p>)
}
// Okay, here's an idea. Instead of the Line formatting each character, which involves a lot of passing props back and forth,
// Why not just have formatted characters sent to the Column and Line components as child nodes?
// This Line component doesn't even do what it claims to do. It's formatting each Char, not just acting as a line.