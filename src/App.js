import React from 'react';
import Header from './Components/Header/Header';
import {Link} from 'react-router-dom';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header heading="Workspace" child={<ul className="topmenu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/dash">Grid</Link></li>
        <li><Link to="/mouseTracker">Render Props</Link></li>
        <li><Link to="/todo">To Do (Redux)</Link></li>
      </ul>}>

      </Header>
    </div>
  );
};

export default App;
