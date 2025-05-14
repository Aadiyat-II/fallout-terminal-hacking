import './App.css'
import Column from './components/Column/Column'
import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import { symbolArray } from './utils/symbolArray'

function App() {
  const numCols = 2
  const symbolsPerColumn = symbolArray.length/numCols

  function handleMouseEnter(colIdx: number, lineIdx: number, charIdx: number){
    let overallIdx = colIdx*symbolsPerColumn + lineIdx*16 + charIdx; // TODO: Fix Magic Number Use
    console.log(overallIdx)
  }

  const Columns = Array.from({ length: numCols }, (_, i) => <Column 
                                                                colSymbols={symbolArray.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}
                                                                handleMouseEnterColumn={(lineIdx:number, charIdx:number) => handleMouseEnter(i, lineIdx, charIdx)}
                                                              />)

  return (
    <>
      <div>
        <ColumnWrapper>
          {Columns}
        </ColumnWrapper>
      </div>
    </>
  )
}

export default App
