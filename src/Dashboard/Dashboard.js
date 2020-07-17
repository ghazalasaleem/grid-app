import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Grid from '../Components/Grid/Grid';
import TableConfig from './../Datastore/tableConfig';
import TableData from './../Datastore/data';
// import NewRow from '../Datastore/newRow';

const Dashboard = () => {

  const [GridData, setGridData] = useState([]);

  useEffect(()=>{
    const list = [];
    TableData.map((row)=>{
      list.push({...row, changeHandler: handleChange});
    });

    setGridData([...list]);
  },[]);

  
  const handleChange = args =>{
    const {id, key, event} = args;
    const val = event.currentTarget.value;
    let dataList = [...GridData];
    dataList.map(data=>{
      if(data.id === id){
        data[key] =val;
      }
    });
    setGridData([...dataList]);
  }

  return (
    <div className="dashboard">
      <Header></Header>
      <Grid configData={TableConfig} dataList={GridData}></Grid>      
    </div>
  );
}
export default Dashboard;