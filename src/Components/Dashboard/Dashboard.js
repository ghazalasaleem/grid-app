import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Grid from '../Grid/Grid';
import TableConfig from '../../Datastore/tableConfig';
import TableData from '../../Datastore/data';
import './dashboard.css';
import AppModal from '../Modal/AppModal';
import Delete from '../Action/Delete';
import Info from '../Action/Info';
import Copy from '../Action/Copy';

const Dashboard = () => {

  const [GridData, setGridData] = useState([]);
  const [TableCon, setTableCon] = useState([]);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState([]);
  const [modalData, setModalData] = useState(null);

  const data = useRef([]);

  useEffect(()=>{
    const list = {...TableConfig};

    list.columns.map((row)=>{
      if(row.type === 'action'){
        row.cell = {
          renderer: actionRender
        }
      }
      else if(row.type === 'textBox'){
        row.cell = {
          renderer: textBoxRenderer
        }
      }
    });
    setGridData([...TableData]);
    setTableCon({...TableConfig});
  },[TableData, TableConfig]);

  useEffect(()=>{
    data.current = [...GridData];
  },[GridData]);

  const actionRender = (props) =>{
    const {id} = props.data;
    return (<React.Fragment>
        <Delete id={id} onClick={handleRowDelete}></Delete>
        <Copy id={id} onClick={handleRowCopy}></Copy>
        <Info id={id} onClick={handleRowInfo}></Info>
      </React.Fragment>);
  };

  const textBoxRenderer = (props) =>{
    const key = props.key;
    const {id} = props.data;
    const value = props.data[key];

    return (<input data-id={id} value={value} onChange={val => handleChange({event:val, id:id, key:key})}/>)
  };

  const handleRowDelete =  e =>{
    let id = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
    if(id && parseInt(id) >= 0){
      id = parseInt(id);
      let tableContent = [];
      data.current.map((row) =>{
        if(row.id != id) tableContent.push({...row});
      });
      setGridData([...tableContent]); 
    } 
  };

  const handleRowCopy = e =>{
    let id = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
    if(id && parseInt(id) >= 0 && data.current){
      id = parseInt(id);
      let copyRow ={};
      let dataList = [...data.current];
      let index = 0;

      data.current.map((row, ind)=>{
        if(row.id == id){
          index = ind;
          copyRow = Object.assign({...row},{
            id: Math.floor(Math.random()*row.id),
            variablename: row.variablename +'(1)'});
        }
      });
      dataList.splice(++index, 0, copyRow);
      setGridData([...dataList]);          
    }
  };
  
  const handleRowInfo = e =>{
    let id = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
    if(id && parseInt(id) >= 0) {
      id = parseInt(id);
      let rowName = data.current.find(prop => prop.id === id).variablename;
      setIsInfoModalVisible(true);
      setModalData(rowName);
    }
  };
  
  const handleChange = args =>{
    const {id, key, event} = args;
    const val = event.currentTarget.value;
    let dataList = [...data.current];
    dataList.map(data=>{
      if(data.id === id){
        data[key] =val;
      }
    });
    setGridData([...dataList]);
  };

  const handleSelect = args =>{
    console.log(JSON.stringify(args));
    console.log(JSON.stringify(GridData));
  };



  return (
    <React.Fragment>
      <div className="dashboard">
        <Header></Header>
        <Grid configData={TableCon} dataList={GridData} selectCallback= {handleSelect}></Grid>
      </div>
    {modalData && isInfoModalVisible && (
      <AppModal data={modalData}></AppModal>   
     )}
    </React.Fragment>
  );
}
export default Dashboard;