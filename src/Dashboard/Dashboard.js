import React from 'react';
import Header from '../Components/Header';
import Grid from '../Components/Grid/Grid';
import TableConfig from './../Datastore/tableConfig';
import TableData from './../Datastore/data';
// import NewRow from '../Datastore/newRow';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header></Header>
      <Grid configData={TableConfig} dataList={TableData}></Grid>      
    </div>
  );
}
export default Dashboard;