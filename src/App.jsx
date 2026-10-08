import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [desbloqueados, setDesbloqueados] = useState([])

  const clicar = () => {
    const novo = count + 1
    setCount(novo)
    setDesbloqueados([...desbloqueados, novo])
  } 
  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={clicar}
        >
          Contador esta em: {count}
        </button>
      </section>
      <ul>
          {desbloqueados.map((numero) => (
            <li key={numero}>{numero}</li>
          ))}
        </ul>
    </>
  )
}
export default App
