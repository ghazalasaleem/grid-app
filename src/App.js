import React from 'react';
import Header from './Components/Header';
import Grid from './Components/Grid'
import HeaderList from '././Datastore/tableHeaders'
import PropTable from '././Datastore/tableData'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Grid headers={HeaderList.propTable} tableData={PropTable}></Grid>
    </div>
  );
}

export default App;
