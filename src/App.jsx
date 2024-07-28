import React, { useState } from 'react';
import './App.css';
import AddPerson from './components/AddPerson';
import RetrieveInformation from './components/RetrieveInformation';

function App() {
  const [tab, setTab] = useState('add');

  return (
    <div className="App">
      <header>
        <button className={tab === 'add' ? 'active' : ''} onClick={() => setTab('add')}>Add New Person</button>
        <button className={tab === 'retrieve' ? 'active' : ''} onClick={() => setTab('retrieve')}>Retrieve Information</button>
      </header>
      <main>
        {tab === 'add' && <AddPerson />}
        {tab === 'retrieve' && <RetrieveInformation />}
      </main>
    </div>
  );
}

export default App;
