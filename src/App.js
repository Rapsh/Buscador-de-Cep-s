import React from "react"
import { useState } from "react"
import { FaFly } from "react-icons/fa";
import "./style.css";
import api from "./services/api";

const App = () => {

  const [input, setInput] = useState('')
  const [cep, setCEP] = useState({});
  document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
      const buttonWithEnterPress = document.querySelector("#search");

      buttonWithEnterPress.click();
    }});


  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCEP(response.data)
      setInput("");
    } catch {
      alert("OPS! Digite um CEP correto.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <header className="container-header">
        <h1 className="title">Buscador de CEP</h1>
      </header>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch"
          onClick={handleSearch} 
          autoFocus
          id="search"
          >
          <FaFly size={20} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
