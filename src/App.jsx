import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { useState } from 'react'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {

    if (input === '') {
      alert("Preencha um CEP")
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      
      if (response.data.erro) {
        alert("Ops!! CEP informado não encontrado.")
        setInput('')
        return;
      }

      setCep(response.data)
      const btn = document.querySelector('button.btnLimpar')
      btn.style.display = "block"
      
      setInput('')

    } catch {
      alert("Ops!! erro ao buscar CEP")
      setInput('')
    }

  }

  function cleanMain() {
    setCep('')
    const btn = document.querySelector('button.btnLimpar')
    btn.style.display = ""

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input type='text'
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>


      {Object.keys(cep).length > 0 && (

        <main className='main'>

          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.logradouro} - {cep.uf}</span>
        </main>
      )
      }

      <button className='btnLimpar' onClick={cleanMain}>Limpar</button>


    </div>
  );
}

export default App;
