import React from 'react';
import Header from './Components/Header';
import Grid from './Components/Grid';
import HeaderList from '././Datastore/tableHeaders';
import PropTable from '././Datastore/tableData';
import NewRow from '././Datastore/newRow';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Grid headers={HeaderList.propTable} tableData={PropTable} newRow={NewRow}></Grid>
    </div>
  );
}

export default App;
