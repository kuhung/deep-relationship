import { Routes, Route } from 'react-router-dom'
import GraphView from '@/views/GraphView'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GraphView />} />
      </Routes>
    </div>
  )
}

export default App
