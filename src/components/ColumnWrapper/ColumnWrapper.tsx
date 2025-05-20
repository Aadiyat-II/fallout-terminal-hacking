import { useEffect, useState, type ReactNode } from "react";

import { numLines } from "../../utils/gameParameters";

import Column from "../Column/Column";
import HexAddressColumn from "../HexAddressColumn/HexAddressColumn";

import './ColumnWrapper.css';

export default function ColumnWrapper({ symbols  } : { symbols: ReactNode[] }){
    const [addresses, setAddresses] = useState<number[]>([])
    const numCols = 2
    const symbolsPerColumn = symbols.length/numCols

    useEffect(()=>{
        setAddresses(generateAddresses())
    }, [])

    function generateAddresses(){
        const byteSize = 8; //TODO: define bytesize elsewhere?
        let addresses = Array(numLines*numCols)

        const startingAddress = generateStartingAddress();

        for(let i=0; i<addresses.length; i++){
            addresses[i] = startingAddress+(i*byteSize);
        }

        return addresses;
    }

    function generateStartingAddress(){
        const byteSize = 8;
        const maxAddress = 0xFFFF - (numLines*numCols*byteSize)+byteSize;

        let startingAddress = Math.ceil(Math.random()*maxAddress);

        const remainder = startingAddress%byteSize;
        startingAddress = startingAddress - remainder; //Removing the remainder ensures the address is a multiple of 8

        return startingAddress;
    }


    const columns = Array.from(
        { length: numCols }, (_, i) => 
          <div className="column-pair">
            <HexAddressColumn addresses={addresses.slice(i*numLines, i*numLines+numLines)} />
            <Column 
              colSymbols={symbols.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}
            />
          </div>
    )
          
    return <div className="column-wrapper">{columns}</div>
}