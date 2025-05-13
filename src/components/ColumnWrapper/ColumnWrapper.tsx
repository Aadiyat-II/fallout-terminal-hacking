import type { ReactNode } from "react";
import './ColumnWrapper.css';

export default function ColumnWrapper({ children } : { children: ReactNode }){
    return <div className="column-wrapper">{children}</div>
}