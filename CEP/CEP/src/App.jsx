
import { useState } from 'react'
import './App.css'

function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const buscarCep = async (e) => {
    e.preventDefault()

    const cepFormatado = cep.replace(/\D/g, '')

    setEndereco(null)
    setErro('')

    if (cepFormatado.length !== 8) {
      setErro('Digite um CEP com 8 numeros')
      return
    }

    setCarregando(true)

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)

      if (!resposta.ok) {
        throw new Error('Erro ao buscar CEP')
      }

      const dados = await resposta.json()

      if (dados.erro) {
        throw new Error('CEP nao encontrado')
      }

      setEndereco(dados)

    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="container">
      <h1>Buscar CEP</h1>

      <form onSubmit={buscarCep}>
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={9}
        />

        <button type="submit">
          Pesquisar
        </button>
      </form>

      {carregando && <p>Carregando...</p>}

      {erro && <p className="erro">{erro}</p>}

      {endereco && (
        <div className="resultado">
          <h2>Endereco encontrado</h2>

          <p>CEP: {endereco.cep}</p>
          <p>Rua: {endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Cidade: {endereco.localidade}</p>
          <p>Estado: {endereco.uf}</p>
        </div>
      )}
    </div>
  )
}

export default App
