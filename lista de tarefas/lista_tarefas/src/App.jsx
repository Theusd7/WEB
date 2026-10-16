import { useState } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [idEmEdicao, setIdEmEdicao] = useState(null)

  const adicionarTarefa = (e) => {
    e.preventDefault()
    const tarefaValida = novaTarefa.trim()

    if (!tarefaValida) {
      alert('Digite uma tarefa válida!')
      return
    }

    if (idEmEdicao === null) {
      const tarefa = {
        id: Date.now(),
        texto: tarefaValida,
        completa: false
      }

      setTarefas([...tarefas, tarefa])
    } else {
      const novasTarefas = tarefas.map((tarefa) =>
        tarefa.id === idEmEdicao
          ? { ...tarefa, texto: tarefaValida } : tarefa
      )

      setTarefas(novasTarefas)
    }
    setNovaTarefa('')
    setIdEmEdicao(null)
  }


  const editarTarefa = (tarefa) => {
    setIdEmEdicao(tarefa.id)
    setNovaTarefa(tarefa.texto)
  }

  const cancelarEdicao = () => {
    setNovaTarefa('')
    setIdEmEdicao(null)
  }

  const marcarCompleta = (id) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, completa: !tarefa.completa }
        : tarefa
    )

    setTarefas(novasTarefas)
  }

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />

        <button type="submit">
          {idEmEdicao === null ? 'Adicionar' : 'Salvar'}
        </button>

        {idEmEdicao !== null && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={idEmEdicao === tarefa.id ? 'em-edicao' : ''}
          >
            <span
              className={tarefa.completa ? 'completa' : ''}
            >
              {tarefa.texto}
            </span>

            <button
              type="button"
              onClick={() => editarTarefa(tarefa)}
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => removerTarefa(tarefa.id)}
              disabled={idEmEdicao === tarefa.id}
            >
              Remover
            </button>

            <button
              type="button"
              onClick={() => marcarCompleta(tarefa.id)}
            >
              {tarefa.completa ? 'Desmarcar' : 'Marcar como completa'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
