import React, { useState, useEffect } from 'react';
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

  useEffect(()=>{
    const list = {...TableConfig};

    list.columns.map((row)=>{
      if(row.key === 'variableaction'){
        row.cell = {
          renderer: actionRender
        }
      }
    });

    // TableData.map((row)=>{
    //   list.push({...row, changeHandler: handleChange,
    //     handleRowDelete: handleRowDelete,
    //     handleRowCopy: handleRowCopy,
    //     handleRowInfo: handleRowInfo});
    // });
    // setTableCon(Object.assign({...TableConfig},{selectCallback: handleSelect}));
    setGridData([...TableData]);
    setTableCon({...TableConfig});
  },[TableData, TableConfig]);

  const actionRender = (props) =>{
    const {id} = props.data;
    return (<React.Fragment>
        <Delete id={id} onClick={handleRowDelete}></Delete>
        <Copy id={id} onClick={handleRowCopy}></Copy>
        <Info id={id} onClick={handleRowInfo}></Info>
      </React.Fragment>);
  };

  const handleRowDelete = e =>{
    const index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
        if(index >= 0){
            let tableContent = [...GridData];
            tableContent.splice(index, 1);
            setGridData([...tableContent]); 
        } 
  };
  const handleRowCopy = e =>{
    let index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
        if(index && parseInt(index) >= 0){
            index = parseInt(index);
            let data =[...GridData];
            if(data){
            let copyRow =JSON.parse(JSON.stringify([index]));
            copyRow.map((prop) =>{
                if(prop.name === "name") {
                    prop.key = "CC"+prop.key;
                    prop.value = "Copy of "+prop.value;
                }
            })
            let tableContent = [...GridData];
            tableContent.splice(++index,0,copyRow);
            setGridData([...tableContent]);
          }
        }
  };
  
  const handleRowInfo = e =>{
    let index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
    if(index && parseInt(index) >= 0) {
        index = parseInt(index);
        let rowName =[...GridData][index].find(prop => prop.name === "name").value;
        setIsInfoModalVisible(true);
        setModalData(rowName);
    }
  };
  
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