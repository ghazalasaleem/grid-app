import React from 'react';
import Header from './Components/Header/Header';
import {Link} from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header heading="Application" child={<ul className="topmenu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/dash">Grid</Link></li>
      </ul>}></Header>
      
    </div>
  );
}

export default App;
