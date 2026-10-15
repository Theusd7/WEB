import { useState } from 'react'
import './App.css'
function App() {
  const [tarefas, setTarefas] = useState([])
  const [novaTarefa, setNovaTarefa] = useState('')

  const adicionarTarefa = () => {
    const tarefaValida = novaTarefa.trim()

    if (!tarefaValida) {
      alert('Digite uma tarefa válida!')
      return
    }

    const tarefa = {
      texto: tarefaValida,
      completa: false
    }

    setTarefas([...tarefas, tarefa])
    setNovaTarefa('')
  }

  const marcarcompleta = (index) => {
    const novasTarefas = [...tarefas]

    novasTarefas[index] = {
      ...novasTarefas[index],
      completa: !novasTarefas[index].completa
    }

    setTarefas(novasTarefas)
  }

  const removerTarefa = (index) => {
    setTarefas(tarefas.filter((_, indice) => indice !== index))
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma nova tarefa"
      />

      <button onClick={adicionarTarefa}>Adicionar</button>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: tarefa.completa ? 'line-through' : 'none'
              }}
            >
              {tarefa.texto}
            </span>

            <button onClick={() => removerTarefa(index)}>
              Remover
            </button>

            <button onClick={() => marcarcompleta(index)}>
              {tarefa.completa ? 'Desmarcar' : 'Marcar como completa'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App