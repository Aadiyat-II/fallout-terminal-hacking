import './App.css'
import Column from './components/Column/Column'
import ColumnWrapper from './components/ColumnWrapper/ColumnWrapper'
import { symbolArray } from './utils/symbolArray'
function App() {
  const numCols = 2
  const symbolsPerColumn = symbolArray.length/numCols

  const Columns = Array.from({ length: numCols }, (_, i) => <Column colSymbols={symbolArray.slice(i*symbolsPerColumn, i*symbolsPerColumn + symbolsPerColumn)}/>)

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
