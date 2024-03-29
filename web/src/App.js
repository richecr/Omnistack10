import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Três conceitos do React:
/*
  Componentes:
    * Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
  Propriedades:
    * Informações que um componente PAI passa para o componente FILHO.
  Estados:
    * Informações mantidas pelo componente (Lembrar: Imutabilidade).
*/

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleSubmitAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data.dev]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmitAddDev}/>
      </aside>
      
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
